import { Router, json } from 'express';
import superheroesRouter from './superheroesRouter';
const router = Router();

router.use(json());
router.use('/superheroes', superheroesRouter);

export default router;
