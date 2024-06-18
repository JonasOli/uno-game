import { CreationOptional, DataTypes, Model } from 'sequelize';
import { sequelize } from '../../db';

class Game extends Model {
  declare id: number;
  declare status: string;
  declare max_players: number;
  declare created_at: CreationOptional<Date>;
  declare updated_at: CreationOptional<Date>;
  declare deleted_at: Date | null;
}

Game.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    status: {
      type: DataTypes.TEXT,
    },
    max_players: {
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize,
    tableName: 'player',
    paranoid: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
  }
);

export default Game;
