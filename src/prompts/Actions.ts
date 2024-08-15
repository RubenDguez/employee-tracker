import inquirer from 'inquirer';
import DepartmentController from '../controller/DepartmentController';
import EmployeeController from '../controller/EmployeeController';
import RoleController from '../controller/RoleController';
import { newDepartment } from './Department';
import Title from './Title';
import Department from '../model/Department';
import { newRole } from './Role';
import Role from '../model/Role';
import { newEmployee, updateEmployee } from './Employee';
import Employee from '../model/Employee';

export default class Actions {
	#response: any;
	static #actionsInstance: Actions | null = null;

	#departmentController: DepartmentController;
	#roleController: RoleController;
	#employeeController: EmployeeController;

	#department: Department | null = null;
	#role: Role | null = null;
	#employee: Employee | null = null;

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

	private async getManagerList(): Promise<Array<{ name: string; value: number; }>> {
		const managerList = (await this.#employeeController.readAll())
			.filter((employee) => {
				if (employee.role === 'Store Manager' || employee.role === 'Assistant Manager') return employee;
			})
			.map((emp) => ({ name: `${emp.firstName} ${emp.lastName}`, value: emp.id ?? 0 }));

		return managerList;
	}

	private async getRoleList() {
		const roleList = (await this.#roleController.readAll()).map((role) => ({ name: role.title, value: role.id ?? 0 }));
		return roleList;
	}

	private async viewAllDepartments() {
		Title('All Departments');
		console.table(await this.#departmentController.readAll());
	}

	private async viewAllRoles() {
		Title('All Roles');
		console.table(await this.#roleController.readAll());
	}

	private async viewAllEmployees() {
		Title('All Employees');
		console.table(await this.#employeeController.readAll());
	}

	private async addDepartment() {
		Title('Add Department');
		console.table(await this.#departmentController.readAll());

		this.#response = await inquirer.prompt(<any>newDepartment());
		this.#department = new Department(this.#response.name);
		this.#departmentController = new DepartmentController(this.#department);
		await this.#departmentController.create();

		Title('Add Department');
		console.table(await this.#departmentController.readAll());
	}

	private async addRole() {
		const departmentList = (await this.#departmentController.readAll()).map((department) => ({ name: department.name, value: department.id ?? 0 }));

		Title('Add Role');
		console.table(await this.#roleController.readAll());

		this.#response = await inquirer.prompt(<any>newRole(departmentList));
		this.#role = new Role(this.#response.name, parseFloat(this.#response.salary), this.#response.department);
		this.#roleController = new RoleController(this.#role);
		await this.#roleController.create();

		Title('Add Role');
		console.table(await this.#roleController.readAll());
	}

	private async addEmployee() {
		Title('Add Employee');
		console.table(await this.#employeeController.readAll());

		const roleList = await this.getRoleList();
		const managerList = await this.getManagerList();
		this.#response = await inquirer.prompt(<any>newEmployee(roleList, managerList));

		if (this.#response.role !== 1 && this.#response.manager === null) {
			console.error('\nThis type of employee must have a manager.\n');
			return;
		}

		this.#employee = new Employee(this.#response.firstName, this.#response.lastName, this.#response.role, this.#response.manager);
		this.#employeeController = new EmployeeController(this.#employee);
		this.#employeeController.create();

		Title('Add Employee');
		console.table(await this.#employeeController.readAll());
	}

	private async updateEmployeeRole() {
		Title('Update Employee Role');
		console.table(await this.#employeeController.readAll());

		const roleList = await this.getRoleList();
		const managerList = await this.getManagerList();
		this.#response = await inquirer.prompt(<any>updateEmployee(roleList, managerList));

		if (this.#response.role !== 1 && this.#response.manager === null) {
			console.error('\nThis type of employee must have a manager.\n');
			return;
		}

		const employee = await this.#employeeController.readOne(this.#response.id);

		this.#employee = new Employee(employee.firstName, employee.lastName, employee.role, employee.manager, employee.id!);
		this.#employeeController = new EmployeeController(this.#employee);
		this.#employeeController.update({ roleId: this.#response.role, managerId: this.#response.manager });

		Title('Update Employee Role');
		console.table(await this.#employeeController.readAll());
	}

	async act(action: string) {
		switch (action) {
			case 'View all departments':
				await this.viewAllDepartments();
				break;
			case 'View all roles':
				await this.viewAllRoles();
				break;
			case 'View all employees':
				await this.viewAllEmployees();
				break;
			case 'Add a department':
				await this.addDepartment();
				break;
			case 'Add a role':
				await this.addRole();
				break;
			case 'Add an employee':
				await this.addEmployee();
				break;
			case 'Update employee role':
				await this.updateEmployeeRole();
				break;
			default:
				return;
		}
	}
}
