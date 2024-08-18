import Role from '../model/Role';
import State, { EState } from '../store/state';
import EmployeeTrackerError from '../utils/Error';
import Controller from './Controller';

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
      const STATE = State.getInstance();
      const values = [this.role.title, this.role.salary, this.role.department];
      const createQuery = 'INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3) RETURNING *;';
      const transactionQuery = 'INSERT INTO role_transactions (role_id, created_by, updated_by) VALUES ($1, $2, $3);';
      const results = await this.fetch(createQuery, values);
      const row = results.rows[0];
      this.role.id = row.id;

      await this.fetch(transactionQuery, [row.id, parseInt(STATE.get(EState.USER_ID)!), parseInt(STATE.get(EState.USER_ID)!)]);
      return new Role(row.title, parseFloat(row.salary), row.department_id, row.id).toObject();
    } catch (error) {
      const ERROR = <EmployeeTrackerError>error;
      throw new Error(ERROR.message);
    }
  }

  /**
   * Read One
   * @return {Promise<Role>}
   * @description Reads a role from the database
   */
  async readOne(id: number): Promise<Role> {
    try {
      const values = [id];
      const query = `
			SELECT role.id, role.title, role.salary, department.name AS department_name,
				CONCAT(created_by_employee.first_name, ' ', created_by_employee.last_name) AS created_by_full_name,
				CONCAT(updated_by_employee.first_name, ' ', updated_by_employee.last_name) AS updated_by_full_name,
				role_transactions.created_at, role_transactions.updated_at
			FROM role
			JOIN department ON role.department_id = department.id
			JOIN role_transactions ON role.id = role_transactions.role_id
			JOIN employee AS created_by_employee ON role_transactions.created_by = created_by_employee.id
			JOIN employee AS updated_by_employee ON role_transactions.updated_by = updated_by_employee.id
			WHERE role.id = $1;
			`;
      const results = await this.fetch(query, values);
      const row = results.rows[0];
      return new Role(row.title, parseFloat(row.salary), row.department_name, row.id).toObject();
    } catch (error) {
      const ERROR = <EmployeeTrackerError>error;
      throw new Error(ERROR.message);
    }
  }

  /**
   * Read All
   * @return {Promise<Array<Role>>}
   * @description Reads all roles from the database
   */
  async readAll(): Promise<Array<Role>> {
    try {
      const query = `
			SELECT role.id, role.title, role.salary, department.name AS department_name,
				CONCAT(created_by_employee.first_name, ' ', created_by_employee.last_name) AS created_by_full_name,
				CONCAT(updated_by_employee.first_name, ' ', updated_by_employee.last_name) AS updated_by_full_name,
				role_transactions.created_at, role_transactions.updated_at
			FROM role
			JOIN department ON role.department_id = department.id
			JOIN role_transactions ON role.id = role_transactions.role_id
			JOIN employee AS created_by_employee ON role_transactions.created_by = created_by_employee.id
			JOIN employee AS updated_by_employee ON role_transactions.updated_by = updated_by_employee.id;
			`;
      const results = await this.fetch(query);
      return results.rows.map((row) =>
        new Role(
          row.title,
          parseFloat(row.salary),
          row.department_name,
          row.id,
          new Date(row.created_at),
          new Date(row.updated_at),
          row.created_by_full_name,
          row.updated_by_full_name,
        ).toObject(),
      );
    } catch (error) {
      const ERROR = <EmployeeTrackerError>error;
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
      const values = [fields.title ?? this.role.title, fields.salary ?? this.role.salary, fields.departmentId ?? this.role.department, this.role.id];
      const query = 'UPDATE role SET title = COALESCE($1, title), salary = COALESCE($2, salary), department_id = COALESCE($3, department_id) WHERE id=$4 RETURNING *;';
      await this.fetch(query, values);
      return this.readOne(this.role.id!);
    } catch (error) {
      const ERROR = <EmployeeTrackerError>error;
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
      const ERROR = <EmployeeTrackerError>error;
      throw new Error(ERROR.message);
    }
  }
}
