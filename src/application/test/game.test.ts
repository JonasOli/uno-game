import Game from '../../repository/models/Game';
import { createGame } from '../gameApp';

describe('Game', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a game if the player count is valid', async () => {
    jest.spyOn(Game, 'create').mockReturnValue(null);

    await createGame();

    expect(Game.create).toHaveBeenCalled();
  });
});
