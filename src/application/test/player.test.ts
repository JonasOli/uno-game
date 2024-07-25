import Player from '../../repository/models/Player';
import { errors } from '../../util/statusMessages';
import * as authApp from '../authApp';
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

  it('should create a player with the correct values', async () => {
    const expectedResult = {
      name: 'name',
      email: 'email',
      age: 20,
      password: 'testPassword',
    };

    jest.spyOn(Player, 'findOne').mockResolvedValue(null);
    jest.spyOn(Player, 'create').mockResolvedValue(null);
    jest
      .spyOn(authApp, 'generateHashedPassword')
      .mockImplementation(
        () => new Promise((res) => res(expectedResult.password))
      );

    await createPlayer(
      expectedResult.name,
      expectedResult.email,
      expectedResult.age,
      expectedResult.password
    );

    expect(Player.create).toHaveBeenCalledWith(expectedResult);
  });
});
