import * as yup from 'yup';

export const BOOK_SCHEMA = yup.object({
  name: yup.string().required(),
  author: yup.string().required(),
  description: yup.string(),
  format: yup.string().required(),
  pages: yup.number().integer(),
  price: yup.object({
    amount: yup.number().required(),
    currency: yup.string().required(),
  }).required(),
});
