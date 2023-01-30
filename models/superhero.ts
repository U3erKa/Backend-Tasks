import { Model } from 'sequelize';
import { PATTERNS } from '../constants';

import type {
  Sequelize,
  DataTypes as _DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  BelongsToManyGetAssociationsMixin,
  BelongsToManyAddAssociationMixin,
  BelongsToManyAddAssociationsMixin,
  BelongsToManySetAssociationsMixin,
  BelongsToManyRemoveAssociationMixin,
  BelongsToManyRemoveAssociationsMixin,
  BelongsToManyHasAssociationMixin,
  BelongsToManyHasAssociationsMixin,
  BelongsToManyCountAssociationsMixin,
  BelongsToManyCreateAssociationMixin,
  HasManyGetAssociationsMixin,
  HasManyAddAssociationMixin,
  HasManyAddAssociationsMixin,
  HasManySetAssociationsMixin,
  HasManyRemoveAssociationMixin,
  HasManyRemoveAssociationsMixin,
  HasManyHasAssociationMixin,
  HasManyHasAssociationsMixin,
  HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin,
  NonAttribute,
} from 'sequelize';
import type { DB, SuperPower, Image } from '../types';

export = (sequelize: Sequelize, DataTypes: typeof _DataTypes) => {
  class SuperHero extends Model<InferAttributes<SuperHero>, InferCreationAttributes<SuperHero>> {
    declare nickname: string;
    declare realName: string;
    declare originDescription: string;
    declare catchPhrase: string;

    declare id: CreationOptional<number>;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;

    declare getSuperPowers: BelongsToManyGetAssociationsMixin<SuperPower>;
    declare addSuperPower: BelongsToManyAddAssociationMixin<SuperPower, number>;
    declare addSuperPowers: BelongsToManyAddAssociationsMixin<SuperPower, number>;
    declare setSuperPowers: BelongsToManySetAssociationsMixin<SuperPower, number>;
    declare removeSuperPower: BelongsToManyRemoveAssociationMixin<SuperPower, number>;
    declare removeSuperPowers: BelongsToManyRemoveAssociationsMixin<SuperPower, number>;
    declare hasSuperPower: BelongsToManyHasAssociationMixin<SuperPower, number>;
    declare hasSuperPowers: BelongsToManyHasAssociationsMixin<SuperPower, number>;
    declare countSuperPowers: BelongsToManyCountAssociationsMixin;
    declare createSuperPower: BelongsToManyCreateAssociationMixin<SuperPower & Model>;

    declare getImages: HasManyGetAssociationsMixin<Image>;
    declare addImage: HasManyAddAssociationMixin<Image, number>;
    declare addImages: HasManyAddAssociationsMixin<Image, number>;
    declare setImages: HasManySetAssociationsMixin<Image, number>;
    declare removeImage: HasManyRemoveAssociationMixin<Image, number>;
    declare removeImages: HasManyRemoveAssociationsMixin<Image, number>;
    declare hasImage: HasManyHasAssociationMixin<Image, number>;
    declare hasImages: HasManyHasAssociationsMixin<Image, number>;
    declare countImages: HasManyCountAssociationsMixin;
    declare createImage: HasManyCreateAssociationMixin<Image & Model, 'heroId'>;

    declare superPowers?: NonAttribute<SuperPower[]>;
    declare images?: NonAttribute<Image[]>;

    static associate(models: DB) {
      SuperHero.belongsToMany(models.SuperPower, {
        through: 'superheroes_to_superpowers',
        foreignKey: 'powerId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        as: 'superPowers',
      });

      SuperHero.hasMany(models.Image, {
        foreignKey: 'heroId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        as: 'images',
      });
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
          is: PATTERNS.NAME,
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
