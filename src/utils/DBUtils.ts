import fs from 'fs/promises';

export const readDB = async <T>(path: string): Promise<T> => {
  return JSON.parse(await fs.readFile(path, 'utf-8')) ?? [];
};

export const updateDB = async <T>(path: string, data: T) => {
  return await fs.writeFile(path, JSON.stringify(data, undefined, 2), 'utf8');
};
