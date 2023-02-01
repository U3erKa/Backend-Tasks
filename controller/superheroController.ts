import createHttpError from 'http-errors';

import { Image, sequelize, SuperHero, SuperPower } from '../models';
import { addSuperPowers, addImages } from '../services/heroService';

import type { RequestHandler } from 'express';
import type { SuperHero as _SuperHero } from '../types';

export const createSuperHero: RequestHandler = async (req, res, next) => {
  const {
    files,
    body: { superPowers, images, ...heroData },
  } = req;

  try {
    const superHero = await sequelize.transaction(async (transaction) => {
      if (superPowers && !(superPowers instanceof Array)) {
        throw createHttpError(400, 'Parameter "superPowers" must be array of strings');
      }

      const result: any = {};
      const hero = await SuperHero.create(heroData, { transaction, validate: true });

      result.hero = hero;
      result.powers = await addSuperPowers({ superPowers, transaction, hero });
      result.images = await addImages({ files, transaction, hero });

      return result;
    });

    res.status(201).send({ data: superHero });
  } catch (error) {
    next(error);
  }
};

export const addHeroToPower: RequestHandler = async (req, res, next) => {
  const {
    params: { powerId },
    // @ts-ignore
    hero,
  } = req;

  try {
    const power = await SuperPower.findByPk(powerId);

    if (!power) {
      throw createHttpError(404, `SuperPower not found: ${powerId}`);
    }

    await hero.addSuperPower(power);

    res.send({ data: 'Hero added' });
  } catch (error) {
    next(error);
  }
};

export const getSuperHeroes: RequestHandler = async (req, res, next) => {
  try {
    const superHeroes = await SuperHero.findAll({
      include: [
        {
          model: SuperPower,
          required: false,
          attributes: ['id', 'superPower'],
          through: { attributes: [] },
          as: 'superPowers',
        },
        { model: Image, required: false, attributes: ['id', 'path'], as: 'images' },
      ],
    });

    res.send({ data: superHeroes });
  } catch (error) {
    next(error);
  }
};

export const getSuperHero: RequestHandler = async (req, res, next) => {
  const {
    params: { heroId },
  } = req;

  try {
    const superHero = await SuperHero.findByPk(heroId, {
      include: [
        {
          model: SuperPower,
          required: false,
          attributes: ['id', 'superPower'],
          through: { attributes: [] },
          as: 'superPowers',
        },
        { model: Image, required: false, attributes: ['id', 'path'], as: 'images' },
      ],
    });

    if (!superHero) {
      throw createHttpError(404, `Superhero not found: ${heroId}`);
    }
    res.send({ data: superHero });
  } catch (error) {
    next(error);
  }
};

export const updateSuperHero: RequestHandler = async (req, res, next) => {
  const {
    params: { heroId },
    body,
  } = req;

  try {
    const [updatedHeroesCount, [updatedHero]] = await SuperHero.update(body, {
      where: { id: heroId },
      returning: true,
    });

    if (updatedHeroesCount === 0) {
      throw createHttpError(404, `Superhero not found: ${heroId}`);
    }
    res.send({ data: updatedHero });
  } catch (error) {
    next(error);
  }
};

export const deleteSuperHero: RequestHandler = async (req, res, next) => {
  const {
    params: { heroId },
  } = req;

  try {
    const deletedHeroesCount = await SuperHero.destroy({ where: { id: heroId } });

    if (deletedHeroesCount === 0) {
      throw createHttpError(404, `Superhero not found: ${heroId}`);
    }
    res.send({ data: heroId });
  } catch (error) {
    next(error);
  }
};
