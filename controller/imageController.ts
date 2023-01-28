import createHttpError from 'http-errors';
import { SuperHero, Image } from '../models';

import type { RequestHandler } from 'express';

export const addImagesToHero: RequestHandler = async (req, res, next) => {
  const {
    files,
    params: { heroId },
  } = req;

  try {
    const hero = await SuperHero.findByPk(heroId);

    if (!hero) {
      throw createHttpError(404, `Superhero not found: ${heroId}`);
    }
    if (!files) {
      throw createHttpError(400, `No files provided: ${files}`);
    }
    if (!(files instanceof Array)) {
      throw createHttpError(400, `"files" field must be an array: ${files}`);
    }

    const imagesPaths = files.map((file) => ({ path: file.filename, heroId }));
    const images = await Image.bulkCreate(imagesPaths);

    res.status(201).send({ data: images });
  } catch (error) {
    next(error);
  }
};
