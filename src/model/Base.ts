/* eslint-disable @typescript-eslint/no-explicit-any */
export default abstract class Base {
  #id: number | null;
  #createdAt: TDate;
  #updatedAt: TDate;
  #createdBy: string | null;
  #updatedBy: string | null;

  constructor(id?: number, createdAt?: Date, updatedAt?: Date, createdBy?: string, updatedBy?: string) {
    this.#id = id ?? null;
    this.#createdAt = createdAt ?? null;
    this.#updatedAt = updatedAt ?? null;
    this.#createdBy = createdBy ?? null;
    this.#updatedBy = updatedBy ?? null;
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

  get createdBy(): string | null {
    return this.#createdBy;
  }

  set createdBy(value: string | null) {
    this.#createdBy = value;
  }

  get updatedBy(): string | null {
    return this.#updatedBy;
  }

  set updatedBy(value: string | null) {
    this.#updatedBy = value;
  }

  abstract toObject(): any;
}
