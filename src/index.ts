import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import winston from 'winston';
import errorMiddleware from './middleware/errorMiddleware';
import authRouter from './presentation/authAPI';
import gameRouter from './presentation/gameAPI';
import gameSessionRouter from './presentation/gameSessionAPI';
import playerRouter from './presentation/playerAPI';
import logger from './util/logger';

dotenv.config();

const app = express();
const port = process.env.PORT ?? 3000;

app.use(express.json());
app.use(cors());
app.use(cookieParser());

// Routes
app.use('/api/auth', authRouter);
app.use('/api/player', playerRouter);
app.use('/api/game', gameRouter);
app.use('/api/game-session', gameSessionRouter);

app.use(errorMiddleware);

app.listen(port, () => {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    })
  );
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
