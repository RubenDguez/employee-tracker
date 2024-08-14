
SELECT pg_terminate_backend(pg_stat_activity.pid)
FROM pg_stat_activity
WHERE pg_stat_activity.datname = 'employee_tracker_db'
AND pid <> pg_backend_pid();

DROP DATABASE IF EXISTS employee_tracker_db;

CREATE DATABASE employee_tracker_db;

\c employee_tracker_db;

DO $$
    BEGIN
        CREATE TABLE department (
            id SERIAL PRIMARY KEY,
            name VARCHAR(30) UNIQUE NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE role (
            id SERIAL PRIMARY KEY,
            title VARCHAR(30) UNIQUE NOT NULL,
            salary NUMERIC(10, 2) NOT NULL CHECK (salary >= 0) DEFAULT 0.00,
            department_id INTEGER NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (department_id) REFERENCES department(id)
        );

        CREATE TABLE employee (
            id SERIAL PRIMARY KEY,
            first_name VARCHAR(30) NOT NULL,
            last_name VARCHAR(30) NOT NULL,
            role_id INTEGER NOT NULL,
            manager_id INTEGER,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (role_id) REFERENCES role(id),
            FOREIGN KEY (manager_id) REFERENCES employee (id)
        );

        CREATE TABLE login (
            id SERIAL PRIMARY KEY,
            username VARCHAR(30) NOT NULL,
            userpassword VARCHAR(30) NOT NULL,
            employee_id INTEGER NOT NULL,
            FOREIGN KEY (employee_id) REFERENCES employee(id)
        );

    RAISE NOTICE 'TRANSACTION COMPLETED';

    EXCEPTION WHEN OTHERS THEN
        RAISE NOTICE 'AN ERROR HAS OCCURRED: %s', SQLERRM;
        ROLLBACK;

END $$;
