import { RequestHandler } from 'express';
import createHttpError from 'http-errors';
import { SuperHero } from '../models';

export const createSuperHero: RequestHandler = async (req, res, next) => {
  const { body } = req;

  try {
    const superHero = await SuperHero.create(body);
    res.status(201).send({ data: superHero });
  } catch (error) {
    next(error);
  }
};

export const getSuperHeroes: RequestHandler = async (req, res, next) => {
  try {
    const superHeroes = await SuperHero.findAll();
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
    const superHero = await SuperHero.findByPk(heroId);

    if (!superHero) {
      throw createHttpError(404, 'Superhero not found');
    }
    res.send(superHero);
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
      throw createHttpError(404, 'Superhero not found');
    }
    res.send(updatedHero);
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
      throw createHttpError(404, 'Superhero not found');
    }
    res.send({data: heroId});
  } catch (error) {
    next(error);
  }
};
