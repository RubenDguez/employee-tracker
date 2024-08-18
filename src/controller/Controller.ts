import { QueryResult } from 'pg';
import DB from '../db';
import EmployeeTrackerError from '../utils/Error';

export default class Controller {
	/**
	 * Fetch
	 * @param {string} query
	 * @return {Promise<QueryResult<any>>}
	 */
	protected async fetch(query: string, values?: any): Promise<QueryResult<any>> {
		try {
			const conn = await DB.getInstance().connection();
			const res = await conn.query(query, values);
			return res;
		} catch (err) {
			const ERROR = <EmployeeTrackerError>err;
			throw new Error(ERROR.message);
		}
	}
}
