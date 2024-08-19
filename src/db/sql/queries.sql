INSERT INTO role_transactions (role_id, created_by, updated_by) VALUES ($1, $2, $3);


INSERT INTO employee_transactions (employee_id, created_by, updated_by) VALUES ($1, $2, $3);


DELETE FROM department_transactions WHERE id = 2;


DELETE FROM department WHERE id = 2;

UPDATE department SET is_deleted = TRUE WHERE id = 2;
