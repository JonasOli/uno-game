import { CreationOptional, DataTypes, Model } from 'sequelize';
import { sequelize } from '../../db';

class Player extends Model {
  declare id: number;
  declare name: string;
  declare email: string;
  declare password: string;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  declare deletedAt: Date | null;
}

Player.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.TEXT,
    },
    email: {
      type: DataTypes.TEXT,
    },
    password: {
      type: DataTypes.TEXT,
    },
  },
  {
    sequelize,
    tableName: 'player',
    paranoid: true,
    underscored: true,
  }
);

export default Player;
