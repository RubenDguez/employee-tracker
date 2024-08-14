import inquirer from 'inquirer';
import DB from './db';
import Actions from './prompts/Actions';
import Title from './prompts/Title';
import State, { EState } from './store/state';
import Login from './prompts/Login';
import { main } from './prompts/Main';
const cTable = require('console.table');

async function init() {
	let choice;
	try {
		Title('Login');
		await DB.getInstance().connection();

		// login process goes here...
		const response = await inquirer.prompt(<any>Login);
		if (response.username === 'argenisdominguez') State.getInstance().set(EState.ROLE, 'manager');

		const actions = Actions.getInstance();

		Title('Main Menu');
		do {
			choice = (await inquirer.prompt(<any>main())).mainOption;
			await actions.act(choice);
		} while (choice !== 'exit');
		Title('Thanks for using this app 🤗 ❤️ 🙏');
		process.exit(0);
	} catch (error) {
		const ERROR = <Error>error;
		throw new Error(ERROR.message);
	}
}

init();
