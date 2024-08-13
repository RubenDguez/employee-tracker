import Base from './Base';

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
		return <Department>{
			id: this.id,
			name: this.name,
			createdAt: this.createdAt,
			updatedAt: this.updatedAt,
		};
	}
}
