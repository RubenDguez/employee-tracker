/* eslint-disable @typescript-eslint/no-explicit-any */
import inquirer from 'inquirer';
import DepartmentController from '../controller/DepartmentController';
import EmployeeController from '../controller/EmployeeController';
import RoleController from '../controller/RoleController';
import { deleteDepartment, newDepartment } from './Department';
import Title from './Title';
import Department from '../model/Department';
import { deleteRole, newRole } from './Role';
import Role from '../model/Role';
import { deleteEmployee, newEmployee, readEmployeesByDepartment, readEmployeesByManager, updateEmployee } from './Employee';
import Employee from '../model/Employee';
import { newEmployeeForm, userIntent } from './Login';
import CryptoJS from 'crypto-js';
import LoginController from '../controller/LoginController';

// Actions Class
export default class Actions {
  #response: any;
  static #actionsInstance: Actions | null = null;

  #departmentController: DepartmentController;
  #roleController: RoleController;
  #employeeController: EmployeeController;
  #loginController: LoginController;

  #department: Department | null = null;
  #role: Role | null = null;
  #employee: Employee | null = null;

  /** Constructor */
  private constructor() {
    this.#departmentController = new DepartmentController();
    this.#roleController = new RoleController();
    this.#employeeController = new EmployeeController();
    this.#loginController = new LoginController();
  }

  /**
   * Get Instance
   * @returns {Actions}
   * @description Get an instance of Actions
   */
  public static getInstance(): Actions {
    if (!this.#actionsInstance) {
      this.#actionsInstance = new Actions();
    }

    return this.#actionsInstance;
  }

  /**
   * Get Manager List
   * @return {Promise<Array<{ name: string; value: number }>>}
   * @description Get a list of managers
   */
  private async getManagerList(): Promise<Array<{ name: string; value: number }>> {
    const managerList = (await this.#employeeController.readAll())
      .filter((employee) => {
        if (employee.role === 'General Manager' || employee.role === 'Store Manager' || employee.role === 'Assistant Manager') return employee;
      })
      .map((emp) => ({ name: `${emp.firstName} ${emp.lastName}`, value: emp.id ?? 0 }));

    return managerList;
  }

  /**
   * Get Role List
   * @return {Promise<Array<{name: string; value: number;}>>}
   * @description Get a list of roles
   */
  private async getRoleList(): Promise<Array<{ name: string; value: number }>> {
    const roleList = (await this.#roleController.readAll()).map((role) => ({ name: role.title, value: role.id ?? 0 }));
    return roleList;
  }

  /**
   * Get Department List
   * @return {Promise<Array<{name: string; value: number}>>}
   * @description Get a list of departments
   */
  private async getDepartmentList(): Promise<Array<{ name: string; value: number }>> {
    const departmentList = (await this.#departmentController.readAll()).map((department) => ({ name: department.name, value: department.id ?? 0 }));
    return departmentList;
  }

  /**
   * View All Departments
   * @return {Promise<void>}
   * @description View all departments
   */
  private async viewAllDepartments(): Promise<void> {
    Title('All Departments');
    console.table(await this.#departmentController.readAll());
  }

  /**
   * View All Roles
   * @returns {Promise<void>}
   * @description View all roles
   */
  private async viewAllRoles(): Promise<void> {
    Title('All Roles');
    console.table(await this.#roleController.readAll());
  }

  /**
   * View All Employees
   * @return {Promise<void>}
   * @description View all employees
   */
  private async viewAllEmployees(): Promise<void> {
    Title('All Employees');
    console.table(await this.#employeeController.readAll());
  }

  /**
   * View All Employees By Manager
   * @return {Promise<void>}
   * @description View all employees by manager
   */
  private async viewAllEmployeesByManager(): Promise<void> {
    Title(`Employees by Manager`);

    const managerList = await this.getManagerList();
    this.#response = await inquirer.prompt(<any>readEmployeesByManager(managerList));

    console.table(await this.#employeeController.readAllBy('manager', parseInt(this.#response.id)));
  }

  /**
   * View All Employees By Manager
   * @return {Promise<void>}
   * @description View all employees by manager
   */
  private async viewAllEmployeesByDepartment(): Promise<void> {
    Title(`Employees by Department`);

    const departmentList = await this.getDepartmentList();
    this.#response = await inquirer.prompt(<any>readEmployeesByDepartment(departmentList));

    console.table(await this.#employeeController.readAllBy('department', parseInt(this.#response.id)));
  }

  /**
   * Add Department
   * @return {Promise<void>}
   * @description Add a department
   */
  private async addDepartment(): Promise<void> {
    await this.viewAllDepartments();

    this.#response = await inquirer.prompt(<any>newDepartment());
    this.#department = new Department(this.#response.name);
    this.#departmentController = new DepartmentController(this.#department);
    await this.#departmentController.create();

    await this.viewAllDepartments();
  }

  private async deleteDepartment(): Promise<void> {
    await this.viewAllDepartments();

    this.#response = await inquirer.prompt(<any>deleteDepartment());

    this.#department = new Department('', parseInt(this.#response.id));
    this.#departmentController = new DepartmentController(this.#department);
    await this.#departmentController.delete();

    await this.viewAllDepartments();
  }

  /**
   * Add Role
   * @return {Promise<void>}
   * @description Add a role
   */
  private async addRole(): Promise<void> {
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

  /**
   * Delete Role
   * @return {Promise<void>}
   * @description Delete a role
   */
  private async deleteRole(): Promise<void> {
    await this.viewAllRoles();

    this.#response = await inquirer.prompt(<any>deleteRole());
    this.#role = new Role('', 0, 0, parseInt(this.#response.id));
    this.#roleController = new RoleController(this.#role);
    await this.#roleController.delete();

    await this.viewAllRoles();
  }

  /**
   * Create Login
   * @return {Promise<void>}
   * @description Create a login
   */
  private async createLogin(): Promise<void> {
    this.#response = await inquirer.prompt(<any>newEmployeeForm);

    const username = this.#response.username;
    const password = CryptoJS.MD5(this.#response.username + this.#response.password).toString();

    await this.#loginController.create(username, password, <number>this.#employee?.id);
  }

  /**
   * Add Employee
   * @return {Promise<void>}
   * @description Add an employee
   */
  private async addEmployee(): Promise<void> {
    await this.viewAllEmployees();

    const roleList = await this.getRoleList();
    const managerList = await this.getManagerList();
    this.#response = await inquirer.prompt(<any>newEmployee(roleList, managerList));

    if (this.#response.role !== 1 && this.#response.manager === null) {
      console.error('\nThis type of employee must have a manager.\n');
      return;
    }

    this.#employee = new Employee(this.#response.firstName, this.#response.lastName, this.#response.role, this.#response.manager);
    this.#employeeController = new EmployeeController(this.#employee);
    this.#employee = await this.#employeeController.create();

    this.#response = await inquirer.prompt(<any>userIntent);

    if (this.#response.usingApp) {
      await this.createLogin();
    }

    await this.viewAllEmployees();
  }

  /**
   * Delete Employee
   * @return {Promise<void>}
   * @description Delete an employee
   */
  private async deleteEmployee(): Promise<void> {
    await this.viewAllEmployees();

    this.#response = await inquirer.prompt(<any>deleteEmployee());

    this.#employee = new Employee('', '', 0, 0, parseInt(this.#response.id));
    this.#employeeController = new EmployeeController(this.#employee);
    await this.#employeeController.delete();

    await this.viewAllEmployees();
  }

  /**
   * Update Employee Role
   * @return {Promise<void>}
   * @description Update an employee's role
   */
  private async updateEmployeeRole(): Promise<void> {
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
    await this.#employeeController.update({ roleId: this.#response.role, managerId: this.#response.manager });
    await this.viewAllEmployees();
  }

  /**
   * Act
   * @param {string} action
   * @return {Promise<void>}
   * @description Perform an action
   */
  async act(action: string): Promise<void> {
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
      case 'View employees by Manager':
        await this.viewAllEmployeesByManager();
        break;
      case 'View employees by Department':
        await this.viewAllEmployeesByDepartment();
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
      case 'Delete department':
        await this.deleteDepartment();
        break;
      case 'Delete role':
        await this.deleteRole();
        break;
      case 'Delete employee':
        await this.deleteEmployee();
        break;
      default:
        return;
    }
  }
}
