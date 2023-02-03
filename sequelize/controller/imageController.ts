import createHttpError from 'http-errors';
import { SuperHero, Image } from '../models';

import type { RequestHandler } from 'express';
import { addImages } from '../services/imageService';

export const addImagesToHero: RequestHandler = async (req, res, next) => {
  const {
    files,
    params: { heroId },
  } = req;

  try {
    const hero = await SuperHero.findByPk(heroId);
    const images = await addImages({ files, hero, heroId, optional: false })

    res.status(201).send({ data: images });
  } catch (error) {
    next(error);
  }
};
