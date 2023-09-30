import userEvent from '@testing-library/user-event';
import { render, rest, setupServer, screen } from '../test-utils';
import { vi } from 'vitest';
import { FeedbackContainer } from '~src/containers/FeedbackContainer';

const fnPostFeedback = vi.fn();

const server = setupServer(
  rest.post('http://test/feedback', (_, res, ctx) => {
    fnPostFeedback();
    return res(ctx.json({ token: 'token' }));
  }),
);

describe('FeedbackContainer', async () => {
  beforeAll(() => {
    server.listen();
  });
  afterAll(() => {
    server.close();
    vi.resetAllMocks();
  });
  afterEach(() => {
    fnPostFeedback.mockClear();
    server.resetHandlers();
  });

  it('should not allow request if required fileds is empty', async () => {
    render(<FeedbackContainer />);
    userEvent.click(screen.getByRole('button'));
    expect(fnPostFeedback).not.toHaveBeenCalled();
  });

  it('should not allow request if filled only name', async () => {
    render(<FeedbackContainer />);
    await userEvent.type(screen.getByPlaceholderText(/имя/), 'Имя пользователя');
    await userEvent.click(screen.getByText(/Отправить/));
    expect(fnPostFeedback).not.toHaveBeenCalled();
  });

  it('should not allow request if filled name and phone', async () => {
    render(<FeedbackContainer />);
    await userEvent.type(screen.getByPlaceholderText(/имя/), 'Имя пользователя');
    await userEvent.type(screen.getByPlaceholderText(/номер/), '9999999999');
    await userEvent.click(screen.getByText(/Отправить/));
    expect(fnPostFeedback).not.toHaveBeenCalled();
  });

  it('should not allow request if filled name, phone, comment', async () => {
    render(<FeedbackContainer />);
    await userEvent.type(screen.getByPlaceholderText(/имя/), 'Имя пользователя');
    await userEvent.type(screen.getByPlaceholderText(/номер/), '9999999999');
    await userEvent.type(screen.getByPlaceholderText(/комментарий/), 'Комментарий');
    await userEvent.click(screen.getByText(/Отправить/));
    expect(fnPostFeedback).not.toHaveBeenCalled();
  });

  it('should allow request if required fileds is filled', async () => {
    render(<FeedbackContainer />);
    await userEvent.type(screen.getByPlaceholderText(/имя/), 'Имя пользователя');
    await userEvent.type(screen.getByPlaceholderText(/номер/), '9999999999');
    await userEvent.type(screen.getByPlaceholderText(/комментарий/), 'Комментарий');
    await userEvent.click(screen.getByTestId('checkboxInput'));
    await userEvent.click(screen.getByText(/Отправить/));
    expect(fnPostFeedback).toHaveBeenCalled();
  });

  it('should clear all fields after post data', async () => {
    render(<FeedbackContainer />);
    await userEvent.type(screen.getByPlaceholderText(/имя/), 'Имя пользователя');
    await userEvent.type(screen.getByPlaceholderText(/номер/), '9999999999');
    await userEvent.type(screen.getByPlaceholderText(/комментарий/), 'Комментарий');
    await userEvent.click(screen.getByTestId('checkboxInput'));
    await userEvent.click(screen.getByText(/Отправить/));
    expect(await screen.findByPlaceholderText(/имя/)).toHaveValue('');
    expect(await screen.findByPlaceholderText(/номер/)).toHaveValue('');
    expect(await screen.findByPlaceholderText(/комментарий/)).toHaveValue('');
    expect(await screen.findByTestId('checkboxInput')).not.toBeChecked();
  });
});
