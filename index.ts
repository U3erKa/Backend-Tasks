import * as http from 'http';
import app from './src/app';
import { BASE_URL, PORT } from './src/constants';

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server runs at ${BASE_URL}:${PORT}`);
});
