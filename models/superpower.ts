import { Model } from 'sequelize';

import type {
  Sequelize,
  DataTypes as _DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import type { DB } from '../types';

export = (sequelize: Sequelize, DataTypes: typeof _DataTypes) => {
  class SuperPower extends Model<InferAttributes<SuperPower>, InferCreationAttributes<SuperPower>> {
    declare superPower: string;

    // id, createdAt & updatedAt can be undefined during creation
    declare id: CreationOptional<number>;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models: DB) {
      // define association here
    }
  }
  SuperPower.init(
    {
      superPower: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true,
          // allows letters, spaces and dots in the power, can't start or end with whitespace
          // e.g. clip through walls
          is: /^[a-z][a-z\ \.]{4,}[a-z]$/i,
        },
      },
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'SuperPower',
      tableName: 'super_powers',
      underscored: true,
    }
  );
  return SuperPower;
};
