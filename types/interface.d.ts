interface CRUD {
	create: () => Promise;
	readAll: () => Promise<Array>;
	readOne: (id: number) => Promise;
	update: (obj: any) => Promise;
	delete: (id: number) => Promise<boolean>;
}

interface RoleUpdatable {
	title: string;
	salary: number;
	departmentId: number;
}

interface DepartmentUpdatable {
	name: string;
}
