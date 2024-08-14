import inquirer from 'inquirer';

export default [
	{
		name: 'mainOption',
		message: 'What would you like to do',
		type: 'list',
		choices: [
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
		],
	},
];
