import type _Sequelize from 'sequelize';
import type { Sequelize } from 'sequelize';
import type _SuperHero from './models/superhero';
import type _SuperPower from './models/superpower';

export type DB = {
  sequelize: Sequelize;
  Sequelize: typeof _Sequelize;
  SuperHero: ReturnType<typeof _SuperHero>;
  SuperPower: ReturnType<typeof _SuperPower>;
};
