import jwt from 'jsonwebtoken';
import Player from '../../repository/models/Player';
import { errors } from '../../util/statusMessages';
import { generateHashedPassword, signin } from '../authApp';

describe('Auth', () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...OLD_ENV };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    process.env = OLD_ENV;
  });

  it('should throw an error if user does not exist', async () => {
    jest.spyOn(Player, 'findAll').mockResolvedValue([]);

    try {
      await signin('email', 'password');
    } catch (err: any) {
      expect(err.message).toEqual(errors.INVALID_CREDENTIALS);
    }
  });

  it('should throw an error if invalid password', async () => {
    const hashedPassword = await generateHashedPassword('mypassword');

    jest.spyOn(Player, 'findAll').mockResolvedValue([
      {
        // @ts-ignore
        password: hashedPassword,
      },
    ]);

    expect(async () => {
      await signin('email', 'wrongPassword');
    }).rejects.toThrow(errors.INVALID_CREDENTIALS);
  });

  it('should return a valid jwt', async () => {
    const hashedPassword = await generateHashedPassword('mypassword');

    jest.spyOn(Player, 'findAll').mockResolvedValue([
      {
        // @ts-ignore
        password: hashedPassword,
      },
    ]);

    const JWT_SECRET = 'test_secret';
    process.env.JWT_SECRET = JWT_SECRET;

    const { authToken } = await signin('email', 'mypassword');
    const result = jwt.verify(authToken, JWT_SECRET);

    expect(result).toBeTruthy();
  });
});
