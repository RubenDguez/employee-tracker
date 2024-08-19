/**
 * New Role Prompt
 * @param {Array<{ name: string; value: number }>} departments
 * @description Create a new role prompt
 */
const newRole = (departments: Array<{ name: string; value: number }>) => {
  return [
    {
      name: 'name',
      message: 'What is the name of the role?',
      validate: (name: string) => {
        if (!name.length) {
          return 'Please provide a role name.';
        }
        if (name.length <= 3 || name.length > 30) {
          return 'Please provide a name with 3 to 30 chars';
        }
        return true;
      },
    },
    {
      name: 'salary',
      message: 'What is the salary of the role?',
      validate: (salary: string) => {
        if (!salary.length) {
          return 'Please provide a salary.';
        }
        if (isNaN(parseFloat(salary))) {
          return 'Please provide a valid salary.';
        }
        if (parseFloat(salary) <= 0) {
          return 'Please provide a salary greater than 0.';
        }
        return true;
      },
    },
    {
      name: 'department',
      message: 'What department does the role belong to?',
      type: 'list',
      choices: departments,
    },
  ];
};

/**
 * Delete Role Prompt
 * @description Delete a role prompt
 */
const deleteRole = () => {
  return [
    {
      name: 'id',
      message: 'What is the id of the role you want to delete?',
      validate: (id: string) => {
        if (!id.length) {
          return 'Please provide a role ID.';
        }
        if (isNaN(parseInt(id))) {
          return 'Please provide a valid role ID.';
        }
  
        return true;
      }
    }
  ];
};

export { newRole, deleteRole };
