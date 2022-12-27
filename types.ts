export type Books = Book[];

export type Book = {
  name: string;
  author: string;
  description: string;
  format: string;
  pages: number;
  price: Price;
};

export interface BookWithId extends Book {
  id: number;
}

export type Price = {
  amount: number;
  currency: string;
};
