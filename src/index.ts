import inquirer from 'inquirer';
import DB from './db';
import Actions from './prompts/Actions';
import Title from './prompts/Title';
import Login from './prompts/Login';
import { main } from './prompts/Main';
import LoginController from './controller/LoginController';
const cTable = require('console.table');

async function handleLogin(retries = 0): Promise<boolean> {
	const RETRIES = retries;

	if (retries >= 3) {
		Title('Not authorized to use this app');
		process.exit(0);
	}

	Title('Login');
	const loginController = new LoginController();

	const response = await inquirer.prompt(<any>Login);
	const success = await loginController.login(response.username, response.password);

	if (!success) {
		await handleLogin(RETRIES + 1);
	}

	return false;
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
		} while (choice !== 'exit');
		Title('Thanks for using this app 🤗 ❤️ 🙏');
		process.exit(0);
	} catch (error) {
		const ERROR = <Error>error;
		throw new Error(ERROR.message);
	}
}

init();
