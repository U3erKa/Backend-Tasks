-- @block Create
CREATE TABLE workers (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL CHECK(name != ''),
  birthday DATE NOT NULL CHECK(birthday > '1900-01-01' AND birthday <= current_date),
  salary INT NOT NULL CHECK(salary > 0)
);

-- @block Drop
DROP TABLE workers;
