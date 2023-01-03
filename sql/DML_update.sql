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
