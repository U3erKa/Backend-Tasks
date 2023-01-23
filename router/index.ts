import { Router, json } from 'express';
import superheroesRouter from './superheroesRouter';
import superpowersRouter from './superpowersRouter';
const router = Router();

router.use(json());
router.use('/superheroes', superheroesRouter);
router.use('/superpowers', superpowersRouter);

export default router;
