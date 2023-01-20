import { BOOKS_PATH } from '../constants';
import HTTPError from '../errors/HTTPError';
import { readDB, updateDB } from '../utils/DBUtils';
import type { Book as BookWithoutId, Books, BookWithId } from '../types';

export default class Book {
  static async #checkBookName(bookData: BookWithoutId, updatedBookId?: number) {
    const books = await this.getBooks();
    const book = books.find((book) => book.name === bookData.name && book.id !== updatedBookId);
    
    if (bookData.name === book?.name) {
      throw new HTTPError(409, 'Book with given title already exists');
    }
  }

  static async create(bookData: BookWithoutId) {
    await this.#checkBookName(bookData);
    const books = await this.getBooks();

    const newBook: BookWithId = { ...bookData, id: Date.now() };
    books.push(newBook);

    await updateDB(BOOKS_PATH, books);
    return newBook;
  }

  static async getBooks() {
    const books = await readDB<Books>(BOOKS_PATH);
    return books;
  }

  static async getBook(id: string | number) {
    const books = await this.getBooks();
    const book = books.find((book) => book.id === +id);

    if (!books.length || !book) {
      throw new HTTPError(404, 'Requested book was not found');
    }

    return book;
  }

  static async updateBook(id: string, bookData: BookWithoutId) {
    await this.#checkBookName(bookData, +id);
    const books = await this.getBooks();

    const updatedBooks = books.map((book) => (book.id === +id ? { ...book, ...bookData } : book));

    await updateDB(BOOKS_PATH, updatedBooks);
    const book = await this.getBook(id);
    return book;
  }

  static async deleteBook(id: string) {
    await this.getBook(id);
    const books = await this.getBooks();
    const newBooks = books.filter((book) => book.id !== +id);

    await updateDB(BOOKS_PATH, newBooks);
    return id;
  }
}
