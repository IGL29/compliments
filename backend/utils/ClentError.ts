export interface IClientErrorArgs {
  status: number;
  message: string;
}

export class ClientError extends Error {
  status: number;

  constructor({ status, message }: IClientErrorArgs) {
    super(message);
    this.name = 'ClientError';
    this.status = status;
  }
}
