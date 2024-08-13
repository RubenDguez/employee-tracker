import Role from './model/Role';
import RoleController from './controller/RoleController';

async function init() {
	const transact = new RoleController();

    // no need to create object to use read one or read all
	console.log('READ ONE', await transact.readOne(1));
	console.log('READ ALL', await transact.readAll());


    // role object required for Create, Update and Delete
	const newRole = new Role('Manager', 65000, 1);
	const roleTransaction = new RoleController(newRole);

	console.log('CREATE: ', await roleTransaction.create());
	console.log('UPDATE', await roleTransaction.update({ salary: newRole.salary * 1.03 }));
	console.log('DELETE', await roleTransaction.delete());

	process.exit(0);
}

init();
