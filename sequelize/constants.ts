export const PROTOCOL = process.env.PROTOCOL ?? 'http';
export const BASE_URL = process.env.BASE_URL ?? '127.0.0.1';
// @ts-ignore
export const PORT = +process.env.PORT ?? 5000;

export const PATTERNS = {
  /**
   * Allows letters, spaces and dots in name.  
   * Can't start or end with whitespace, min. 6 characters
   * @example 'Rock D. Johnson'
   */
  NAME: /^[a-z][a-z\ \.]{4,}[a-z]$/i,
  /**
   * Allows letters, spaces and dots in the power.  
   * Can't start or end with whitespace, min. 6 characters
   * @example 'clip through walls'
   */
  POWER: /^[a-z][a-z\ \.]{4,}[a-z]$/i,
};
