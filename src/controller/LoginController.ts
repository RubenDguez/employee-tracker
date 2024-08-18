import State, { EState } from "../store/state";
import EmployeeTrackerError from "../utils/Error";
import Controller from "./Controller"
import CryptoJS from 'crypto-js';

export default class LoginController extends Controller {
    constructor() {
        super()
    }

    async login(username: string, password: string): Promise<boolean> {
        try {
            const values = [username];
            const query = `
            SELECT login.userpassword, employee.id, CONCAT(employee.first_name, ' ' ,employee.last_name) AS full_name, LOWER(role.title) AS title
            FROM login
            JOIN employee ON login.employee_id = employee.id
            JOIN role ON employee.role_id = role.id
            WHERE login.username = $1;
			`;

            const results = await this.fetch(query, values);
            if (results.rowCount === 0) return false;

            const row = results.rows[0];

            if (row.userpassword !== CryptoJS.MD5(username + password).toString()) return false;

            const STATE = State.getInstance();
            STATE.set(EState.ROLE, row.title);
            STATE.set(EState.USER_FULL_NAME, row.full_name);
            STATE.set(EState.USER_ID, row.id.toString());

            return true;
        } catch (error) {
            const ERROR = <EmployeeTrackerError>error;
            throw new Error(ERROR.message);
        }
    }

    async create(username: string, password: string, userId: number): Promise<boolean> {
        try {
            const values = [username, password, userId];
            const query = `
            INSERT INTO login (username, userpassword, employee_id)
            VALUES ($1, $2, $3);
            `;
            await this.fetch(query, values);

            return true;
        } catch (error) {
            const ERROR = <EmployeeTrackerError>error;
            throw new Error(ERROR.message);
        }
    }
}
