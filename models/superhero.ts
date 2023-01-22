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
  class SuperHero extends Model<InferAttributes<SuperHero>, InferCreationAttributes<SuperHero>> {
    declare nickname: string;
    declare realName: string;
    declare originDescription: string;
    declare catchPhrase: string;

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
  SuperHero.init(
    {
      nickname: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true,
          isAlpha: true,
        },
      },
      realName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true,
          // allows letters, spaces and dots in name, can't start or end with whitespace
          // ex.: Rock D. Johnson
          is: /^[a-z][a-z\ \.]{4,}[a-z]$/i,
        },
      },
      originDescription: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true,
        },
      },
      catchPhrase: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true,
        },
      },
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      createdAt: { type: DataTypes.DATE, allowNull: true },
      updatedAt: { type: DataTypes.DATE, allowNull: true },
    },
    {
      sequelize,
      modelName: 'SuperHero',
      tableName: 'super_heroes',
      underscored: true,
    }
  );
  return SuperHero;
};
