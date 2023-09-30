import PageShell from './PageShell';
import { PageContextClient } from './types';
import { hydrateRoot, Root } from 'react-dom/client';
import 'normalize.css';
import '~styles/index.scss';
import { SITE_TITLE } from '~src/data/CEO';

export const clientRouting = true;
export const hydrationCanBeAborted = true;
export const prefetchStaticAssets = 'viewport';
export { onHydrationEnd };

function onHydrationEnd() {
  console.log('The page is now interactive');
}

let rootReact: Root;

async function render(pageContext: PageContextClient) {
  const { Page, pageProps } = pageContext;
  const { getDocumentProps } = pageContext.exports;
  const rootElement = document.getElementById('react-root');

  if (!Page) throw new Error('Client-side render() hook expects pageContext.Page to be defined');
  if (!rootElement) throw new Error('DOM element #react-root not found');

  if (!pageContext.isHydration && typeof getDocumentProps === 'function') {
    document.title = getDocumentProps()?.title || SITE_TITLE;
  }

  const reactNode = (
    <PageShell pageContext={pageContext}>
      <Page {...pageProps} />
    </PageShell>
  );

  if (pageContext.isHydration) {
    rootReact = await hydrateRoot(rootElement, reactNode);
  } else {
    rootReact.render(reactNode);
  }
}

export { render };
