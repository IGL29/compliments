import path from 'path';
import express from 'express';
import compression from 'compression';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';
import { renderPage } from 'vite-plugin-ssr/server';

const isProduction = process.env.NODE_ENV === 'production';

const PROTOCOL = 'http';
const HOST = 'localhost';
const PORT = process.env.PORT || 3000;

const root = path.dirname(fileURLToPath(import.meta.url));
const outDir = 'dist';
const distFolder = path.join(process.cwd(), 'dist');
const robots = path.join(distFolder + '/client', 'robots.txt');

async function startServer() {
  const app = express();
  
  app.use(compression());

  if (!isProduction) {
    const vite = await import('vite')
    const viteDevMiddlewares = (await vite.createServer({
      root: root,
      server: { middlewareMode: true },
      appType: 'custom',
    })).middlewares;
    app.use(viteDevMiddlewares)
  } 
  else {
    app.use(express.static(`${root}/${outDir}/client`));
  }

  app.get('robots.txt', (_, res) => {
    res.sendFile(robots);
  });
  
  app.get('*', async (req, res) => {
    const html = `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <style>
          html, body {
            margin: 0;
            box-sizing: border-box;
            scrollbar-gutter: stable;
          }
        </style>
      </head>
      <body>
      <script>
        fetch('${req.url}', 
        {method: 'POST', 
        headers: {
        'Content-Type': 'application/json'
        }, 
        body: JSON.stringify({width: document.body.clientWidth})
      }).then((response) => {
        return response.text()
      }).then((dataHTML) => {
        document.open();
        document.write(dataHTML);
        document.close();
      })
      </script></body>
    </html>`;

    res.send(html)
  })


  app.post('*', bodyParser.json({ extended: false }), async (req, res) => {
    if (req.body) {
      const pageContextInit = { urlOriginal: req.url, viewportWidth: req.body.width };
      const pageContext = await renderPage(pageContextInit);
  
      if (!pageContext.httpResponse) {
        return res.status(500).end();
      }
      const { body, statusCode, headers } = pageContext.httpResponse;
      const response = { body, statusCode, headers }
      
      response.headers.forEach((headerItem) => res.setHeader(headerItem[0], headerItem[1]));
      return res.status(statusCode).send(response.body);
    }
    res.status(500).end();
  })
  
  app.listen(3000, () => {
    console.log(`Started on ${PROTOCOL}://${HOST}:${PORT}`);
  });
}

startServer();

