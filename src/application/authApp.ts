import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import Player from '../repository/models/Player';
import { errors } from '../util/statusMessages';

dotenv.config();

async function signin(email: string, password: string) {
  const player = await Player.findAll({ where: { email } });

  if (player.length === 0) {
    throw new Error(errors.INVALID_CREDENTIALS);
  }

  const playerPassword = player[0].password;
  const validPassword = await bcrypt.compare(password, playerPassword);

  if (!validPassword) {
    throw new Error(errors.INVALID_CREDENTIALS);
  }

  return jwt.sign(
    { email, password: playerPassword },
    process.env.JWT_SECRET ?? '',
    {
      expiresIn: '1800s',
    }
  );
}

export { signin };
