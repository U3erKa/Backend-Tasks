import { json, NextFunction, Request, Response } from 'express';
import { BOOK_SCHEMA } from '../utils/validationSchema';

export const jsonParser = json();

export const validateBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await BOOK_SCHEMA.validate(req.body);
    next();
  } catch (error) {
    next(error);
  }
};
