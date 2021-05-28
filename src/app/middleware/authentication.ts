import {shouldSkipAuth, IS_LOCAL, logger} from '@/helpers';
import {NextFunction, Request, Response} from 'express';

export default async (req: Request, res: Response, next: NextFunction) => {
  if (shouldSkipAuth(req)) {
    return next();
  }

  if (IS_LOCAL) {
    logger.info('Local, bypassing authentication');
    return next();
  }

  logger.warn('Authentication failed for incoming webhook');
  return res.status(401).send();
};
