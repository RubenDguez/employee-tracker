DO $$
    BEGIN

        INSERT INTO department (name) 
        VALUES 
            ('Store'),
            ('Electric Guitars'),
            ('Keyboards'),
            ('Acoustic Guitars'),
            ('Recording'),
            ('Amps'),
            ('DJ Gear'),
            ('Effects'),
            ('Drums'),
            ('Basses'),
            ('Accessories'),
            ('Live Sound'),
            ('Used');

        INSERT INTO role (title, salary, department_id)
        VALUES 
            ('Manager', 65000, 1),
            ('Cashier', 30000, 1),
            ('Luthier', 65000, 2);

        INSERT INTO employee (first_name, last_name, role_id, manager_id)
        VALUES
            ('Argenis', 'Dominguez', 1, null);

    RAISE NOTICE 'TRANSACTION COMPLETED';

    EXCEPTION WHEN OTHERS THEN
        RAISE NOTICE 'AN ERROR HAS OCCURRED: %s', SQLERRM;
        ROLLBACK;

END $$;


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
LEFT JOIN employee AS manager ON employee.manager_id = manager.id;
WHERE employee.id = 1;
