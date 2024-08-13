import inquirer from 'inquirer';
import DepartmentController from '../controller/DepartmentController';
import EmployeeController from '../controller/EmployeeController';
import RoleController from '../controller/RoleController';
import { newDepartment } from './Department';
import Title from './Title';
import Department from '../model/Department';
import { newRole } from './Role';
import Role from '../model/Role';

export default class Actions {
	static #actionsInstance: Actions | null = null;

	#departmentController: DepartmentController;
	#roleController: RoleController;
	#employeeController: EmployeeController;

	#department: Department | null = null;
	#role: Role | null = null;

	private constructor() {
		this.#departmentController = new DepartmentController();
		this.#roleController = new RoleController();
		this.#employeeController = new EmployeeController();
	}

	public static getInstance() {
		if (!this.#actionsInstance) {
			this.#actionsInstance = new Actions();
		}

		return this.#actionsInstance;
	}

	async act(action: string) {
		let response: any;

		const departmentList = (await this.#departmentController.readAll()).map((department, index) => ({name: department.name, value: index + 1}));

		Title();
		switch (action) {
			case 'View all departments':
				console.table(await this.#departmentController.readAll());
				break;
			case 'View all roles':
				console.table(await this.#roleController.readAll());
				break;
			case 'View all employees':
				console.table(await this.#employeeController.readAll());
				break;
			case 'Add a department':
				response = await inquirer.prompt(<any>newDepartment());
				this.#department = new Department(response.name);
				this.#departmentController = new DepartmentController(this.#department);
				await this.#departmentController.create();
				console.table(await this.#departmentController.readAll());
				break;
			case 'Add a role':
				response = await inquirer.prompt(<any> newRole(departmentList));
				this.#role = new Role(response.name, parseFloat(response.salary), response.department);
				this.#roleController = new RoleController(this.#role);
				await this.#roleController.create();
				console.table(await this.#roleController.readAll());
				break;
			case 'Add an employee':
				break;
			default:
				return;
		}
	}
}
