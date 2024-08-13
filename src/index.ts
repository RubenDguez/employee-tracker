import Role from './model/Role';
import RoleController from './controller/RoleController';
import DepartmentController from './controller/DepartmentController';
import Department from './model/Department';

async function init() {
	const roleController = new RoleController();

	// no need to create object to use read one or read all
	console.log('READ ONE', await roleController.readOne(1));
	console.log('READ ALL', await roleController.readAll());

	// role object required for Create, Update and Delete
	const role = new Role('Manager', 65000, 1);
	const roleTransaction = new RoleController(role);

	console.log('CREATE: ', await roleTransaction.create());
	console.log('UPDATE', await roleTransaction.update({ salary: role.salary * 1.03 }));
	console.log('DELETE', await roleTransaction.delete());

	console.log('\nDEPARTMENTS...\n');

	const departmentController = new DepartmentController();
	console.log('READ ONE', await departmentController.readOne(1));
	console.log('READ ALL', await departmentController.readAll());

	const department = new Department('Used...');
	const departmentTransaction = new DepartmentController(department);
	console.log('CREATE', await departmentTransaction.create());
	console.log('UPDATE', await departmentTransaction.update({ name: 'Used Gear' }));
	console.log('DELETE', await departmentTransaction.delete());

	process.exit(0);
}

init();
