import { Router } from 'express';
import {
  createSuperHero,
  deleteSuperHero,
  getSuperHero,
  getSuperHeroes,
  updateSuperHero,
} from '../controller/superheroController';

const superheroesRouter = Router();

superheroesRouter.route('/').get(getSuperHeroes).post(createSuperHero);
superheroesRouter.route('/:heroId').get(getSuperHero).put(updateSuperHero).delete(deleteSuperHero);

export default superheroesRouter;
