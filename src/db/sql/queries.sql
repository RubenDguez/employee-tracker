
SELECT role.id, role.title, role.salary, department.name AS department_name, role.created_at, role.updated_at
FROM role
JOIN department ON role.department_id = department.id;

SELECT role.id, role.title, role.salary, department.name AS department_name, role.created_at, role.updated_at
FROM role
JOIN department ON role.department_id = department.id
WHERE role.id = 1;

SELECT employee.id, employee.first_name, employee.last_name, role.title AS role_name, 
    CASE WHEN manager.id IS NULL THEN 'NONE' ELSE CONCAT(manager.first_name, ' ', manager.last_name) END AS manager_full_name, 
    employee.created_at, employee.updated_at
FROM employee
JOIN role ON employee.role_id = role.id
LEFT JOIN employee AS manager ON employee.manager_id = manager.id;

SELECT employee.id, employee.first_name, employee.last_name, role.title AS role_name, 
    CASE WHEN manager.id IS NULL THEN 'NONE' ELSE CONCAT(manager.first_name, ' ', manager.last_name) END AS manager_full_name, 
    employee.created_at, employee.updated_at
FROM employee
JOIN role ON employee.role_id = role.id
LEFT JOIN employee AS manager ON employee.manager_id = manager.id
WHERE employee.id = 1;


SELECT employee.id, employee.first_name, employee.last_name, role.title AS role_name, role.salary,
    CASE WHEN manager.id IS NULL THEN 'NONE' ELSE CONCAT(manager.first_name, ' ', manager.last_name) END AS manager_full_name, 
    employee.created_at, employee.updated_at,
    department.name AS department_name,
    CONCAT(created_by_employee.first_name, ' ', created_by_employee.last_name) AS created_by_full_name,
    CONCAT(updated_by_employee.first_name, ' ', updated_by_employee.last_name) AS updated_by_full_name
FROM employee
JOIN role ON employee.role_id = role.id
LEFT JOIN employee AS manager ON employee.manager_id = manager.id
JOIN department ON role.department_id = department.id
JOIN employee_transactions ON employee.id = employee_transactions.employee_id
JOIN employee AS created_by_employee ON employee_transactions.created_by = created_by_employee.id
JOIN employee AS updated_by_employee ON employee_transactions.updated_by = updated_by_employee.id;
