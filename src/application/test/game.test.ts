import Game from '../../repository/models/Game';
import { errors } from '../../util/statusMessages';
import { createGame, playerCountIsValid } from '../gameApp';

describe('Game', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should only be available to have multiple of 2 number of players', () => {
    const result = playerCountIsValid(3);

    expect(result).toBeFalsy();
  });

  it('should create a game if the player count is valid', async () => {
    jest.spyOn(Game, 'create').mockReturnValue(null);

    await createGame('test', 4);

    expect(Game.create).toHaveBeenCalled();
  });

  it('should throw an exception if trying to create a game if an invalid number of players', async () => {
    jest.spyOn(Game, 'create').mockReturnValue(null);

    const invalidPlayerCount = 3;
    const createGameFunc = async () =>
      await createGame('test', invalidPlayerCount);

    expect(createGameFunc).rejects.toThrow(errors.INVALID_PLAYER_COUNT);
  });
});
