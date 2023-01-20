import { EXISTING_BOOK_SCHEMA, NEW_BOOK_SCHEMA } from '../utils/validationSchema';
import type { RequestHandler } from 'express';

export const validateNewBook: RequestHandler = async (req, res, next) => {
  try {
    await NEW_BOOK_SCHEMA.validate(req.body);
    next();
  } catch (error) {
    next(error);
  }
};

export const validateExistingBook: RequestHandler = async (req, res, next) => {
  try {
    await EXISTING_BOOK_SCHEMA.validate(req.body);
    next();
  } catch (error) {
    next(error);
  }
};
