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
            ('General Manager', 150000, 1),
            ('Store Manager', 100000, 1),
            ('Assistant Manager', 90000, 1),
            ('Cashier', 30000, 1),
            ('Electric Guitar Luthier', 65000, 2),
            ('Acoustic Guitar Luthier', 65000, 4);

        INSERT INTO employee (first_name, last_name, role_id, manager_id)
        VALUES
            ('Argenis', 'Dominguez', 1, null),
            ('Ruben', 'Dominguez', 2, 1),
            ('Lisa', 'Freiwald', 3, 2),
            ('Alexander', 'Ramhit', 4, 3);

        INSERT INTO login (username, userpassword, employee_id)
        VALUES
            ('argenisdominguez', 'pass', 1),
            ('rubendominguez', 'pass', 2),
            ('lisafreiwald', 'pass', 3),
            ('alexander', 'pass', 4);

        INSERT INTO department_transactions (department_id, created_by, updated_by)
        VALUES
            (1, 1, 1),
            (2, 1, 1),
            (3, 1, 1),
            (4, 1, 1),
            (5, 1, 1),
            (6, 1, 1),
            (7, 1, 1),
            (8, 1, 1),
            (9, 1, 1),
            (10, 1, 1),
            (11, 1, 1),
            (12, 1, 1),
            (13, 1, 1);

    UPDATE department_transactions
    SET updated_by = 2, updated_at TIMESTAMP
    WHERE department_id = 1;

    RAISE NOTICE 'TRANSACTION COMPLETED';

    EXCEPTION WHEN OTHERS THEN
        RAISE NOTICE 'AN ERROR HAS OCCURRED: %s', SQLERRM;
        ROLLBACK;

END $$;
