import bcrypt from 'bcrypt';
import Player from '../repository/models/Player';
import { errors } from '../util/statusMessages';

async function createPlayer(
  name: string,
  email: string,
  age: number,
  password: string
) {
  const player = await Player.findAll({ where: { email } });

  if (player.length > 0) {
    throw new Error(errors.USER_ALREADY_EXISTS);
  }

  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  await Player.create({ name, email, age, password: hashedPassword });
}

export { createPlayer };
