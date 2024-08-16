DO $$
    BEGIN

        INSERT INTO department (name) 
        VALUES ('Store');

        INSERT INTO role (title, salary, department_id)
        VALUES ('General Manager', 150000, 1);

        INSERT INTO employee (first_name, last_name, role_id, manager_id)
        VALUES ('Argenis', 'Dominguez', 1, null);

        INSERT INTO login (username, userpassword, employee_id)
        VALUES ('argenisdominguez', '69c3648f615b400e8b6cb04d7a20248d', 1);

        INSERT INTO department_transactions (department_id, created_by, updated_by)
        VALUES (1, 1, 1);

        INSERT INTO employee_transactions (employee_id, created_by, updated_by)
        VALUES (1, 1, 1);

    RAISE NOTICE 'TRANSACTION COMPLETED';

    EXCEPTION WHEN OTHERS THEN
        RAISE NOTICE 'AN ERROR HAS OCCURRED: %s', SQLERRM;
        ROLLBACK;

END $$;
