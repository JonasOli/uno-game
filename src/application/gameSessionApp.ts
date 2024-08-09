import GameSession from '../repository/models/GameSession';

async function createGameSession(gameId: number, playerId: number, isOwner: boolean = false) {
  await GameSession.create({ gameId, playerId, score: 0, isOwner });
}

async function getGameSession(gameId: number, playerId: number) {
  return await GameSession.findOne({ where: { gameId, playerId } });
}

export { createGameSession, getGameSession };
