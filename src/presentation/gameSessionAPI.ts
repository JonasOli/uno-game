import express, { Router } from 'express';
import GameSession from '../repository/models/GameSession';

const gameSessionRouter: Router = express.Router();

gameSessionRouter.post('/', async (req, res) => {
  const { score, gameId, playerId } = req.body;

  await GameSession.create({ score, game_id: gameId, player_id: playerId });

  return res.sendStatus(201);
});

export default gameSessionRouter;
