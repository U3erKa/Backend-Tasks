import { Router } from 'express';
import { createBook, deleteBook, getBook, getBooks, updateBook } from '../controller/bookController';
import { validateExistingBook, validateNewBook } from '../middleware/booksMW';

const router = Router();

router.route('/').get(getBooks).post(validateNewBook, createBook);

router.route('/:bookId').get(getBook).put(validateExistingBook, updateBook).delete(deleteBook);

export default router;
