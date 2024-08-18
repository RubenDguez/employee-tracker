import Employee from '../model/Employee';
import State, { EState } from '../store/state';
import EmployeeTrackerError from '../utils/Error';
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
      const STATE = State.getInstance();
      const values = [this.employee.firstName, this.employee.lastName, this.employee.role, this.employee.manager];
      const createQuery = 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4) RETURNING *;';
      const transactionQuery = 'INSERT INTO employee_transactions (employee_id, created_by, updated_by) VALUES ($1, $2, $3);';
      const results = await this.fetch(createQuery, values);
      const row = results.rows[0];
      this.employee.id = row.id;
      await this.fetch(transactionQuery, [this.employee.id, parseInt(STATE.get(EState.USER_ID)!), parseInt(STATE.get(EState.USER_ID)!)]);
      return new Employee(row.first_name, row.last_name, row.role_id, row.manager_id, row.id).toObject();
    } catch (error) {
      const ERROR = <EmployeeTrackerError>error;
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
			SELECT employee.id, employee.first_name, employee.last_name, role.title AS role_name, role.salary,
				CASE WHEN manager.id IS NULL THEN 'NONE' ELSE CONCAT(manager.first_name, ' ', manager.last_name) END AS manager_full_name, 
				employee_transactions.created_at, employee_transactions.updated_at,
				department.name AS department_name,
				CONCAT(created_by_employee.first_name, ' ', created_by_employee.last_name) AS created_by_full_name,
				CONCAT(updated_by_employee.first_name, ' ', updated_by_employee.last_name) AS updated_by_full_name
			FROM employee
			JOIN role ON employee.role_id = role.id
			LEFT JOIN employee AS manager ON employee.manager_id = manager.id
			JOIN department ON role.department_id = department.id
			JOIN employee_transactions ON employee.id = employee_transactions.employee_id
			JOIN employee AS created_by_employee ON employee_transactions.created_by = created_by_employee.id
			JOIN employee AS updated_by_employee ON employee_transactions.updated_by = updated_by_employee.id
			WHERE employee.id = $1;
			`;
      const results = await this.fetch(query, values);
      const row = results.rows[0];
      return new Employee(row.first_name, row.last_name, row.role_id, row.manager_id, row.id, row.created_at, row.updated_at).toObject();
    } catch (error) {
      const ERROR = <EmployeeTrackerError>error;
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
				employee_transactions.created_at, employee_transactions.updated_at,
				department.name AS department_name,
				CONCAT(created_by_employee.first_name, ' ', created_by_employee.last_name) AS created_by_full_name,
				CONCAT(updated_by_employee.first_name, ' ', updated_by_employee.last_name) AS updated_by_full_name
			FROM employee
			JOIN role ON employee.role_id = role.id
			LEFT JOIN employee AS manager ON employee.manager_id = manager.id
			JOIN department ON role.department_id = department.id
			JOIN employee_transactions ON employee.id = employee_transactions.employee_id
			JOIN employee AS created_by_employee ON employee_transactions.created_by = created_by_employee.id
			JOIN employee AS updated_by_employee ON employee_transactions.updated_by = updated_by_employee.id;
			`;
      const results = await this.fetch(query);
      return results.rows.map((row) =>
        new Employee(
          row.first_name,
          row.last_name,
          row.role_name,
          row.manager_full_name,
          row.id,
          row.created_at,
          row.updated_at,
          row.salary,
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
   * @param {Partial<EmployeeUpdatable>} fields
   * @return {Promise<Employee>}
   * @description Updates an employee in the database
   * @throws {Error} Employee is not defined
   */
  async update(fields: Partial<EmployeeUpdatable>): Promise<Employee> {
    if (!this.employee) throw new Error('Employee is not defined');
    try {
      const updateQuery =
        'UPDATE employee SET first_name = COALESCE($1, first_name), last_name = COALESCE($2, last_name), role_id = COALESCE($3, role_id), manager_id = COALESCE($4, manager_id) WHERE id=$5 RETURNING *;';
      const updateTransaction =
        'UPDATE employee_transactions SET updated_at = COALESCE(CURRENT_TIMESTAMP, updated_at), updated_by = COALESCE($1, updated_by) WHERE employee_id = $2;';

      const updateValues = [
        fields.firstName ?? this.employee.firstName,
        fields.lastName ?? this.employee.lastName,
        fields.roleId ?? this.employee.role,
        fields.managerId ?? this.employee.manager,
        this.employee.id,
      ];
      const updateTransactionValues = [parseInt(State.getInstance().get(EState.USER_ID)!), this.employee.id];

      await this.fetch(updateQuery, updateValues);
      await this.fetch(updateTransaction, updateTransactionValues);
      return this.readOne(this.employee.id!);
    } catch (error) {
      const ERROR = <EmployeeTrackerError>error;
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
      const ERROR = <EmployeeTrackerError>error;
      throw new Error(ERROR.message);
    }
  }
}
