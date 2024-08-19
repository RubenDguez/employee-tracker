export enum EState {
  USER_ID = 'USER_ID',
  USER_FULL_NAME = 'USER_FULL_NAME',
  USERNAME = 'USERNAME',
  ROLE = 'ROLE',
}

/**
 * State
 * @description Store class to hold the state of the application
 */
export default class State {
  private static instance: State | null = null;
  private _store: Map<string, string> = new Map();

  /** Constructor */
  private constructor() {}

  /**
   * Get Instance
   * @return {State}
   */
  public static getInstance(): State {
    if (this.instance !== null) return this.instance;

    this.instance = new State();
    return this.instance;
  }

  /**
   * Set a key value pair in the store
   * @param {string} key
   * @param {string} value
   */
  set(key: EState, value: string) {
    this._store.set(key, value);
  }

  /**
   * Get a value from the store
   * @param {string} key
   * @return {string | undefined}
   */
  get(key: string): string | undefined {
    return this._store.get(key);
  }

  /**
   * Clear the store
   * @return {void}
   */
  clear(): void {
    this._store.clear();
  }
}
