import { DateTime } from 'luxon';
import Base from './Base';

export default class Role extends Base {
	#title: string;
	#salary: number;
	#departmentId: number;

	constructor(title: string, salary: number, departmentId: number, id?: number, createdAt?: Date, updatedAt?: Date) {
		super(id, createdAt, updatedAt);

		this.#title = title;
		this.#salary = salary;
		this.#departmentId = departmentId;
	}

	get title() {
		return this.#title;
	}

	set title(value: string) {
		this.#title = value;
	}

	get salary() {
		return this.#salary;
	}

	set salary(value: number) {
		this.#salary = value;
	}

	get departmentId() {
		return this.#departmentId;
	}

	set departmentId(value: number) {
		this.#departmentId = value;
	}

	override toObject(): Role {
		return <Role>{
			id: this.id,
			title: this.title,
			salary: this.salary,
			departmentId: this.departmentId,
			createdAt: DateTime.fromJSDate(new Date(this.createdAt!)).toFormat('yyyy LLL dd'),
			updatedAt: DateTime.fromJSDate(new Date(this.createdAt!)).toFormat('yyyy LLL dd'),
		};
	}
}
