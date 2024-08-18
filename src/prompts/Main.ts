import inquirer from 'inquirer';
import State, { EState } from '../store/state';

const main = () => {
  const ROLE = State.getInstance().get(EState.ROLE);

  // Default options
  let choices = ['View all departments', 'View all roles', 'View all employees', new inquirer.Separator()];

  // Add manage's options
  if (ROLE?.includes('manager')) {
    const opts = ['Add a department', 'Add a role', 'Add an employee', new inquirer.Separator(), 'Update employee role', new inquirer.Separator()];
    choices = [...choices, ...opts];
  }

  // Add store manager and general manager options
  if (ROLE === 'store manager' || ROLE === 'general manager') {
    const opts = ['Delete department', 'Delete role', 'Delete employee', new inquirer.Separator()];
    choices = [...choices, ...opts];
  }

  // Exit option always at the end of the list
  choices = [...choices, 'log out', new inquirer.Separator(), 'exit', new inquirer.Separator()];

  return [
    {
      name: 'mainOption',
      message: 'What would you like to do',
      type: 'list',
      choices,
    },
  ];
};

export { main };
