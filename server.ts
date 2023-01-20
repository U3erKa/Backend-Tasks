import app from './app';

const BASE_URL = 'http://localhost';
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server started at ${BASE_URL}:${PORT}`);
});

export default app;
