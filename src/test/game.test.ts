import { playerCountIsValid } from '../application/gameApp';

describe('Game', () => {
  it('should only be available to have multiple of 2 number of players', () => {
    const result = playerCountIsValid(3);

    expect(result).toBeFalsy();
  });
});
