import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import errorMiddleware from './middleware/errorMiddleware';
import authRouter from './presentation/authAPI';
import cardRouter from './presentation/cardAPI';
import gameRouter from './presentation/gameAPI';
import gameSessionRouter from './presentation/gameSessionAPI';
import playerRouter from './presentation/playerAPI';

dotenv.config();

const app = express();
const port = process.env.PORT ?? 3000;

app.use(express.json());
app.use(cors());
app.use(cookieParser());

// Routes
app.use('/api/player', playerRouter);
app.use('/api/game', gameRouter);
app.use('/api/game-session', gameSessionRouter);
app.use('/api/card', cardRouter);
app.use('/api/auth', authRouter);

app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
