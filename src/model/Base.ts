export default abstract class Base {
	#id: number | null;
	#createdAt: TDate;
	#updatedAt: TDate;

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

	get createdAt(): TDate {
		return this.#createdAt;
	}

	set createdAt(value: Date) {
		this.#createdAt = value;
	}

	get updatedAt(): TDate {
		return this.#updatedAt;
	}

	set updatedAt(value: Date) {
		this.#updatedAt = value;
	}

	abstract toObject(): any;
}
