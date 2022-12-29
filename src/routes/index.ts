import { Router } from 'express';
import booksRouter from './booksRouter';
const router = Router();

router.use('/books', booksRouter);

export default router;
