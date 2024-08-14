import inquirer from 'inquirer';
import State, { EState } from '../store/state';

const main = () => {
	let choices = [
		'View all departments',
		'View all roles',
		'View all employees',
		new inquirer.Separator(),
		'Add a department',
		'Add a role',
		'Add an employee',
		new inquirer.Separator(),
		'Update employee role',
		new inquirer.Separator(),
		'exit',
		new inquirer.Separator(),
	];


	if (State.getInstance().get(EState.ROLE)?.includes('manager')) {
		const managerOpts = [
			'Delete department',
			'Delete role',
			'Delete employee',
			new inquirer.Separator(),
		]
		choices = [...choices, ...managerOpts];
	}

	return [
		{
			name: 'mainOption',
			message: 'What would you like to do',
			type: 'list',
			choices
		},
	]
}

export { main }
