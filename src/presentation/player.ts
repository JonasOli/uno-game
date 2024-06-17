import express, { Request, Response, Router } from 'express';
import Player from '../repository/Player';

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



export default playerRouter;
