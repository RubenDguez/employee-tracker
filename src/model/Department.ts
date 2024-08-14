import { DateTime } from 'luxon';
import Base from './Base';
import State, { EState } from '../store/state';

export default class Department extends Base {
	#name: string;

	constructor(name: string, id?: number, createdAt?: Date, updatedAt?: Date) {
		super(id, createdAt, updatedAt);

		this.#name = name;
	}

	get name(): string {
		return this.#name;
	}

	set name(value: string) {
		this.#name = value;
	}

	toObject(): Department {
		const STATE = State.getInstance();

		let department: Partial<Department> = {
			id: this.id,
			name: this.name,
		}

		if (State.getInstance().get(EState.ROLE)?.includes('manager')) department = {
			...department,
			createdAt: DateTime.fromJSDate(new Date(this.createdAt!)).toFormat('yyyy LLL dd - HH:mm:ss'),
			updatedAt: DateTime.fromJSDate(new Date(this.updatedAt!)).toFormat('yyyy LLL dd - HH:mm:ss'),
		}

		if (STATE.get(EState.ROLE)?.includes('general') || STATE.get(EState.ROLE)?.includes('store')) department = {
			...department,
			createdBy: 'placeholder',
			updatedBy: 'placeholder',
		}

		return <Department>department;
	}
}
