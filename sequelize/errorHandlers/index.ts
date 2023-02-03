import type { ErrorRequestHandler } from 'express';

export const errorHandler: ErrorRequestHandler = async (err, req, res, next) => {
  res.status(err.status || 500).send({ error: err instanceof Array ? err : [err] });
};
