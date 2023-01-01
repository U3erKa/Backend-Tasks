import { NextFunction, Request, Response } from 'express';
import { ValidationError } from 'yup';
import HTTPError from '../errors/HTTPError';

export const handleErrors = async (err: HTTPError, req: Request, res: Response, next: NextFunction) => {
  res.status(err.status ?? 500).send(err.message ?? 'Something went wrong');
};

export const handleValidationError = async (err: HTTPError, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ValidationError) {
    console.log(true)
    return res.status(err.status ?? 500).send(err.message ?? 'Something went wrong');
  }
  next(err);
};
