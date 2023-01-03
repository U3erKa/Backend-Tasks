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
