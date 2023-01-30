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
  NonAttribute,
} from 'sequelize';
import type { DB, SuperHero } from '../types';

export = (sequelize: Sequelize, DataTypes: typeof _DataTypes) => {
  class SuperPower extends Model<InferAttributes<SuperPower>, InferCreationAttributes<SuperPower>> {
    declare superPower: string;

    declare id: CreationOptional<number>;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;

    declare getSuperHeroes: BelongsToManyGetAssociationsMixin<SuperHero>;
    declare addSuperHero: BelongsToManyAddAssociationMixin<SuperHero, number>;
    declare addSuperHeroes: BelongsToManyAddAssociationsMixin<SuperHero, number>;
    declare setSuperHeroes: BelongsToManySetAssociationsMixin<SuperHero, number>;
    declare removeSuperHero: BelongsToManyRemoveAssociationMixin<SuperHero, number>;
    declare removeSuperHeroes: BelongsToManyRemoveAssociationsMixin<SuperHero, number>;
    declare hasSuperHero: BelongsToManyHasAssociationMixin<SuperHero, number>;
    declare hasSuperHeroes: BelongsToManyHasAssociationsMixin<SuperHero, number>;
    declare countSuperHeroes: BelongsToManyCountAssociationsMixin;
    declare createSuperHero: BelongsToManyCreateAssociationMixin<SuperHero & Model>;

    declare superHeroes?: NonAttribute<SuperHero[]>;

    static associate(models: DB) {
      SuperPower.belongsToMany(models.SuperHero, {
        through: 'superheroes_to_superpowers',
        foreignKey: 'heroId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        as: 'superHeroes',
      });
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
          is: PATTERNS.POWER,
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
