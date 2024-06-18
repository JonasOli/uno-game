import express, { Request, Response, Router } from 'express';
import Player from '../repository/models/Player';

const playerRouter: Router = express.Router();

playerRouter.post('/', async (req: Request, res: Response) => {
  const { name, email, age } = req.body;

  await Player.create({ name, email, age });

  return res.sendStatus(201);
});

playerRouter.get('/', async (req: Request, res: Response) => {
  const players = await Player.findAll();

  return res.send(players);
});

playerRouter.get('/:id', async (req: Request, res: Response) => {
  const player = await Player.findAll({
    where: {
      id: req.params.id,
    },
  });

  return res.send(player?.[0]);
});

playerRouter.put('/:id', async (req: Request, res: Response) => {
  const { name, email, age } = req.body;

  await Player.update({ name, email, age }, { where: { id: req.params.id } });

  return res.sendStatus(200);
});

playerRouter.delete('/:id', async (req: Request, res: Response) => {
  await Player.destroy({ where: { id: req.params.id } });

  return res.sendStatus(204);
});

export default playerRouter;
