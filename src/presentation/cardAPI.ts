import express, { Router } from 'express';
import Card from '../repository/models/Card';

const cardRouter: Router = express.Router();

cardRouter.post('/', async (req, res) => {
  const { gameId, value, color } = req.body;

  await Card.create({ gameId, value, color });

  return res.sendStatus(201);
});

export default cardRouter;
