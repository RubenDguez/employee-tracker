import { DateTime } from 'luxon';
import Base from './Base';
import State, { EState } from '../store/state';

export default class Employee extends Base {
  #firstName: string;
  #lastName: string;
  #role: number | string;
  #manager: number | string;
  #salary: number | undefined;

  constructor(
    firstName: string,
    lastName: string,
    roleId: number | string,
    managerId: number | string,
    id?: number,
    createdAt?: Date,
    updatedAt?: Date,
    salary?: number,
    createdBy?: string,
    updatedBy?: string,
  ) {
    super(id, createdAt, updatedAt);

    this.#firstName = firstName;
    this.#lastName = lastName;
    this.#role = roleId;
    this.#manager = managerId;
    this.#salary = salary;
    this.createdBy = createdBy ?? '';
    this.updatedBy = updatedBy ?? '';
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

  get role(): number | string {
    return this.#role;
  }

  set role(value: number) {
    this.#role = value;
  }

  get manager(): number | string {
    return this.#manager;
  }

  set manager(value: number) {
    this.#manager = value;
  }

  get salary() {
    return this.#salary;
  }

  set salary(value: number | undefined) {
    this.#salary = value;
  }

  override toObject(): Employee {
    const ROLE = State.getInstance().get(EState.ROLE);

    let employee: Partial<Employee> = {
      id: this.id,
      firstName: this.firstName,
      lastName: this.lastName,
      role: this.role,
      salary: ROLE?.includes('manager') ? this.salary : 0.0,
      manager: this.manager,
    };

    if (ROLE === 'general manager' || ROLE === 'store manager')
      employee = {
        ...employee,
        createdBy: this.createdBy,
        createdAt: DateTime.fromJSDate(new Date(this.createdAt!)).toFormat('yyyy LLL dd - HH:mm:ss'),
        updatedBy: this.updatedBy,
        updatedAt: DateTime.fromJSDate(new Date(this.updatedAt!)).toFormat('yyyy LLL dd - HH:mm:ss'),
      };

    return <Employee>employee;
  }
}
