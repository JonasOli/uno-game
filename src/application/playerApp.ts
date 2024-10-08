import Player from '../repository/models/Player';
import { errors } from '../util/statusMessages';
import { generateHashedPassword } from './authApp';

async function createPlayer(
  name: string,
  email: string,
  age: number,
  password: string
) {
  const player = await Player.findOne({ where: { email } });

  if (!!player) {
    throw new Error(errors.USER_ALREADY_EXISTS);
  }

  const hashedPassword = await generateHashedPassword(password);

  await Player.create({ name, email, age, password: hashedPassword });
}

export { createPlayer };
