import { NextFunction, Request, Response } from 'express';
import Book from '../model/Book';

export const createBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const book = await Book.create(req.body);
    res.status(201).send(book);
  } catch (error) {
    next(error);
  }
};

export const getBooks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const books = await Book.getBooks();
    res.status(200).send(books);
  } catch (error) {
    next(error);
  }
};

export const getBook = async (req: Request, res: Response, next: NextFunction) => {
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

export const updateBook = async (req: Request, res: Response, next: NextFunction) => {
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

export const deleteBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      params: { bookId },
    } = req;
    const deletedBook = Book.deleteBook(bookId);

    res.status(200).send(deletedBook);
  } catch (error) {
    next(error);
  }
};
