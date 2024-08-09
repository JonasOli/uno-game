import Game from '../repository/models/Game';
import GameSession from '../repository/models/GameSession';
import Player from '../repository/models/Player';
import { errors } from '../util/statusMessages';
import { createGameSession, getGameSession } from './gameSessionApp';

async function createGame(userEmail: string) {
  const newGame = await Game.create({ status: 'waiting' });
  const user = await Player.findOne({ where: { email: userEmail } });

  await createGameSession(newGame.id, user!.id);
}

async function joinGame(gameId: number, userEmail: string) {
  if (await _gameIsFull(gameId)) {
    throw new Error(errors.GAME_IS_FULL);
  }

  const player = await Player.findOne({ where: { email: userEmail } });

  if (await _userAlreadyInGame(gameId, player!.id)) {
    throw new Error(errors.PLAYER_ALREADY_IN_GAME);
  }

  await createGameSession(gameId, player!.id);
}

async function startGame(gameId: number) {
  if (!(await _gameIsFull(gameId))) {
    throw new Error(errors.GAME_IS_NOT_FULL);
  }
}

async function _gameIsFull(gameId: number) {
  const gameSessionsForGame = await GameSession.findAll({ where: { gameId } });
  const MAX_PLAYERS_PER_GAME = 4;

  return gameSessionsForGame.length === MAX_PLAYERS_PER_GAME;
}

async function _userAlreadyInGame(gameId: number, playerId: number) {
  const gameSession = await getGameSession(gameId, playerId);

  return gameSession !== null;
}

export { createGame, joinGame };
