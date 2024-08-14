export default [
    {
        name: 'username',
        message: 'Enter your username',
        validate: (username: string) => {
            if (!username.length) {
                return 'Username cannot be empty';
            }
            return true;
        }
    },
    {
        name: 'password',
        message: 'Enter your password',
        type: 'password',
        mask: '*',
        validate: (password: string) => {
            if (!password.length) {
                return 'Password cannot be empty';
            }
            return true;
        }
    }
]
