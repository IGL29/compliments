import React from 'react';
import { Layout } from '../components/Layout';
import { PageContext } from './types';
import { PageContextProvider } from './usePageContext';
import { Provider } from 'react-redux';
import { NotificationsProvider } from '~src/contexts/NotificationsContext';
import { StoreService } from '~src/services/StoreService/StoreService';

function PageShell({ children, pageContext }: { children: React.ReactNode; pageContext: PageContext }) {
  const serverState = pageContext.PRELOADED_STATE;
  const store = new StoreService(serverState).store;

  return (
    <React.StrictMode>
      <PageContextProvider pageContext={pageContext}>
        <Provider store={store} serverState={serverState}>
          <NotificationsProvider>
            <Layout>{children}</Layout>
          </NotificationsProvider>
        </Provider>
      </PageContextProvider>
    </React.StrictMode>
  );
}

export default PageShell;
