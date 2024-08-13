import Department from './Department';
import Role from './Role';

export default abstract class Base {
	#id: number | null;
	#createdAt: Date | null;
	#updatedAt: Date | null;

	constructor(id?: number, createdAt?: Date, updatedAt?: Date) {
		this.#id = id ?? null;
		this.#createdAt = createdAt ?? null;
		this.#updatedAt = updatedAt ?? null;
	}

	get id(): number | null {
		return this.#id;
	}

	set id(value: number) {
		this.#id = value;
	}

	get createdAt(): Date | null {
		return this.#createdAt;
	}

	set createdAt(value: Date) {
		this.#createdAt = value;
	}

	get updatedAt(): Date | null {
		return this.#updatedAt;
	}

	set updatedAt(value: Date) {
		this.#updatedAt = value;
	}

	abstract toObject(): Role | Department;
}
