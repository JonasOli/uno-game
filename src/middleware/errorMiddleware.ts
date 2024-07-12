import { Request, Response } from 'express';
import { errors } from '../util/statusMessages';

export default function errorMiddleware(
  err: Error,
  req: Request,
  res: Response,
): any {
  const hasKnownError = Object.values(errors).some(
    (value) => value === err.message
  );

  if (hasKnownError) {
    res.status(400).send(err.message);
  } else {
    console.error(err.message);

    res.status(500).send('Something broke!');
  }
}
