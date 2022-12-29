import { BOOKS_PATH } from '../constants';
import { Book as BookType, Books, BookWithId } from '../types';
import { readDB } from '../utils/DBUtils';

export default class Book {
  static async create(bookData: BookType) {
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
    const books = await Book.getBooks();
    const book = books.find((book) => book.id === +id);

    return book;
  }

  static async updateBook(id: string, bookData: Book) {
    const book = await Book.getBook(id);
    const newBook = { ...book, ...bookData };

    return newBook;
  }

  static async deleteBook(id: string) {
    const books = await Book.getBooks();
    books.filter((book) => book.id !== +id);

    return id;
  }
}
