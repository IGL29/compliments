import { Request, Response } from 'express';

const postMainHandler = async (req: Request, res: Response) => {
  if (!req.body.phone) {
    return res.status(400).send({ message: 'Phone is required' });
  }
  if (!req.body.name) {
    return res.status(400).send({ message: 'Name is required' });
  }
  if (!req.body.comment) {
    return res.status(400).send({ message: 'Comment is required' });
  }
  return res.status(204).end();
};

export { postMainHandler };
