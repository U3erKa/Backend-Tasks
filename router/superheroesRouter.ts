import { Router } from 'express';

import { addImagesToHero } from '../controller/imageController';
import {
  addHeroToPower,
  createSuperHero,
  deleteSuperHero,
  getSuperHero,
  getSuperHeroes,
  updateSuperHero,
} from '../controller/superheroController';
import { getHero } from '../middleware/heroMW';
import { uploadImages } from '../middleware/imageMW';

const superheroesRouter = Router();

superheroesRouter.route('/').get(getSuperHeroes).post(uploadImages, createSuperHero);
superheroesRouter
  .route('/:heroId')
  .get(getSuperHero)
  .post(uploadImages, addImagesToHero)
  .put(updateSuperHero)
  .delete(deleteSuperHero);

superheroesRouter.route('/:heroId/superpowers/:powerId').post(getHero, addHeroToPower);

export default superheroesRouter;
