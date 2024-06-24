import express, { Router } from 'express';
import { createPlayer } from '../application/playerApp';
import Player from '../repository/models/Player';
import { success } from '../util/statusMessages';

const playerRouter: Router = express.Router();

playerRouter.post('/', async (req, res, next) => {
  try {
    const { name, email, age, password } = req.body;

    await createPlayer(name, email, age, password);

    return res.status(201).send({ message: success.USER_REGISTERED });
  } catch (err) {
    next(err);
  }
});

playerRouter.get('/', async (req, res) => {
  const players = await Player.findAll({
    attributes: { exclude: ['password'] },
  });

  return res.send(players);
});

playerRouter.get('/:id', async (req, res) => {
  const player = await Player.findAll({
    attributes: { exclude: ['password'] },
    where: {
      id: req.params.id,
    },
  });

  return res.send(player?.[0]);
});

playerRouter.put('/:id', async (req, res) => {
  const { name, email, age } = req.body;

  await Player.update({ name, email, age }, { where: { id: req.params.id } });

  return res.sendStatus(200);
});

playerRouter.delete('/:id', async (req, res) => {
  await Player.destroy({ where: { id: req.params.id } });

  return res.sendStatus(204);
});

export default playerRouter;
