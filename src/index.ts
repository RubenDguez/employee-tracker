import inquirer from 'inquirer';
import DB from './db';
import Actions from './prompts/Actions';
import Title from './prompts/Title';
import { defPrompt } from './prompts/Login';
import { main } from './prompts/Main';
import LoginController from './controller/LoginController';
import State, { EState } from './store/state';

const cTable = require('console.table');

async function handleLogin(retries = 0): Promise<void> {
	const RETRIES = retries;

	if (retries >= 3) {
		Title('Not authorized to use this app');
		process.exit(0);
	}

	Title('Login');
	const loginController = new LoginController();

	let response = await inquirer.prompt(<any>defPrompt);
	const success = await loginController.login(response.username, response.password);

	if (!success) {
		await handleLogin(RETRIES + 1);
	}
}

async function init() {
	let choice;
	try {
		await DB.getInstance().connection();
		await handleLogin();

		Title('Main Menu');
		do {
			choice = (await inquirer.prompt(<any>main())).mainOption;
			await Actions.getInstance().act(choice);

			if (choice === 'log out') {
				State.getInstance().clear();
				await init();
			}
		} while (choice !== 'exit');
		Title('Thanks for using this app 🤗 ❤️ 🙏');
		process.exit(0);
	} catch (error) {
		const ERROR = <Error>error;
		throw new Error(ERROR.message);
	}
}

init();
