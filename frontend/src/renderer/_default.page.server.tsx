import ReactDOMServer from 'react-dom/server';
import { escapeInject, dangerouslySkipEscape } from 'vite-plugin-ssr/server';
import { PageContextServer } from './types';
import PageShell from './PageShell';
// import logoUrl from '/public/logo.svg';
import { InjectFilterEntry } from 'vite-plugin-ssr/types';
import { ObservableViewportSize } from '~src/services/ObservableViewportSize';

export { render };

export const passToClient = ['documentProps', 'pageProps', 'routeParams', 'PRELOADED_STATE'];

async function render(pageContext: PageContextServer) {
  const { Page, pageProps, routeParams, PRELOADED_STATE, viewportWidth } = pageContext;

  // This render() hook only supports SSR, see https://vite-plugin-ssr.com/render-modes for how to modify render() to support SPA
  if (!Page) throw new Error('My render() hook expects pageContext.Page to be defined');

  console.log('Call Service on render server');
  new ObservableViewportSize().setSize({width: viewportWidth});

  const viewHtml = ReactDOMServer.renderToString(
    <PageShell pageContext={pageContext}>
      <Page {...pageProps} />
    </PageShell>,
  );


  const { getDocumentProps, documentProps } = pageContext.exports;

  const title =
    (getDocumentProps && typeof getDocumentProps === 'function' && getDocumentProps?.().title) || 'Комплименты';
  const desc =
    (getDocumentProps && typeof getDocumentProps === 'function' && getDocumentProps?.().description) ||
    'Интернет-магазин';

  const documentHtml = escapeInject`<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <link rel="icon" href="/public/logo.svg'" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="${desc}" />
        <title>${title}</title>
      </head>
      <body>
        <div id="react-root">${dangerouslySkipEscape(viewHtml)}</div>
      </body>
    </html>`;

  const injectFilter = (assets: InjectFilterEntry[]): void => {
    assets.forEach(asset => {      
      if (
        // We don't touch entry assets (recommended)
        asset.isEntry ||
        // We don't touch JavaScript preloading (recommended)
        asset.assetType === 'script'
      ) {
        return
      }

      // Don't preload images
      if (asset.assetType === 'image') {
        asset.inject = false;
      }

      // Don't preload fonts
      if (asset.assetType === 'font') {
        asset.inject = false
      }
    })
  }

  return {
    documentHtml,
    injectFilter,
    pageContext: {
      pageProps,
      documentProps,
      routeParams,
      PRELOADED_STATE,
    },
  };
}
