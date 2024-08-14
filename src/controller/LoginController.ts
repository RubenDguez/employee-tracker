import State, { EState } from "../store/state";
import Controller from "./Controller"

export default class LoginController extends Controller {
    constructor() {
        super()
    }

    async login(username: string, password: string): Promise<boolean> {
        try {
            const values = [username, password];
            const query = `
            SELECT employee.id, CONCAT(employee.first_name, ' ' ,employee.last_name) AS full_name, LOWER(role.title) AS title
            FROM login
            JOIN employee ON login.employee_id = employee.id
            JOIN role ON employee.role_id = role.id
            WHERE login.username = $1 AND login.userpassword = $2;
			`;

            const results = await this.fetch(query, values);
            if (results.rowCount === 0) return false;

            const row = results.rows[0];

            const STATE = State.getInstance();
            STATE.set(EState.ROLE, row.title);
            STATE.set(EState.USER_FULL_NAME, row.full_name);
            STATE.set(EState.USER_ID, row.id.toString());

            return true;
        } catch (error) {
            const ERROR = <Error>error;
            throw new Error(ERROR.message);
        }
    }
}
