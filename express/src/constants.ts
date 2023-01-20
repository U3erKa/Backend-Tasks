import path from 'path';
import { FsOptions } from './types';

export const BASE_URL = 'http://localhost';
export const PORT = 3000;
export const DB_PATH = path.join(__dirname, '..', 'data');
export const BOOKS_PATH = path.join(DB_PATH, 'books.json');
export const options: FsOptions = { encoding: 'utf8', flag: 'a+' };
