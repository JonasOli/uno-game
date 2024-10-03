import bcrypt from 'bcrypt';
import { randomUUID } from 'crypto';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import Player from '../repository/models/Player';
import { errors } from '../util/statusMessages';

dotenv.config();

async function signIn(email: string, password: string) {
  const player = await Player.findAll({ where: { email } });

  if (player.length === 0) {
    throw new Error(errors.INVALID_CREDENTIALS);
  }

  const playerPassword = player[0].password;
  const validPassword = await bcrypt.compare(password, playerPassword);

  if (!validPassword) {
    throw new Error(errors.INVALID_CREDENTIALS);
  }

  const csrfToken = randomUUID();
  const authToken = jwt.sign(
    { email, password: playerPassword, csrfToken },
    process.env.JWT_SECRET ?? '',
    {
      expiresIn: '1h',
    }
  );

  return { csrfToken, authToken };
}

async function generateHashedPassword(password: string) {
  const saltRounds = 10;

  return await bcrypt.hash(password, saltRounds);
}

export { generateHashedPassword, signIn };
