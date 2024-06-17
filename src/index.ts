import dotenv from 'dotenv';
import express, { Express, Request, Response } from 'express';
import playerRouter from './presentation/player';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Routes
app.use('/api/player', playerRouter);

// @ts-ignore
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
