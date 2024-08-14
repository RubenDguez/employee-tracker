import Employee from '../model/Employee';
import Controller from './Controller';

export default class EmployeeController extends Controller implements CRUD {
	private readonly employee: Employee | undefined;

	/**
	 * Constructor
	 * @param {Employee} employee
	 */
	constructor(employee?: Employee) {
		super();
		this.employee = employee;
	}

	/**
	 * Create
	 * @return {Promise<Employee>}
	 * @description Creates an employee in the database
	 * @throws {Error} Employee is not defined
	 */
	async create(): Promise<Employee> {
		if (!this.employee) throw new Error('Employee is not defined');
		try {
			const values = [this.employee.firstName, this.employee.lastName, this.employee.role, this.employee.manager];
			const query = 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4) RETURNING *;';
			const results = await this.fetch(query, values);
			const row = results.rows[0];
			this.employee.id = row.id;
			return new Employee(row.first_name, row.last_name, row.role_id, row.manager_id, row.id, row.created_at, row.updated_at).toObject();
		} catch (error) {
			const ERROR = <Error>error;
			throw new Error(ERROR.message);
		}
	}

	/**
	 * Read One
	 * @param {number} id
	 * @return {Promise<Employee>}
	 * @description Reads an employee from the database
	 */
	async readOne(id: number): Promise<Employee> {
		try {
			const values = [id];
			const query = `
			SELECT employee.id, employee.first_name, employee.last_name, role.title AS role_name, 
				CASE WHEN manager.id IS NULL THEN 'NONE' ELSE CONCAT(manager.first_name, ' ', manager.last_name) END AS manager_full_name, 
				employee.created_at, employee.updated_at
			FROM employee
			JOIN role ON employee.role_id = role.id
			LEFT JOIN employee AS manager ON employee.manager_id = manager.id
			WHERE employee.id = $1;
			`;
			const results = await this.fetch(query, values);
			const row = results.rows[0];
			return new Employee(row.first_name, row.last_name, row.role_id, row.manager_id, row.id, row.created_at, row.updated_at).toObject();
		} catch (error) {
			const ERROR = <Error>error;
			throw new Error(ERROR.message);
		}
	}

	/**
	 * Read All
	 * @return {Promise<Array<Employee>>}
	 * @description Reads all employees from the database
	 */
	async readAll(): Promise<Array<Employee>> {
		try {
			const query = `
			SELECT employee.id, employee.first_name, employee.last_name, role.title AS role_name, role.salary,
				CASE WHEN manager.id IS NULL THEN 'NONE' ELSE CONCAT(manager.first_name, ' ', manager.last_name) END AS manager_full_name, 
				employee.created_at, employee.updated_at
			FROM employee
			JOIN role ON employee.role_id = role.id
			LEFT JOIN employee AS manager ON employee.manager_id = manager.id;
			`;
			const results = await this.fetch(query);
			return results.rows.map((row) =>
				new Employee(row.first_name, row.last_name, row.role_name, row.manager_full_name, row.id, row.created_at, row.updated_at, row.salary).toObject(),
			);
		} catch (error) {
			const ERROR = <Error>error;
			throw new Error(ERROR.message);
		}
	}

	/**
	 * Update
	 * @param {Partial<EmployeeUpdatable>} fields
	 * @return {Promise<Employee>}
	 * @description Updates an employee in the database
	 * @throws {Error} Employee is not defined
	 */
	async update(fields: Partial<EmployeeUpdatable>): Promise<Employee> {
		if (!this.employee) throw new Error('Employee is not defined');
		try {
			const values = [
				fields.firstName ?? this.employee.firstName,
				fields.lastName ?? this.employee.lastName,
				fields.roleId ?? this.employee.role,
				fields.managerId ?? this.employee.manager,
				this.employee.id,
			];
			const query =
				'UPDATE employee SET first_name = COALESCE($1, first_name), last_name = COALESCE($2, last_name), role_id = COALESCE($3, role_id), manager_id = COALESCE($4, manager_id), updated_at = CURRENT_TIMESTAMP WHERE id=$5 RETURNING *;';
			console.log(query);
			await this.fetch(query, values);
			return this.readOne(this.employee.id!);
		} catch (error) {
			const ERROR = <Error>error;
			throw new Error(ERROR.message);
		}
	}

	/**
	 * Delete
	 * @return {Promise<boolean>}
	 * @description Deletes an employee from the database
	 * @throws {Error} Employee is not defined
	 */
	async delete(): Promise<boolean> {
		if (!this.employee) throw new Error('Employee is not defined');
		try {
			const values = [this.employee.id];
			const query = 'DELETE FROM employee WHERE id = $1;';
			await this.fetch(query, values);
			return true;
		} catch (error) {
			const ERROR = <Error>error;
			throw new Error(ERROR.message);
		}
	}
}
