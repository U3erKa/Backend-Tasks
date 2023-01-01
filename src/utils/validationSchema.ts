import * as yup from 'yup';

export const BOOK_SCHEMA = yup.object({
  name: yup.string().required(),
  author: yup.string().required(),
  description: yup.string(),
  format: yup.string().required().oneOf(['pdf', 'djvu', 'epub']),
  pages: yup.number().integer().min(0),
  price: yup
    .object({
      amount: yup.number().required(),
      currency: yup.string().required().oneOf(['UAH', 'USD', 'EUR']),
    })
    .required(),
});
