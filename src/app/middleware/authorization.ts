import {shouldSkipAuth} from '@/helpers';
import {NextFunction, Request, Response} from 'express';

export default async (req: Request, res: Response, next: NextFunction) => {
  if (shouldSkipAuth(req)) {
    return next();
  }
  // TODO Authorize the request (do we trust the principal?)
  return next();
};
