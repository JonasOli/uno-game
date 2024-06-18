import { CreationOptional, DataTypes, Model } from 'sequelize';
import { sequelize } from '../../db';
import Game from './Game';
import Player from './Player';

class GameSession extends Model {
  declare id: number;
  declare score: number;
  declare created_at: CreationOptional<Date>;
  declare updated_at: CreationOptional<Date>;
  declare deleted_at: CreationOptional<Date>;
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
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
  }
);

Game.belongsToMany(Player, { through: GameSession, foreignKey: 'player_id' });
Player.belongsToMany(Game, { through: GameSession, foreignKey: 'game_id' });

export default GameSession;
