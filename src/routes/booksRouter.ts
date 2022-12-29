import { Router } from 'express';
import { jsonParser } from '../middleware/booksMW';
const router = Router();

router.use(jsonParser);

export default router;