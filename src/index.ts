import dotenv from 'dotenv';
import express, { Express, Request, Response } from 'express';
import gameRouter from './presentation/gameAPI';
import playerRouter from './presentation/playerAPI';
import { errors } from './util/statusMessages';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Routes
app.use('/api/player', playerRouter);
app.use('/api/game', gameRouter);

app.use((err: Error, req: Request, res: Response, next: any): any => {
  const hasKnownError = Object.values(errors).some(
    (value) => value === err.message
  );

  if (hasKnownError) {
    res.status(400).send(err.message);
  } else {
    res.status(500).send('Something broke!');
  }
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
