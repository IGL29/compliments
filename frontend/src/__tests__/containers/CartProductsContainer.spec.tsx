import { render, rest, setupServer, screen } from '../test-utils';
import { CartProductsContainer } from '~src/containers/CartProductsContainer';
import { StoreService } from '~src/services/StoreService/StoreService';
import { requestCartAsync } from '~src/store/features/cart';
import { getMockCartItem } from '../mocks/data/cartItem';
import { vi } from 'vitest';
import { CartService } from '~src/services/CartService';
import { requestAuthAsync } from '~src/store/features/profile';

const localCart = [
  getMockCartItem({ count: 1, product: { id: '1', title: 'Product 1' } }),
  getMockCartItem({ count: 2, product: { id: '2', title: 'Product 2' } }),
  getMockCartItem({ count: 3, product: { id: '3', title: 'Product 3' } }),
];
const serverCart = [
  getMockCartItem({ count: 1, product: { id: '1s', title: 'Product on server 1' } }),
  getMockCartItem({ count: 2, product: { id: '2s', title: 'Product on server 2' } }),
  getMockCartItem({ count: 3, product: { id: '3s', title: 'Product on server 3' } }),
];

const server = setupServer(
  rest.get('http://test/cart', (_, res, ctx) => {
    return res(ctx.json(serverCart));
  }),
  rest.post('http://test/auth', (_, res, ctx) => {
    return res(ctx.json({ token: 'token' }));
  }),
);

describe('CartProductsContainer', async () => {
  beforeAll(() => {
    server.listen();
  });
  afterAll(() => {
    server.close();
    vi.resetAllMocks();
  });
  afterEach(() => {
    server.resetHandlers();
  });

  it('should render text if cart is empty', async () => {
    render(<CartProductsContainer />);
    expect(screen.getByText(/Корзина пуста/i)).toBeInTheDocument();
  });

  it('should render products from local cart if user not logged', async () => {
    vi.spyOn(CartService, 'getFromLocalCart').mockImplementation(() => localCart);
    render(<CartProductsContainer />);
    await new StoreService().store.dispatch(requestCartAsync());
    expect(await screen.findByText(/Product 1/i)).toBeInTheDocument();
    expect(await screen.findByText(/Product 2/i)).toBeInTheDocument();
    expect(await screen.findByText(/Product 3/i)).toBeInTheDocument();
  });

  it('should render products from cart on server if user is logged', async () => {
    render(<CartProductsContainer />);
    await new StoreService().store.dispatch(requestAuthAsync({ email: 'some@email.com', password: 'somePassword' }));
    await new StoreService().store.dispatch(requestCartAsync());
    expect(await screen.findByText(/Product on server 1/i)).toBeInTheDocument();
    expect(await screen.findByText(/Product on server 2/i)).toBeInTheDocument();
    expect(await screen.findByText(/Product on server 3/i)).toBeInTheDocument();
  });
});
