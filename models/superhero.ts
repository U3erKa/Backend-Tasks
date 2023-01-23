import { Model } from 'sequelize';

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
  NonAttribute,
} from 'sequelize';
import type { DB, SuperPower } from '../types';

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

    // Since TS cannot determine model association at compile time
    // we have to declare them here purely virtually
    // these will not exist until `Model.init` was called.
    declare getSuperPowers: BelongsToManyGetAssociationsMixin<SuperPower>; // Note the null assertions!
    declare addSuperPower: BelongsToManyAddAssociationMixin<SuperPower, number>;
    declare addSuperPowers: BelongsToManyAddAssociationsMixin<SuperPower, number>;
    declare setSuperPowers: BelongsToManySetAssociationsMixin<SuperPower, number>;
    declare removeSuperPower: BelongsToManyRemoveAssociationMixin<SuperPower, number>;
    declare removeSuperPowers: BelongsToManyRemoveAssociationsMixin<SuperPower, number>;
    declare hasSuperPower: BelongsToManyHasAssociationMixin<SuperPower, number>;
    declare hasSuperPowers: BelongsToManyHasAssociationsMixin<SuperPower, number>;
    declare countSuperPowers: BelongsToManyCountAssociationsMixin;
    declare createSuperPower: BelongsToManyCreateAssociationMixin<SuperPower & Model>;

    // You can also pre-declare possible inclusions, these will only be populated if you
    // actively include a relation.
    declare superPowers?: NonAttribute<SuperPower[]>; // Note this is optional since it's only populated when explicitly requested in code

    static associate(models: DB) {
      SuperHero.belongsToMany(models.SuperPower, {
        through: 'superheroes_to_superpowers',
        foreignKey: 'powerId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        as: 'superPowers',
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
