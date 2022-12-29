import { BOOKS_PATH } from '../constants';
import { Book as BookWithoutId, Books, BookWithId } from '../types';
import { readDB } from '../utils/DBUtils';

export default class Book {
  static async create(bookData: BookWithoutId) {
    const newBook: BookWithId = { ...bookData, id: Date.now() };
    const books = await Book.getBooks();

    books.push(newBook);
    return newBook;
  }

  static async getBooks() {
    const books: Books = await readDB(BOOKS_PATH);
    return books;
  }

  static async getBook(id: string) {
    const books = await this.getBooks();
    const book = books.find((book) => book.id === +id);

    if (!book) {
      throw 404;
    }

    return book;
  }

  static async updateBook(id: string, bookData: BookWithoutId) {
    const book = await this.getBook(id);
    const newBook = { ...book, ...bookData };

    return newBook;
  }

  static async deleteBook(id: string) {
    const books = await this.getBooks();
    this.getBook(id);

    books.filter((book) => book.id !== +id);

    return id;
  }
}
