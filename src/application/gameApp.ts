import Game from '../repository/models/Game';
import { errors } from '../util/statusMessages';

async function createGame(status: string, maxPlayers: number) {
  if (playerCountIsValid(maxPlayers)) {
    await Game.create({ status, max_players: maxPlayers });
  } else {
    throw new Error(errors.INVALID_PLAYER_COUNT);
  }
}

async function updateGame(maxPlayers: number, id: number) {}

function playerCountIsValid(playerCount: number) {
  return playerCount % 2 === 0;
}

export { createGame, playerCountIsValid };
