import { CreationOptional, DataTypes, Model } from 'sequelize';
import { sequelize } from '../../db';
import Game from './Game';
import Player from './Player';

class GameSession extends Model {
  declare id: number;
  declare gameId: number;
  declare playerId: number;
  declare score: number;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  declare deletedAt: CreationOptional<Date>;
}

GameSession.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    score: {
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize,
    tableName: 'game_session',
    paranoid: true,
    underscored: true,
  }
);

Game.belongsToMany(Player, { through: GameSession, foreignKey: 'playerId' });
Player.belongsToMany(Game, { through: GameSession, foreignKey: 'gameId' });

export default GameSession;
