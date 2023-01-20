import Book from '../model/Book';
import type { RequestHandler } from 'express';

export const createBook: RequestHandler = async (req, res, next) => {
  try {
    const book = await Book.create(req.body);
    res.status(201).send(book);
  } catch (error) {
    next(error);
  }
};

export const getBooks: RequestHandler = async (req, res, next) => {
  try {
    const books = await Book.getBooks();
    res.status(200).send(books);
  } catch (error) {
    next(error);
  }
};

export const getBook: RequestHandler = async (req, res, next) => {
  try {
    const {
      params: { bookId },
    } = req;
    const book = await Book.getBook(bookId);

    res.status(200).send(book);
  } catch (error) {
    next(error);
  }
};

export const updateBook: RequestHandler = async (req, res, next) => {
  try {
    const {
      body,
      params: { bookId },
    } = req;
    const newBook = await Book.updateBook(bookId, body);

    res.status(200).send(newBook);
  } catch (error) {
    next(error);
  }
};

export const deleteBook: RequestHandler = async (req, res, next) => {
  try {
    const {
      params: { bookId },
    } = req;
    const deletedBook = await Book.deleteBook(bookId);

    res.status(200).send(deletedBook);
  } catch (error) {
    next(error);
  }
};
