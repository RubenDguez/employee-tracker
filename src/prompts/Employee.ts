const newEmployee = () => {
    return [
        {
            name: 'firstName',
            message: 'What is the first name of the employee?',
            validate: (name: string) => {
                if (!name.length) {
                    return 'Please provide a first name.';
                }
            }
        }
    ]
}

export { newEmployee }
