/**
 * New Employee Prompt
 * @param {Array<{ name: string; value: number }>} roles 
 * @param {Array<{ name: string; value: number | null }>} managers 
 * @description Create a new employee prompt
 */
const newEmployee = (roles: Array<{ name: string; value: number }>, managers: Array<{ name: string; value: number | null }>) => {
  managers.unshift({ name: 'NONE', value: null });

  return [
    {
      name: 'firstName',
      message: 'What is the first name of the employee?',
      validate: (name: string) => {
        if (!name.length) {
          return 'Please provide a first name.';
        }
        if (name.length <= 1 || name.length > 30) {
          return 'First name must be between 2 and 30 characters.';
        }
        return true;
      },
    },
    {
      name: 'lastName',
      message: 'What is the last name of the employee?',
      validate: (name: string) => {
        if (!name.length) {
          return 'Please provide a last name.';
        }
        if (name.length <= 1 || name.length > 30) {
          return 'Last name must be between 2 and 30 characters.';
        }
        return true;
      },
    },
    {
      name: 'role',
      message: 'What is the role of the employee?',
      type: 'list',
      choices: roles,
    },
    {
      name: 'manager',
      message: 'Who is the manager of the employee?',
      type: 'list',
      choices: managers,
    },
  ];
};

/**
 * Read Employee by Manager Prompt
 * @description Read employee by manager prompt
 */
const readEmployeesByManager = (managers: Array<{ name: string; value: number }>) => {
  return [
    {
      name: 'id',
      message: 'What is the manager\'s name you want to search employees by?',
      type: 'list',
      choices: managers,
    }
  ];
}

/**
 * Update Employee Prompt
 * @param {Array<{ name: string; value: number }>} roles
 * @param {Array<{ name: string; value: number | null }>} managers 
 * @description Update an employee prompt
 */
const updateEmployee = (roles: Array<{ name: string; value: number }>, managers: Array<{ name: string; value: number | null }>) => {
  return [
    {
      name: 'id',
      message: 'What is the id of the employee you want to update?',
    },
    {
      name: 'role',
      message: 'What is the NEW role of the employee?',
      type: 'list',
      choices: roles,
    },
    {
      name: 'manager',
      message: 'Who is the manager of the employee?',
      type: 'list',
      choices: managers,
    },
  ];
};

/**
 * Delete Employee Prompt
 * @description Delete an employee prompt
 */
const deleteEmployee = () => {
  return [
    {
      name: 'id', 
      message: 'What is the id of the employee you want to delete?',
      validate: (id: string) => {
        if (!id.length) {
          return 'Please select a department to delete.';
        }
        if (isNaN(parseInt(id))) {
          return 'Please provide a valid department ID.';
        }
  
        return true;
      }
    }
  ]
}

export { newEmployee, updateEmployee, deleteEmployee, readEmployeesByManager };
