const newEmployee = (roles: Array<{ name: string; value: number }>, managers: Array<{ name: string; value: number | null }>) => {
    managers.unshift({name: 'NONE', value: null});

    return [
        {
            name: 'firstName',
            message: 'What is the first name of the employee?',
            validate: (name: string) => {
                if (!name.length) {
                    return 'Please provide a first name.';
                }
                if (name.length <= 1 || name.length > 30) {
                    return 'First name must be between 2 and 30 characters.';
                }
                return true;
            }
        },
        {
            name: 'lastName',
            message: 'What is the last name of the employee?',
            validate: (name: string) => {
                if (!name.length) {
                    return 'Please provide a last name.';
                }
                if (name.length <= 1 || name.length > 30) {
                    return 'Last name must be between 2 and 30 characters.';
                }
                return true;
            }
        },
        {
            name: 'role',
            message: 'What is the role of the employee?',
            type: 'list',
            choices: roles,
        },
        {
            name: 'manager',
            message: 'Who is the manager of the employee?',
            type: 'list',
            choices: managers,
        }
    ]
}

export { newEmployee }
