import express, { Router } from 'express';
import { createGame } from '../application/gameApp';
import Game from '../repository/models/Game';
import authenticationMiddleware from '../middleware/authenticationMiddleware';

const gameRouter: Router = express.Router();

gameRouter.post('/', authenticationMiddleware, async (req, res, next) => {
  try {
    await createGame();

    return res.sendStatus(201);
  } catch (err) {
    next(err);
  }
});

gameRouter.get('/', authenticationMiddleware, async (req, res, next) => {
  try {
    const games = await Game.findAll();

    return res.send(games);
  } catch (err) {
    next(err);
  }
});

gameRouter.get('/:id', authenticationMiddleware, async (req, res, next) => {
  try {
    const game = await Game.findByPk(req.params.id);

    return res.send(game);
  } catch (err) {
    next(err);
  }
});

export default gameRouter;
