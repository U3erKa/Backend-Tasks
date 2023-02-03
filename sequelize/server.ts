import { config as dotenv } from 'dotenv';
dotenv();
import app from './app';
import { PORT, BASE_URL, PROTOCOL } from './constants';

app.listen(PORT, BASE_URL, () => {
  console.log(`Server started at ${PROTOCOL}://${BASE_URL}:${PORT}`);
});

export default app;
