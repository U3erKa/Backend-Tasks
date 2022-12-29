import { Router } from 'express';
import { createBook, deleteBook, getBook, getBooks, updateBook } from '../controller/bookController';
import { jsonParser, validateBook } from '../middleware/booksMW';

const router = Router();

router.use(jsonParser);

router.route('/').get(getBooks).post(validateBook, createBook);

router.route('/:bookId').get(getBook).put(validateBook, updateBook).delete(deleteBook);

export default router;
