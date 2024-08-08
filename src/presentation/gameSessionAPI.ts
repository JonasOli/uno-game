import express, { Router } from 'express';
import GameSession from '../repository/models/GameSession';

const gameSessionRouter: Router = express.Router();

gameSessionRouter.post('/', async (req, res, next) => {
  try {
    const { score, gameId, playerId } = req.body;

    await GameSession.create({ score, gameId, playerId });

    return res.sendStatus(201);
  } catch (err) {
    next(err);
  }
});

export default gameSessionRouter;
