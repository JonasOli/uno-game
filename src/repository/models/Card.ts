import { CreationOptional, DataTypes, Model } from 'sequelize';
import { sequelize } from '../../db';
import Game from './Game';

class Card extends Model {
  declare id: number;
  declare gameId: number;
  declare value: string;
  declare color: string;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  declare deletedAt: CreationOptional<Date>;
}

Card.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    value: {
      type: DataTypes.TEXT,
    },
    color: {
      type: DataTypes.TEXT,
    },
  },
  {
    sequelize,
    tableName: 'card',
    paranoid: true,
    underscored: true,
  }
);

Card.belongsTo(Game, { foreignKey: 'gameId' });

export default Card;
