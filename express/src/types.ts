import type { OpenMode } from 'fs';
import type * as yup from 'yup';
import type { NEW_BOOK_SCHEMA } from './utils/validationSchema';

export type FsOptions = {
  encoding: BufferEncoding;
  flag?: OpenMode | undefined;
};

export type Books = BookWithId[];

export type Book = yup.InferType<typeof NEW_BOOK_SCHEMA>;

export interface BookWithId extends Book {
  id: number;
}
