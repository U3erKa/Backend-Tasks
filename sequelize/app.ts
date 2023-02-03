import express from 'express';
import { errorHandler } from './errorHandlers';
import router from './router';
const app = express();

app.use(router);
app.use(errorHandler);

export default app;
