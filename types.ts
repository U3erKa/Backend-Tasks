import type _Sequelize from 'sequelize';
import type { Sequelize, Transaction } from 'sequelize';
import type _SuperHero from './models/superhero';
import type _SuperPower from './models/superpower';
import type _Image from './models/image';

export type DB = {
  sequelize: Sequelize;
  Sequelize: typeof _Sequelize;
  SuperHero: SuperHero;
  SuperPower: SuperPower;
  Image: Image;
};

export type SuperHero = ReturnType<typeof _SuperHero>;
export type SuperPower = ReturnType<typeof _SuperPower>;
export type Image = ReturnType<typeof _Image>;

export type AddPowersToHeroParams = {
  superPowers: string[];
  transaction: Transaction;
  hero: any;
};

export type CreatePowersParams = {
  superPowers: string[];
  transaction?: Transaction;
  uniqueOnly?: boolean;
};

export type AddimagesParams = {
  files?;
  hero;
  heroId?: string | number;
  optional?: boolean;
  transaction?: Transaction;
};
