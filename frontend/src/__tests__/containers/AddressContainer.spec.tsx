import { render, rest, setupServer, screen } from '../test-utils';
import { getMockShopContacts } from '../mocks/data/shopContacts';
import { AddressContainer } from '~src/containers/AddressContainer';

const server = setupServer(
  rest.get('http://test/contacts', (_, res, ctx) => {
    return res(
      ctx.json(
        getMockShopContacts({
          phone: 9999999999,
          workTime: { time: { from: '9:00', to: '21:00' }, day: { from: 'saturday', to: 'sunday' } },
        }),
      ),
    );
  }),
);

describe('AddressContainer', async () => {
  beforeAll(() => {
    server.listen();
  });
  afterAll(() => {
    server.close();
  });
  afterEach(() => {
    server.resetHandlers();
  });

  it('should render updated contacts', async () => {
    render(<AddressContainer />);
    expect(await screen.findByText('+7(999) 999-99-99')).toBeInTheDocument();
    expect(await screen.findByText(/9:00/)).toBeInTheDocument();
    expect(await screen.findByText(/21:00/)).toBeInTheDocument();
    expect(await screen.findByText(/сб/i)).toBeInTheDocument();
    expect(await screen.findByText(/вс/i)).toBeInTheDocument();
  });

  it('should render default contacts', () => {
    render(<AddressContainer />);
    expect(screen.getByText('+7(985) 223-40-59')).toBeInTheDocument();
    expect(screen.getByText(/8:00/)).toBeInTheDocument();
    expect(screen.getByText(/20:00/)).toBeInTheDocument();
    expect(screen.getByText(/пн/i)).toBeInTheDocument();
    expect(screen.getByText(/сб/i)).toBeInTheDocument();
  });
});
