-- @block Create
CREATE TABLE workers (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL CHECK(name != ''),
  birthday DATE NOT NULL CHECK(birthday > '1900-01-01' AND birthday <= current_date),
  salary INT NOT NULL CHECK(salary > 0)
);

-- @block Drop
DROP TABLE workers;

-- @block Alter, add
ALTER TABLE workers
ADD COLUMN is_male BOOLEAN,
ADD COLUMN email VARCHAR(255) CHECK(email != ''),
ADD COLUMN department VARCHAR(255) CHECK(department != '');

-- @block Alter, drop
ALTER TABLE workers
DROP COLUMN department;

-- @block Alter, set default
ALTER TABLE workers
ALTER COLUMN salary SET DEFAULT 150;

-- @block Insert one
INSERT INTO workers
(name, birthday, salary, is_male)
VALUES
('Микита', '1990-01-01', 300, true);

-- @block Insert one
INSERT INTO workers
(name, birthday, salary, is_male)
VALUES
('Світлана', '1970-01-01', 1200, false);

-- @block Insert many
INSERT INTO workers
(name, birthday, is_male)
VALUES
('Ярослав', '1980-01-01', true),
('Петро', '1993-01-01', true);

-- @block Insert more
INSERT INTO workers
(name, birthday, salary, is_male)
VALUES
('Оксана', '1990-01-01', 1100, false),
('Василь', '1993-01-01', 800, true),
('Миколай', '1950-12-19', 1400, true);

-- @block Update salary
UPDATE workers
SET salary = 425
WHERE name = 'Микита';

-- @block Update birthday
UPDATE workers
SET birthday = '1975-01-01'
WHERE id = 4;

-- @block Update salary 2
UPDATE workers
SET salary = 600
WHERE is_male = false AND id > 2 AND id <= 5;

-- @block Update name and email
UPDATE workers
SET name = 'Євген', email = 'email@example.com'
WHERE name = 'Василь';

-- @block Delete by id
DELETE FROM workers
WHERE id = 2;

-- @block Delete by name
DELETE FROM workers
WHERE name = 'Миколай';

-- @block Delete by salary range
DELETE FROM workers
WHERE salary < 200;
