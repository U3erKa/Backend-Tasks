-- @block Alter, add
ALTER TABLE workers
ADD COLUMN is_male BOOLEAN,
ADD COLUMN email VARCHAR(255) UNIQUE CHECK(email != ''),
ADD COLUMN department VARCHAR(255) CHECK(department != '');

-- @block Alter, drop
ALTER TABLE workers
DROP COLUMN department;

-- @block Alter, set default
ALTER TABLE workers
ALTER COLUMN salary SET DEFAULT 150;
