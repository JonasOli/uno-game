import Game from '../repository/models/Game';

async function createGame() {
  await Game.create({ status: 'waiting' });
}

export { createGame };
