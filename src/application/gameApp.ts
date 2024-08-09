import Game from '../repository/models/Game';
import GameSession from '../repository/models/GameSession';
import Player from '../repository/models/Player';
import { errors } from '../util/statusMessages';
import { createGameSession, getGameSession } from './gameSessionApp';

const GAME_STATUS = {
  started: 'started',
  waiting: 'waiting',
};

async function createGame(userEmail: string) {
  const newGame = await Game.create({ status: GAME_STATUS.waiting });
  const user = await Player.findOne({ where: { email: userEmail } });
  const isGameOwner = true;

  await createGameSession(newGame.id, user!.id, isGameOwner);
}

async function joinGame(gameId: number, playerEmail: string) {
  if (await _gameIsFull(gameId)) {
    throw new Error(errors.GAME_IS_FULL);
  }

  const player = await Player.findOne({ where: { email: playerEmail } });

  if (await _userAlreadyInGame(gameId, player!.id)) {
    throw new Error(errors.PLAYER_ALREADY_IN_GAME);
  }

  await createGameSession(gameId, player!.id);
}

async function startGame(gameId: number, playerEmail: string) {
  if (!(await _gameIsFull(gameId))) {
    throw new Error(errors.GAME_IS_NOT_FULL);
  }

  const player = await Player.findOne({ where: { email: playerEmail } });

  if (!(await _isGameOwner(gameId, player!.id))) {
    throw new Error(errors.ONLY_GAME_OWNER_CAN_START_GAME);
  }

  if (await _isGameStarted(gameId)) {
    throw new Error(errors.GAME_ALREADY_STARTED);
  }

  await Game.update({ status: GAME_STATUS.started }, { where: { id: gameId } });
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

async function _isGameOwner(gameId: number, playerId: number) {
  const gameSession = await getGameSession(gameId, playerId);

  return gameSession?.isOwner;
}

async function _isGameStarted(gameId: number) {
  const game = await Game.findByPk(gameId);

  return game?.status === GAME_STATUS.started;
}

export { createGame, joinGame, startGame };
