import createHttpError from 'http-errors';
import { Image, sequelize, SuperHero, SuperPower } from '../models';

import type { RequestHandler } from 'express';

export const createSuperHero: RequestHandler = async (req, res, next) => {
  const {
    body: { superPowers, images, ...heroData },
  } = req;

  try {
    const superHero = await sequelize.transaction(async (transaction) => {
      if (superPowers && !(superPowers instanceof Array)) {
        throw createHttpError(400, 'Parameter "superPowers" must be array of strings');
      }

      const hero = await SuperHero.create(heroData, { transaction, validate: true });

      if (superPowers && superPowers.length !== 0) {
        const newPowersList: string[] = [];
        const oldPowersList: number[] = [];

        const existingPowers = await SuperPower.findAll({
          attributes: ['superPower', 'id'],
          transaction,
        });
        const powers = existingPowers.map(({ dataValues }) => dataValues.superPower);
        const ids = existingPowers.map(({ dataValues }) => dataValues.id);

        for (let i = 0; i < superPowers.length; i++) {
          const newPower = superPowers[i];
          powers.includes(newPower) ? oldPowersList.push(ids[i]) : newPowersList.push(newPower);
        }

        const newPowers = newPowersList.map((superPower) => ({ superPower, heroId: hero.id }));

        await SuperPower.bulkCreate(newPowers, { transaction, validate: true });
        // await hero.addSuperPowers(oldPowersList, { transaction, validate: true });
        if (oldPowersList.length !== 0) {
          throw createHttpError(400, 'SuperPowers must be unique; feature not implemented');
        }
      }

      return { superHero: hero, superPowers };
    });
    res.status(201).send({ data: superHero });
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
