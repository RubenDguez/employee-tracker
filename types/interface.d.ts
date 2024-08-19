/* eslint-disable @typescript-eslint/no-explicit-any */
interface CRUD {
  create: () => Promise;
  readAll: () => Promise<Array>;
  readOne: (id: number) => Promise;
  update: (obj: any) => Promise;
  delete: (id: number) => Promise;
}

interface RoleUpdatable {
  title: string;
  salary: number;
  departmentId: number;
}

interface DepartmentUpdatable {
  name: string;
}

interface EmployeeUpdatable {
  firstName: string;
  lastName: string;
  roleId: number;
  managerId: number;
}
