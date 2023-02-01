import createHttpError from 'http-errors';
import { SuperHero } from '../models';
import { RequestHandler } from 'express';


export const getHero: RequestHandler = async (req, res, next) => {
  const {
    params: { heroId },
  } = req;

  const hero = await SuperHero.findByPk(heroId);

  if (!hero) {
    return next(createHttpError(404, `SuperHero not found: ${heroId}`));
  }
  // @ts-ignore
  req.hero = hero;
  next();
};
