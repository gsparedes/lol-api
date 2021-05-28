import Log from '@/logger';
import {NextFunction, Request, Response} from 'express';
import app from '@/app/config';
import {LolStatsError} from '@/helpers/errors';

const {logger} = Log;

// @todo Need to understand better how / when this is supposed to be used
// Add catching for errors
function errorResponseHandler(err: LolStatsError, req: Request, res: Response, next: NextFunction) {
  if (err.code) {
    return res.status(err.code).send({message: err.message});
  }
  // Unexpected error, log it and respond with 500 status code without a body
  logger.error(err);
  return res.status(500).send(null);
}

app.use(errorResponseHandler);
