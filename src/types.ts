import * as yup from 'yup';
import { BOOK_SCHEMA } from './utils/validationSchema';

export type Books = BookWithId[];

export type Book = yup.InferType<typeof BOOK_SCHEMA>

export interface BookWithId extends Book {
  id: number;
}
