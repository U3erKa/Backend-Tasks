# Sequelize DB

## Задача

Нужно спроектировать базу данных для людей с суперспособностями. Для этого нужно веб приложение для произведения CRUD операций над моделью суперлюдей.

Технологический стек:

- Node.js
- Express
- Sequelize

## Базовый уровень

- создать сервер и CRUD для суперлюдей и их суперспособностей
- при GET запросах суперлюдей отдавать все все связанные с ними данные

## Продвинутый уровень

- при создании указывать суперспособности для суперчеловека
- приделать хранение и получение картинок суперчеловека

### Пример данных Суперчеловека

- **`nickname`**: Superman
- **`real_name`**: Clark Kent
- **`origin_description`**: he was born Kal-El on the planet Krypton, before being rocketed to Earth as an infant by his scientist father - Jor-El, moments before Krypton's destruction...
- **`superpowers`**: solar energy absorption and healing factor, solar flare and heat vision, solar invulnerability, flight...
- **`catch_phrase`**: "Look, up in the sky, it's a bird, it's a plane, it's Superman!"
- **`images`**: a set of images of the superhero

### Декомпозиция задачи

- [ ] Спроектировать БД. Сущности и связи.
- [x] Создать нодовский проект(npm init) и установить все необходимые пакеты
- [x] Проинициализировать проект (sequelize init)
- [ ] Создать базу данных по конфигурации (sequelize db:create)
- [ ] Написать sequelize-cli команду для создания моделей сущностей.
- [ ] Отредактировать миграцию с учетом дополнительных ограничений.
- [ ] Выполнить миграцию.
- [ ] Отредактировать модели. Не забывайте про валидацию и стиль именования.
- [ ] Разработать http-запросы, маршруты и контроллер для тестирования разработанных моделей.
