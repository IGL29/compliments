import { Request } from 'express';

const getTokenFromRequest = (req: Request): string | null => {
  return req.header('Authorization')?.split(' ')?.[1] || null;
};

export default getTokenFromRequest;
