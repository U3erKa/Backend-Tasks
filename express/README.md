# Basic express server

Написать сервер с помощью фреймворка express.  
Сервер будет использован для книжного магазина и должен поддерживать CRUD операции над сущностью книги.  
Сервер дожен быть построен согласно архитектуре MVC/MVP.  
Для книг должен быть создан отдельный роутер.

## Advanced level

- При создании и изменении данных книги нужно проводить валидацию, не позволяющую вносить откровенно кривые данные (отрицательное количество страниц, некорректные типы данных и тд)  
- Реализйте миддлвер для отправки ошибок и отправляйте ответы с ошибками в подходящих ситуациях (некорректное создание, не нахождеение искомой книги и т.д)
