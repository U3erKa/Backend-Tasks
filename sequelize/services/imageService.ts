import createHttpError from 'http-errors';

import { Image } from '../models';
import type { AddimagesParams } from '../types';

export async function addImages({
  files,
  hero,
  heroId = hero.id,
  optional = true,
  transaction,
}: AddimagesParams) {
  if (!optional && !files) {
    throw createHttpError(400, `No files provided: ${files}`);
  }
  if (!hero) {
    throw createHttpError(404, `Superhero not found: ${heroId}`);
  }

  if (files) {
    const imagesPaths = files.map((file) => ({ path: file.filename, heroId }));
    await Image.bulkCreate(imagesPaths, { transaction, validate: true });

    return imagesPaths.map((image) => image.path);
  }
}
