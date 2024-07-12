import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export default function authenticationMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const userJWT = req.cookies['userJWT'];

  if (!userJWT) {
    return res.status(401).send();
  }

  jwt.verify(userJWT, process.env.JWT_SECRET ?? '', (err: any, user: any) => {
    if (err) {
      console.log(err);
      return res.status(403).send('Could not verify token');
    }

    (req as any).user = user;
  });

  next();
}
