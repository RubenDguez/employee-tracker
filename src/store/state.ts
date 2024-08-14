export enum EState {
    ROLE = 'ROLE',
}

export default class State {
    private static instance: State | null = null;
    private _store: Map<string, string> = new Map();

    private constructor() {}

    public static getInstance() {
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
}
