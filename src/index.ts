/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-unused-vars */
import inquirer from 'inquirer';
import DB from './db';
import Actions from './prompts/Actions';
import Title from './prompts/Title';
import { defPrompt } from './prompts/Login';
import { main } from './prompts/Main';
import LoginController from './controller/LoginController';
import State from './store/state';
import EmployeeTrackerError from './utils/Error';

const cTable = require('console.table');

async function handleLogin(retries = 0): Promise<void> {
  const RETRIES = retries;

  if (retries >= 3) {
    Title('Not authorized to use this app');
    process.exit(0);
  }

  Title('Login');
  const loginController = new LoginController();

  const response = await inquirer.prompt(<any>defPrompt);
  const success = await loginController.login(response.username, response.password);

  if (!success) {
    await handleLogin(RETRIES + 1);
  }
}

async function app() {
  let choice;
  Title('Main Menu');
  do {
    try {
      choice = (await inquirer.prompt(<any>main())).mainOption;
      await Actions.getInstance().act(choice);

      if (choice === 'log out') {
        State.getInstance().clear();
        await init();
      }
    } catch (error) {
      const err = <Error>error;

      // Handling all errors in the app life cycle as EmployeeTracker type Error.
      const ERROR: EmployeeTrackerError = new EmployeeTrackerError(err.message);

      console.error(`${ERROR.name}\n${ERROR.message}`);
    }
  } while (choice !== 'exit');
}

async function init() {
  try {
    await DB.getInstance().connection();
    await handleLogin();
    await app();

    Title('Thanks for using this app 🤗 ❤️ 🙏');
    process.exit(0);
  } catch (error) {
    const ERROR = <EmployeeTrackerError>error;
    console.error(ERROR.message);
  }
}

init();
