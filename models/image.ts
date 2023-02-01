import { Model } from 'sequelize';

import type {
  Sequelize,
  DataTypes as _DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  BelongsToGetAssociationMixin,
  BelongsToSetAssociationMixin,
  BelongsToCreateAssociationMixin,
  NonAttribute,
} from 'sequelize';
import type { DB, SuperHero } from '../types';

export = (sequelize: Sequelize, DataTypes: typeof _DataTypes) => {
  class Image extends Model<InferAttributes<Image>, InferCreationAttributes<Image>> {
    declare path: string;

    declare id: CreationOptional<number>;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;

    declare getSuperHero: BelongsToGetAssociationMixin<SuperHero>;
    declare addSuperHero: BelongsToSetAssociationMixin<SuperHero, number>;
    declare createSuperHero: BelongsToCreateAssociationMixin<SuperHero & Model>;

    declare superHeroes?: NonAttribute<SuperHero[]>;

    static associate(models: DB) {
      Image.belongsTo(models.SuperHero, {
        foreignKey: 'heroId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
    }
  }
  Image.init(
    {
      path: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notNull: true,
          notEmpty: true,

          isSupportedExtension(filename: string) {
            const supportedExtensions = ['jpg', 'jpeg', 'png', 'webp', 'avif'];
            const ext = filename.split('.')[1];

            if (!supportedExtensions.includes(ext)) {
              throw new TypeError(`"${ext}" is not supported file extension`);
            }
          },
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
      modelName: 'Image',
      tableName: 'images',
      underscored: true,
    }
  );
  return Image;
};
