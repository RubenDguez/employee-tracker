export default class Employee {
    readonly id: number;
    readonly firstName: string;
    readonly lastName: string;
    readonly roleId: number;
    readonly managerId: number;
    readonly createdAt: Date;
    readonly updatedAt: Date;

    constructor(id: number, firstName: string, lastName: string, roleId: number, managerId: number, createdAt: Date, updatedAt: Date) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.roleId = roleId;
        this.managerId = managerId;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}
