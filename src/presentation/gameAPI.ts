import express, { Router } from 'express';
import { createGame } from '../application/gameApp';
import Game from '../repository/models/Game';

const gameRouter: Router = express.Router();

gameRouter.post('/', async (req, res, next) => {
  try {
    const { status, maxPlayers } = req.body;

    await createGame(status, maxPlayers);

    return res.sendStatus(201);
  } catch (err) {
    next(err);
  }
});

gameRouter.get('/', async (req, res) => {
  const players = await Game.findAll();

  return res.send(players);
});

gameRouter.get('/:id', async (req, res) => {
  const player = await Game.findAll({
    where: {
      id: req.params.id,
    },
  });

  return res.send(player?.[0]);
});

gameRouter.patch('/:id', async (req, res) => {
  const { maxPlayers } = req.body;

  await Game.update(
    { maxPlayers },
    { where: { id: req.params.id } }
  );

  return res.sendStatus(200);
});

gameRouter.delete('/:id', async (req, res) => {
  await Game.destroy({ where: { id: req.params.id } });

  return res.sendStatus(204);
});

export default gameRouter;
