import { DateTime } from 'luxon';
import Base from './Base';
import State, { EState } from '../store/state';

// Employee Class
export default class Role extends Base {
  #title: string;
  #salary: number;
  #department: number;

  /**
   * Constructor
   * @param {string} title 
   * @param {number} salary 
   * @param {number} departmentId 
   * @param {number} id 
   * @param {Date} createdAt 
   * @param {Date} updatedAt 
   * @param {string} createdBy 
   * @param {string} updatedBy 
   */
  constructor(title: string, salary: number, departmentId: number, id?: number, createdAt?: Date, updatedAt?: Date, createdBy?: string, updatedBy?: string) {
    super(id, createdAt, updatedAt);

    this.#title = title;
    this.#salary = salary;
    this.#department = departmentId;
    this.createdBy = createdBy ?? '';
    this.updatedBy = updatedBy ?? '';
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

  /**
   * To Object
   * @return {Role}
   */
  override toObject(): Role {
    const ROLE = State.getInstance().get(EState.ROLE);

    let role: Partial<Role> = {
      id: this.id,
      title: this.title,
      department: this.department,
      salary: ROLE?.includes('manager') ? this.salary : 0.0,
    };

    if (ROLE === 'general manager' || ROLE === 'store manager')
      role = {
        ...role,
        createdBy: this.createdBy,
        createdAt: DateTime.fromJSDate(new Date(this.createdAt!)).toFormat('yyyy LLL dd - HH:mm:ss'),
        updatedBy: this.updatedBy,
        updatedAt: DateTime.fromJSDate(new Date(this.updatedAt!)).toFormat('yyyy LLL dd - HH:mm:ss'),
      };

    return <Role>role;
  }
}
