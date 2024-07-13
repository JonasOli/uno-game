import express, { Router } from 'express';
import { signin } from '../application/authApp';

const authRouter: Router = express.Router();

authRouter.post('/signin', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { authToken, csrfToken } = await signin(email, password);

    res.setHeader('X-CSRF-Token', csrfToken);
    res.cookie('userJWT', authToken, { httpOnly: true });

    return res.send();
  } catch (err) {
    next(err);
  }
});

export default authRouter;
