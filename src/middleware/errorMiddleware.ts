import { Request, Response } from 'express';
import logger from '../util/logger';
import { errors } from '../util/statusMessages';

export default function errorMiddleware(err: Error, req: Request, res: Response, next: any): any {
  const hasKnownError = Object.values(errors).some((value) => value === err.message);

  logger.log({
    level: 'error',
    message: err.message,
  });

  if (hasKnownError) {
    res.status(400).send(err.message);
  } else {
    res.status(500).send('Something broke!');
  }
}
