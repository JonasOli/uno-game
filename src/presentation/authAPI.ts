import express, { Router } from 'express';
import { signin } from '../application/authApp';

const authRouter: Router = express.Router();

authRouter.post('/signin', async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const token = await signin(email, password);

    return res.cookie('userJWT', token, { httpOnly: true }).send();
  } catch (err) {
    next(err);
  }
});

export default authRouter;
