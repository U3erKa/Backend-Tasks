import { Router } from 'express';
import {
  createSuperPower,
  deleteSuperPower,
  getSuperPower,
  getSuperPowers,
  updateSuperPower,
} from '../controller/superpowerController';

const superpowersRouter = Router();

superpowersRouter.route('/').get(getSuperPowers).post(createSuperPower);
superpowersRouter
  .route('/:powerId')
  .get(getSuperPower)
  .put(updateSuperPower)
  .delete(deleteSuperPower);

export default superpowersRouter;
