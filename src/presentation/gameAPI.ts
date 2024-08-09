import express, { Router } from 'express';
import { createGame, joinGame } from '../application/gameApp';
import authenticationMiddleware from '../middleware/authenticationMiddleware';
import Game from '../repository/models/Game';

const gameRouter: Router = express.Router();

gameRouter.post('/', authenticationMiddleware, async (req, res, next) => {
  try {
    const loggedInUser = (req as any).user;

    await createGame(loggedInUser.email);

    return res.sendStatus(201);
  } catch (err) {
    next(err);
  }
});

gameRouter.post('/:gameId/join', authenticationMiddleware, async (req, res, next) => {
  try {
    const { gameId } = req.params;
    const loggedInUser = (req as any).user;

    await joinGame(parseInt(gameId), loggedInUser.email);

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
