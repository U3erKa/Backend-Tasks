import { Router } from 'express';
import multer from 'multer';
import path from 'path';

import { addImagesToHero } from '../controller/imageController';
import {
  addHeroToPower,
  createSuperHero,
  deleteSuperHero,
  getHero,
  getSuperHero,
  getSuperHeroes,
  updateSuperHero,
} from '../controller/superheroController';

const superheroesRouter = Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve(__dirname, '../../public/images'));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

superheroesRouter.route('/').get(getSuperHeroes).post(createSuperHero);
superheroesRouter
  .route('/:heroId')
  .get(getSuperHero)
  .post(upload.array('images'), addImagesToHero)
  .put(updateSuperHero)
  .delete(deleteSuperHero);

superheroesRouter.route('/:heroId/superpowers/:powerId').post(getHero, addHeroToPower);

export default superheroesRouter;
