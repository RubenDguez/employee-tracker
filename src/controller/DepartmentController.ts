import Department from '../model/Department';
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
		try {
			const values = [this.department.name];
			const query = 'INSERT INTO department (name) VALUES ($1) RETURNING *;';
			const results = await this.fetch(query, values);
			const row = results.rows[0];
			this.department.id = row.id;
			return new Department(row.name, row.id, row.created_at, row.updated_at).toObject();
		} catch (error) {
			const ERROR = <Error>error;
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
			const query = 'SELECT * FROM department WHERE id=$1;';
			const results = await this.fetch(query, values);
			const row = results.rows[0];
			return new Department(row.name, row.id, new Date(row.created_at), new Date(row.updated_at)).toObject();
		} catch (error) {
			const ERROR = <Error>error;
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
			const query = 'SELECT * FROM department;';
			const results = await this.fetch(query);
			return results.rows.map((row) => new Department(row.name, row.id, new Date(row.created_at), new Date(row.updated_at)).toObject());
		} catch (error) {
			const ERROR = <Error>error;
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
		if (!this.department) throw new Error('Department is not defined');
		try {
			const values = [fields.name ?? this.department.name, this.department.id];
			const query = 'UPDATE department SET name = COALESCE($1, name) WHERE id=$2 RETURNING *;';
			await this.fetch(query, values);
			return this.readOne(this.department.id!);
		} catch (error) {
			const ERROR = <Error>error;
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
			const ERROR = <Error>error;
			throw new Error(ERROR.message);
		}
	}
}
