
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
	employee.created_at, employee.updated_at
FROM employee
JOIN role ON employee.role_id = role.id
LEFT JOIN employee AS manager ON employee.manager_id = 1;


SELECT login.username, role.title AS role_title
FROM login
JOIN employee ON login.employee_id = employee.id
JOIN role ON employee.role_id = role.id
WHERE login.username = 'argenisdominguez' AND login.userpassword = 'pass';
