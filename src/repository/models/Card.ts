import { CreationOptional, DataTypes, Model } from 'sequelize';
import { sequelize } from '../../db';
import Game from './Game';

class Card extends Model {
  declare id: number;
  declare game_id: number;
  declare value: string;
  declare color: string;
  declare created_at: CreationOptional<Date>;
  declare updated_at: CreationOptional<Date>;
  declare deleted_at: CreationOptional<Date>;
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
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
  }
);

Game.belongsTo(Card, { foreignKey: 'game_id' });

export default Card;
