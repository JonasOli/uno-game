import { CreationOptional, DataTypes, Model } from 'sequelize';
import { sequelize } from '../../db';

class Game extends Model {
  declare id: number;
  declare status: string;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  declare deletedAt: Date | null;
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
  },
  {
    sequelize,
    tableName: 'game',
    paranoid: true,
    underscored: true,
  }
);

export default Game;
