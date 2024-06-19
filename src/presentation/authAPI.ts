import express, { Router } from 'express';
import { signin } from '../application/authApp';

const authRouter: Router = express.Router();

authRouter.post('/signin', async (req, res) => {
  const { email, password } = req.body;

  const token = await signin(email, password);

  return res.send({ accessToken: token });
});

export default authRouter;
