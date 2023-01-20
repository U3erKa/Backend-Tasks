-- @block Delete by id
DELETE FROM workers
WHERE id = 2;

-- @block Delete by name
DELETE FROM workers
WHERE name = 'Миколай';

-- @block Delete by salary range
DELETE FROM workers
WHERE salary < 200;
