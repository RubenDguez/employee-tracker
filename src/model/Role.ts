import { DateTime } from 'luxon';
import Base from './Base';
import State, { EState } from '../store/state';

export default class Role extends Base {
	#title: string;
	#salary: number;
	#department: number;

	constructor(title: string, salary: number, departmentId: number, id?: number, createdAt?: Date, updatedAt?: Date) {
		super(id, createdAt, updatedAt);

		this.#title = title;
		this.#salary = salary;
		this.#department = departmentId;
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

	get department() {
		return this.#department;
	}

	set department(value: number) {
		this.#department = value;
	}

	override toObject(): Role {
		const STATE = State.getInstance();

		let role: Partial<Role> = {
			id: this.id,
			title: this.title,
			department: this.department,
			salary: this.salary,
		};

		if (STATE.get(EState.ROLE)?.includes('manager')) role = {
			...role,
			createdAt: DateTime.fromJSDate(new Date(this.createdAt!)).toFormat('yyyy LLL dd - HH:mm:ss'),
			updatedAt: DateTime.fromJSDate(new Date(this.updatedAt!)).toFormat('yyyy LLL dd - HH:mm:ss'),
		}

		if (STATE.get(EState.ROLE)?.includes('general') || STATE.get(EState.ROLE)?.includes('store')) role = {
			...role,
			createdBy: 'placeholder',
			updatedBy: 'placeholder',
		}

		return <Role>role;
	}
}
