import express from 'express';
import rootRouter from './routes';
import { handleErrors, handleValidationError } from './errorHandler';

const app = express();
app.use('/api', rootRouter);
app.use(handleValidationError, handleErrors);

export default app;
