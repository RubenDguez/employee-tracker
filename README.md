[![](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/en)
[![](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)


# Employee Tracker

## Description

Employee Tracker is a command-line application that allows business owners to efficiently manage their company's employee database. The application is built using Node.js, Inquirer, and PostgreSQL. It provides a user-friendly interface for viewing, adding, and updating information about departments, roles, and employees within a company. 

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Database Schema](#database-schema)
- [Features](#features)
- [Walkthrough Video](#walkthrough-video)
- [License](#license)

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/employee-tracker.git
    ```
2. Navigate to the project directory:
    ```sh
    cd employee-tracker
    ```
3. Install the dependencies:
    ```sh
    npm install
    ```
4. Set up the PostgreSQL database:
    - Ensure PostgreSQL is installed and running.
    - Create a database using the schema provided in the `schema.sql` file.
    - Seed the database with initial data using the `seeds.sql` file.
    - Update the database connection details in the `.env` file (not provided, create one if necessary):
      ```bash
      DB_USER=<your-database-username>
      DB_PASSWORD=<your-database-password>
      DB_HOST=<your-database-host>
      DB_PORT=<your-database-port>
      DB_NAME=<your-database-name>
      ```

5. Start the application:
    ```bash
    npm run start
    ```

## Usage

Upon running the application, you will be presented with a command-line interface with the following options:

- View all departments
- View all roles
- View all employees
- Add a department
- Add a role
- Add an employee
- Update an employee role

Simply select an option and follow the prompts to interact with the database.

## Database Schema

The database schema includes the following three tables:

- **department**: Contains the department id and department name.
- **role**: Contains the role id, title, salary, and department id.
- **employee**: Contains the employee id, first name, last name, role id, and manager id.


## Features

The application meets the following acceptance criteria:
- **Password Protected**: This application is password protected using MD5 hashing algorithm. Certain fields are not displayed or uses default information in order to mask sensitive information.
- **View Departments**: Displays a formatted table of department names and ids.
- **View Roles**: Displays a formatted table of job titles, role ids, associated departments, and salaries.
- **View Employees**: Displays a formatted table of employee ids, names, job titles, departments, salaries, and managers.
- **Add Department**: Prompts the user to add a new department to the database.
- **Add Role**: Prompts the user to add a new role, including its title, salary, and associated department.
- **Add Employee**: Prompts the user to add a new employee, including their name, role, and manager.
- **Update Employee Role**: Allows the user to update an employee's role.
- **(ROLE Based) View Employees by manager**: General Manager, Store Manager and Assistant Manager are able to view a formatted table of employee ids, names, job titles, departments, salaries, and managers by Manager.
- **(ROLE Based) View Employees by department**: General Manager, Store Manager and Assistant Manager are able to view a formatted table of employee ids, names, job titles, departments, salaries, and managers by Department.
- **(ROLE Based) Delete Department**: General Manager and Store Manager are allowed to delete Departments, all other do not have this option.
- **(ROLE Based) Delete Roles**: General Manager and Store Manager are allowed to delete Roles, all other do not have this option.
- **(ROLE Based) Delete Employee**: General Manager and Store Manager are allowed to delete Employees, all others do not have this option.

### Future Features
- Update employee managers.
- View the total utilized budget of a department.

## Walkthrough Video

A walkthrough video demonstrating the functionality of the application is available [here](link-to-video).

The video covers the following:

- How to invoke the application from the command line.
- Demonstration of the application's menu options and their functionality.
- Example interactions with the database.

## License

[![](https://img.shields.io/badge/License-MIT_License-blue)](https://opensource.org/license/mit)

## Questions

- If you have further questions, you can contact me at: argenis.dominguez@hotmail.com
- This is my GitHub profile: [RubenDguez](https://github.com/RubenDguez)
