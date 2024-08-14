import inquirer from 'inquirer';
import DB from './db';
import Actions from './prompts/Actions';
import Main from './prompts/Main';
import Title from './prompts/Title';
const cTable = require('console.table');

async function init() {
	Title();

	await DB.getInstance().connection();
	const actions = Actions.getInstance();

	try {
		let choice;
		do {
			choice = (await inquirer.prompt(<any>Main)).mainOption;
			await actions.act(choice);
		} while (choice !== 'exit');
		process.exit(0);
	} catch (error) {
		const ERROR = <Error>error;
		throw new Error(ERROR.message);
	}
}

init();
