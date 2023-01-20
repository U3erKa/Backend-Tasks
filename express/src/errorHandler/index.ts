import { ValidationError } from 'yup';
import HTTPError from '../errors/HTTPError';
import type { ErrorRequestHandler } from 'express';

export const handleErrors: ErrorRequestHandler = async (err: HTTPError, req, res, next) => {
  res.status(err.status ?? 500).send(err.message ?? 'Something went wrong');
};

export const handleValidationError: ErrorRequestHandler = async (err: HTTPError | ValidationError, req, res, next) => {
  if (err instanceof ValidationError) {
    return res.status(400).send(err.message ?? 'Something went wrong');
  }
  next(err);
};
