import { Model } from 'sequelize';

import type {
  Sequelize,
  DataTypes as _DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';

const ModelConstructor = (sequelize: Sequelize, DataTypes: typeof _DataTypes) => {
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
    static associate(models) {
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
          // allows letters, spaces and dots in name
          // ex.: Rock D. Johnson
          notNull: true,
          notEmpty: true,
          is: /^[a-z\ \.]{4,}$/i,
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
      id: DataTypes.DATE,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
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

// @ts-ignore the only non-type export
export = ModelConstructor;
export type _SuperHero = ReturnType<typeof ModelConstructor>;
