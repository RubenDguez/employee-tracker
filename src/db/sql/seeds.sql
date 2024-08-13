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
            ('Cashier', 30000, 1),
            ('Luthier', 65000, 2);

        INSERT INTO employee (first_name, last_name, role_id, manager_id)
        VALUES
            ('Argenis', 'Dominguez', 2, 1);

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
