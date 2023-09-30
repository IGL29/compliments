import { Request, Response } from 'express';

const getMainHandler = (req: Request, res: Response) => {
  res.send('Server is running');
};

export { getMainHandler };
