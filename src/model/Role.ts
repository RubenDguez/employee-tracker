export default class Role {
	#id: number | null;
	#title: string;
	#salary: number;
	#departmentId: number;
	#createdAt: Date | null;
	#updatedAt: Date | null;

	constructor(title: string, salary: number, departmentId: number, id?: number, createdAt?: Date, updatedAt?: Date) {
		this.#id = id || null;
        this.#title = title;
		this.#salary = salary;
		this.#departmentId = departmentId;
		this.#createdAt = createdAt || null;
		this.#updatedAt = updatedAt || null;
	}

    get id(): number | null {
        return this.#id;
    }

    set id(value: number) {
        this.#id = value;
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
        return this.#departmentId
    }

    set departmentId(value: number) {
        this.#departmentId = value; 
    }

    get createdAt() {
        return this.#createdAt;
    }

    get updatedAt() {
        return this.#updatedAt;
    }

    toObject(): Role {
        return <Role>{
            id: this.id,
            title: this.title,
            salary: this.salary,
            departmentId: this.departmentId,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
        };
    }
}
