import { Pool, QueryResult } from 'pg';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), 'db.env') });

export default class DB {
	private readonly pool = new Pool({
		user: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
		host: process.env.DB_HOST,
		database: process.env.DB_DATABASE,
		port: parseInt(process.env.DB_PORT!),
	});

	/**
	 * Connect
	 * @return {Promise<void>}
	 */
	protected async connect(): Promise<void> {
		try {
			await this.pool.connect();
		} catch (err) {
			const ERROR = <Error>err;
			throw new Error(ERROR.message);
		}
	}

	/**
	 * Fetch
	 * @param {string} query
	 * @return {Promise<QueryResult<any>>}
	 */
	protected async fetch(query: string, values?: any): Promise<QueryResult<any>> {
		try {
			const res = await this.pool.query(query, values);
			return res;
		} catch (err) {
			const ERROR = <Error>err;
			throw new Error(ERROR.message);
		}
	}
}
