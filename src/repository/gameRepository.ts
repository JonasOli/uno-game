import Game from './models/Game';

async function patchGame(maxPlayers: number, id: number) {
  await Game.update({ maxPlayers }, { where: { id } });
}

export { patchGame };
