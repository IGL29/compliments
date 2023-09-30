import { RenderOptions, render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { StoreService } from '~src/services/StoreService/StoreService';

const AppProviders = ({ children }: { children: JSX.Element }) => {
  return <Provider store={new StoreService().store}>{children}</Provider>;
};

const customRender = (ui: JSX.Element, options?: RenderOptions) => {
  StoreService.destroy();
  return render(ui, { wrapper: AppProviders, ...options });
};

export * from '@testing-library/react';
export * from '@testing-library/user-event';
export { customRender as render };
export { rest } from 'msw';
export { setupServer } from 'msw/node';
