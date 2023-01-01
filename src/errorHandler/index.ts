import { NextFunction, Request, Response } from 'express';
import { ValidationError } from 'yup';
import HTTPError from '../errors/HTTPError';

export const handleErrors = async (err: HTTPError, req: Request, res: Response, next: NextFunction) => {
  res.status(err.status).send(err.message);
};

export const handleValidationError = async (err: HTTPError, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ValidationError) {
    return res.status(err.status).send(err.message);
  }
  next(err);
};
