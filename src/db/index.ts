import { Pool, PoolClient } from 'pg';
import * as dotenv from 'dotenv';
import path from 'path';
import EmployeeTrackerError from '../utils/Error';

dotenv.config({ path: path.join(process.cwd(), 'db.env') });

export default class DB {
	static #instance: DB | null = null;
	#connection: PoolClient | null = null;

	readonly pool = new Pool({
		user: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
		host: process.env.DB_HOST,
		database: process.env.DB_DATABASE,
		port: parseInt(process.env.DB_PORT!),
	});

	// Private constructor for singleton pattern
	// Preventing unnecessary connections
	private constructor() {}

	static getInstance() {
		if (!this.#instance) this.#instance = new DB();
		return this.#instance;
	}

	/**
	 * Connect
	 * @return {Promise<PoolClient>}
	 * @description Connect to the database
	 */
	async connection(): Promise<PoolClient> {
		try {
			if (this.#connection) {
				return this.#connection;
			}

			this.#connection = await this.pool.connect();
			console.warn('\nDB is now connected...\n');
			return this.#connection;
		} catch (err) {
			const ERROR = <EmployeeTrackerError>err;
			throw new Error(ERROR.message);
		}
	}
}
