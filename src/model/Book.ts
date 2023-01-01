import { BOOKS_PATH } from '../constants';
import { Book as BookWithoutId, Books, BookWithId } from '../types';
import { readDB, updateDB } from '../utils/DBUtils';

export default class Book {
  static async create(bookData: BookWithoutId) {
    const books = await Book.getBooks();
    const book = books.find((book) => book.name === bookData.name);

    if (bookData.name === book?.name) {
      throw 409;
    }

    const newBook: BookWithId = { ...bookData, id: Date.now() };
    books.push(newBook);
    updateDB(BOOKS_PATH, books);
    return newBook;
  }

  static async getBooks() {
    const books: Books = await readDB(BOOKS_PATH);
    return books;
  }

  static async getBook(id: string | number) {
    const books = await this.getBooks();
    const book = books.find((book) => book.id === +id);

    if (!book) {
      throw 404;
    }

    return book;
  }

  static async updateBook(id: string, bookData: BookWithoutId) {
    const books = await this.getBooks();
    books.map((book) => (book.id === +id ? { ...book, ...bookData } : book));

    await updateDB(BOOKS_PATH, books);
    const book = await this.getBook(id);
    return book;
  }

  static async deleteBook(id: string) {
    const book = this.getBook(id);
    if (!book) {
      throw 404;
    }

    const books = await this.getBooks();
    books.filter((book) => book.id !== +id);

    await updateDB(BOOKS_PATH, books);
    return id;
  }
}
