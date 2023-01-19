import fs from 'fs/promises';
import { DB_PATH, options } from '../constants';

(async () => {
  try {
    await fs.readdir(DB_PATH);
  } catch (error) {
    await fs.mkdir(DB_PATH);
  }
})();

export const readDB = async <T>(path: string): Promise<T> => {
  const data = (await fs.readFile(path, options)) || '[]';
  return JSON.parse(data);
};

export const updateDB = async <T>(path: string, data: T) => {
  const parsedData = JSON.stringify(data, undefined, 2);
  return await fs.writeFile(path, parsedData, options.encoding);
};
