import Player from '../../repository/models/Player';
import { errors } from '../../util/statusMessages';
import { createPlayer } from '../playerApp';

describe('PlayerApp', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should not be able to create two Users with the same email', () => {
    jest.spyOn(Player, 'findOne').mockResolvedValue({
      // @ts-ignore
      id: 1,
    });

    expect(async () => {
      await createPlayer('name', 'email', 1, 'password');
    }).rejects.toThrow(errors.USER_ALREADY_EXISTS);
  });
});
