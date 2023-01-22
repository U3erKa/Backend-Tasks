import type _Sequelize from 'sequelize';
import type { Sequelize } from 'sequelize';
import type _SuperHero from './models/superhero';

export type DB = {
  sequelize: Sequelize;
  Sequelize: typeof _Sequelize;
  SuperHero: ReturnType<typeof _SuperHero>;
};
