import Role from "../model/Role";
import Controller from "./Controller";

export default class RoleController extends Controller implements CRUD {
    private readonly role: Role | undefined;

    /**
     * Constructor
     * @param {Role} role
     */
    constructor(role?: Role) {
		super();
        this.role = role;
    }

    /**
     * Create
     * @return {Promise<Role>}
	 * @description Creates a role in the database
	 * @throws {Error} Role is not defined
     */
	async create(): Promise<Role> {
        if (!this.role) throw new Error('Role is not defined');
		try {
			const values = [this.role.title, this.role.salary, this.role.departmentId];
			const query = 'INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3) RETURNING *;';
			const results = await this.fetch(query, values);
			const row = results.rows[0];
			this.role.id = row.id;
			return new Role(row.title, parseFloat(row.salary), row.department_id, row.id, row.created_at, row.updated_at).toObject();
		} catch (error) {
			const ERROR = <Error>error;
			throw new Error(ERROR.message);
		}
	}

    /**
     * Get One
     * @return {Promise<Role>}
	 * @description Reads a role from the database
     */
	async readOne(id: number): Promise<Role> {
		try {
            const values = [id];
			const query = 'SELECT * FROM role WHERE id=$1;';
			const results = await this.fetch(query, values);
            const row = results.rows[0];
			return new Role(row.title, parseFloat(row.salary), row.department_id, row.id, new Date(row.created_at), new Date(row.updated_at)).toObject();
		} catch (error) {
			const ERROR = <Error>error;
			throw new Error(ERROR.message);
		}
	}

    /**
     * Get All
     * @return {Promise<Array<Role>>}
	 * @description Reads all roles from the database
     */
	async readAll(): Promise<Array<Role>> {
		try {
			const query = 'SELECT * FROM role;';
			const results = await this.fetch(query);
			return results.rows.map((row) => new Role(row.title, parseFloat(row.salary), row.department_id, row.id,  new Date(row.created_at), new Date(row.updated_at)).toObject());
		} catch (error) {
			const ERROR = <Error>error;
			throw new Error(ERROR.message);
		}
	}

	/**
	 * Update
	 * @param {Partial<RoleUpdatable>} fields
	 * @return {Promise<Role>}
	 * @description Updates a role in the database
	 * @throws {Error} Role is not defined
	 */
	async update(fields: Partial<RoleUpdatable>): Promise<Role> {
        if (!this.role) throw new Error('Role is not defined');
		try {
			const values = [fields.title ?? this.role.title, fields.salary ?? this.role.salary, fields.departmentId ?? this.role.departmentId, this.role.id];
			const query = 'UPDATE role SET title = COALESCE($1, title), salary = COALESCE($2, salary), department_id = COALESCE($3, department_id) WHERE id=$4 RETURNING *;';
			await this.fetch(query, values);
			return this.readOne(this.role.id!)
		} catch (error) {
			const ERROR = <Error>error;
			throw new Error(ERROR.message);
		}
	}

	/**
	 * Delete
	 * @return {Promise<boolean>}
	 * @description Deletes a role from the database
	 * @throws {Error} Role is not defined
	 */
	async delete(): Promise<boolean> {
		if (!this.role) throw new Error('Role is not defined');
		try {
			const values = [this.role.id];
			const query = 'DELETE FROM role WHERE id = $1;';
			await this.fetch(query, values);
			return true;
		} catch (error) {
			const ERROR = <Error>error;
			throw new Error(ERROR.message);
		}
	}

}
