import { DateTime } from 'luxon';
import Base from './Base';
import State, { EState } from '../store/state';

// Department Class
export default class Department extends Base {
  #name: string;

  /**
   * Constructor
   * @param {string} name 
   * @param {number} id 
   * @param {Date} createdAt 
   * @param {Date} updatedAt 
   * @param {string} createdBy 
   * @param {string} updatedBy 
   */
  constructor(name: string, id?: number, createdAt?: Date, updatedAt?: Date, createdBy?: string, updatedBy?: string) {
    super(id, createdAt, updatedAt, createdBy, updatedBy);

    this.#name = name;
  }

  get name(): string {
    return this.#name;
  }

  set name(value: string) {
    this.#name = value;
  }

  /**
   * To Object
   * @return {Department}
   */
  override toObject(): Department {
    const ROLE = State.getInstance().get(EState.ROLE);

    let department: Partial<Department> = {
      id: this.id,
      name: this.name,
    };

    if (ROLE === 'general manager' || ROLE === 'store manager')
      department = {
        ...department,
        createdBy: this.createdBy,
        createdAt: DateTime.fromJSDate(new Date(this.createdAt!)).toFormat('yyyy LLL dd - HH:mm:ss'),
        updatedBy: this.updatedBy,
        updatedAt: DateTime.fromJSDate(new Date(this.updatedAt!)).toFormat('yyyy LLL dd - HH:mm:ss'),
      };

    return <Department>department;
  }
}
