import { DateTime } from "luxon";
import Base from "./Base";

export default class Employee extends Base {
    #firstName: string;
    #lastName: string;
    #roleId: number | string;
    #managerId: number;

    constructor(firstName: string, lastName: string, roleId: number | string, managerId: number, id?: number, createdAt?: Date, updatedAt?: Date) {
        super(id, createdAt, updatedAt);

        this.#firstName = firstName;
        this.#lastName = lastName;
        this.#roleId = roleId;
        this.#managerId = managerId;
    }

    get firstName(): string {
        return this.#firstName;
    }

    set firstName(value: string) {
        this.#firstName = value;
    }

    get lastName(): string {
        return this.#lastName;
    }

    set lastName(value: string) {
        this.#lastName = value;
    }

    get roleId(): number | string {
        return this.#roleId;
    }

    set roleId(value: number) {
        this.#roleId = value;
    }

    get managerId(): number {
        return this.#managerId;
    }

    set managerId(value: number) {
        this.#managerId = value;
    }

    override toObject(): Employee {
        return <Employee> {
            id: this.id,
            firstName: this.firstName,
            lastName: this.lastName,
            roleId: this.roleId,
            managerId: this.managerId,
			createdAt: DateTime.fromJSDate(new Date(this.createdAt!)).toFormat('yyyy LLL dd'),
			updatedAt: DateTime.fromJSDate(new Date(this.createdAt!)).toFormat('yyyy LLL dd'),
        }
    }
}
