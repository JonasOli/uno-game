import Game from '../../repository/models/Game';
import GameSession from '../../repository/models/GameSession';
import Player from '../../repository/models/Player';
import { errors } from '../../util/statusMessages';
import { joinGame, startGame } from '../gameApp';
import * as GameSessionApp from '../gameSessionApp';

describe('Game', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Start game', () => {
    it('should return an error if trying to start a game that is not full', (done) => {
      const mockResults = [
        { id: 1, gameId: 1 },
        { id: 2, gameId: 1 },
        { id: 3, gameId: 1 },
      ];
      // @ts-ignore
      jest.spyOn(GameSession, 'findAll').mockResolvedValue(mockResults);

      expect(async () => {
        await startGame(1, 'test@email.com');
      })
        .rejects.toThrow(errors.GAME_IS_NOT_FULL)
        .finally(() => {
          done();
        });
    });

    it('should return an error if trying to start a game not being the owner', (done) => {
      const mockResults = [
        { id: 1, gameId: 1 },
        { id: 2, gameId: 1 },
        { id: 3, gameId: 1 },
        { id: 4, gameId: 1 },
      ];
      // @ts-ignore
      jest.spyOn(GameSession, 'findAll').mockResolvedValue(mockResults);
      jest.spyOn(Player, 'findOne').mockResolvedValue({
        // @ts-ignore
        id: 1,
      });
      // @ts-ignore
      jest.spyOn(GameSessionApp, 'getGameSession').mockResolvedValue({ id: 1, gameId: 1, isOwner: false });

      expect(async () => {
        await startGame(1, 'test@email.com');
      })
        .rejects.toThrow(errors.ONLY_GAME_OWNER_CAN_START_GAME)
        .finally(() => {
          done();
        });
    });

    it('should return an error if trying to start a game that is already started', (done) => {
      const mockResults = [
        { id: 1, gameId: 1 },
        { id: 2, gameId: 1 },
        { id: 3, gameId: 1 },
        { id: 4, gameId: 1 },
      ];
      // @ts-ignore
      jest.spyOn(GameSession, 'findAll').mockResolvedValue(mockResults);
      jest.spyOn(Player, 'findOne').mockResolvedValue({
        // @ts-ignore
        id: 1,
      });
      // @ts-ignore
      jest.spyOn(GameSessionApp, 'getGameSession').mockResolvedValue({ id: 1, gameId: 1, isOwner: true });
      // @ts-ignore
      jest.spyOn(Game, 'findByPk').mockResolvedValue({ status: 'started' });

      expect(async () => {
        await startGame(1, 'test@email.com');
      })
        .rejects.toThrow(errors.GAME_ALREADY_STARTED)
        .finally(() => {
          done();
        });
    });
  });

  describe('Join game', () => {
    it('should return an error if the maximum amount of players is reached', (done) => {
      const mockResults = [
        { id: 1, gameId: 1 },
        { id: 2, gameId: 1 },
        { id: 3, gameId: 1 },
        { id: 4, gameId: 1 },
      ];
      // @ts-ignore
      jest.spyOn(GameSession, 'findAll').mockResolvedValue(mockResults);

      expect(async () => {
        await joinGame(1, 'test@email.com');
      })
        .rejects.toThrow(errors.GAME_IS_FULL)
        .finally(() => {
          done();
        });
    });

    it('should return an error if the player already joined the game', (done) => {
      const mockResults = [
        { id: 1, gameId: 1 },
        { id: 2, gameId: 1 },
        { id: 3, gameId: 1 },
      ];
      // @ts-ignore
      jest.spyOn(GameSession, 'findAll').mockResolvedValue(mockResults);
      jest.spyOn(Player, 'findOne').mockResolvedValue({
        // @ts-ignore
        id: 1,
      });
      // @ts-ignore
      jest.spyOn(GameSessionApp, 'getGameSession').mockResolvedValue({ id: 1, gameId: 1 });

      expect(async () => {
        await joinGame(1, 'test@email.com');
      })
        .rejects.toThrow(errors.PLAYER_ALREADY_IN_GAME)
        .finally(() => {
          done();
        });
    });
  });
});
