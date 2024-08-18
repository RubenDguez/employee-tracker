import Department from '../model/Department';
import State, { EState } from '../store/state';
import EmployeeTrackerError from '../utils/Error';
import Controller from './Controller';

export default class DepartmentController extends Controller implements CRUD {
	private readonly department: Department | undefined;

	/**
	 * Constructor
	 * @param {Department} department
	 */
	constructor(department?: Department) {
		super();
		this.department = department;
	}

	/**
	 * Create
	 * @return {Promise<Department>}
	 * @description Creates a department in the database
	 * @throws {Error} Department is not defined
	 */
	async create(): Promise<Department> {
		if (!this.department) throw new Error('Department is not defined');

		const STORE = State.getInstance();
		try {
			const values = [this.department.name];
			const createQuery = 'INSERT INTO department (name) VALUES ($1) RETURNING *;';
			const transactionQuery = `
			INSERT INTO department_transactions (department_id, created_by, updated_by)
			VALUES ($1, $2, $3);
			`;
			const results = await this.fetch(createQuery, values);
			const row = results.rows[0];
			this.department.id = row.id;

			await this.fetch(transactionQuery, [row.id, parseInt(STORE.get(EState.USER_ID)!), parseInt(STORE.get(EState.USER_ID)!)]);
			return new Department(row.name, row.id, row.created_at, row.updated_at).toObject();
		} catch (error) {
			const ERROR = <EmployeeTrackerError>error;
			throw new Error(ERROR.message);
		}
	}

	/**
	 * Read One
	 * @param {number} id
	 * @return {Promise<Department>}
	 */
	async readOne(id: number): Promise<Department> {
		try {
			const values = [id];
			const query = `
			SELECT department_transactions.id, department_transactions.created_at, department_transactions.updated_at,
				CONCAT(created_by.first_name, ' ', created_by.last_name) AS created_by_full_name,
				CONCAT(updated_by.first_name, ' ', updated_by.last_name) AS updated_by_full_name,
				department.name AS department_name
			FROM department_transactions
			JOIN employee AS created_by ON department_transactions.created_by = created_by.id
			JOIN employee AS updated_by ON department_transactions.updated_by = updated_by.id
			JOIN department ON department_transactions.department_id = department.id
			WHERE department.id = $1;
			`;
			const results = await this.fetch(query, values);
			const row = results.rows[0];
			return new Department(row.department_name, row.id, new Date(row.created_at), new Date(row.updated_at), row.created_by_full_name, row.updated_by_full_name).toObject();
		} catch (error) {
			const ERROR = <EmployeeTrackerError>error;
			throw new Error(ERROR.message);
		}
	}

	/**
	 * Read All
	 * @return {Promise<Array<Department>>}
	 * @description Reads all departments
	 */
	async readAll(): Promise<Array<Department>> {
		try {
			const query = `
			SELECT department_transactions.id, department_transactions.created_at, department_transactions.updated_at,
				CONCAT(created_by.first_name, ' ', created_by.last_name) AS created_by_full_name,
				CONCAT(updated_by.first_name, ' ', updated_by.last_name) AS updated_by_full_name,
				department.name AS department_name
			FROM department_transactions
			JOIN employee AS created_by ON department_transactions.created_by = created_by.id
			JOIN employee AS updated_by ON department_transactions.updated_by = updated_by.id
			JOIN department ON department_transactions.department_id = department.id;
			`;
			const results = await this.fetch(query);
			return results.rows.map((row) => new Department(row.department_name, row.id, new Date(row.created_at), new Date(row.updated_at), row.created_by_full_name, row.updated_by_full_name).toObject());
		} catch (error) {
			const ERROR = <EmployeeTrackerError>error;
			throw new Error(ERROR.message);
		}
	}

	/**
	 * Update
	 * @param {Partial<DepartmentUpdatable>} fields
	 * @return {Promise<Department>}
	 * @description Updates a department in the database
	 * @throws {Error} Department is not defined
	 */
	async update(fields: Partial<DepartmentUpdatable>): Promise<Department> {
		const STATE = State.getInstance();
		if (!this.department) throw new Error('Department is not defined');
		try {
			const values = [fields.name ?? this.department.name, this.department.id];
			const updateQuery = 'UPDATE department SET name = COALESCE($1, name) WHERE id=$2 RETURNING *;';
			const updateTransactions = `
			UPDATE department_transactions
			SET updated_by = $1, updated_at TIMESTAMP
			WHERE department_id = $2;
			`
			await this.fetch(updateQuery, values);
			await this.fetch(updateTransactions, [parseInt(STATE.get(EState.USER_ID)!), this.department.id])
			return this.readOne(this.department.id!);
		} catch (error) {
			const ERROR = <EmployeeTrackerError>error;
			throw new Error(ERROR.message);
		}
	}

	/**
	 * Delete
	 * @return {Promise<boolean>}
	 * @description Deletes a department from the database
	 * @throws {Error} Department is not defined
	 */
	async delete(): Promise<boolean> {
		if (!this.department) throw new Error('Department is not defined');
		try {
			const values = [this.department.id];
			const query = 'DELETE FROM department WHERE id = $1;';
			await this.fetch(query, values);
			return true;
		} catch (error) {
			const ERROR = <EmployeeTrackerError>error;
			throw new Error(ERROR.message);
		}
	}
}
