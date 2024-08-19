const supportedSpecialChars = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '-', '_', '+', '=', '{', '}', '[', ']', '|', ';', ':', '<', '>', '.', '?'];
const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

/**
 * Default prompt for username and password
 */
const defPrompt = [
  {
    name: 'username',
    message: 'Enter your username',
    validate: (username: string) => {
      if (!username.length) {
        return 'Username cannot be empty';
      }
      return true;
    },
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
    },
  },
];

/**
 * Prompt for user intent
 */
const userIntent = [
  {
    name: 'usingApp',
    message: 'Will this user be using the app?',
    type: 'confirm',
    default: false,
  },
];

/**
 * New employee form
 */
const newEmployeeForm = [
  {
    name: 'username',
    message: 'Please provide a username',
    validate: (username: string) => {
      if (!username.length) {
        return 'Username cannot be empty';
      }
      if (username.length < 6) {
        return 'Username must be at least 8 characters';
      }
      return true;
    },
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
      if (password.length < 8) {
        return 'Password must be at least 8 characters';
      }

      // Check if password has at least one special character
      let hasSpecialChar = false;
      for (const char of password) {
        if (supportedSpecialChars.includes(char)) {
          hasSpecialChar = true;
          break;
        }
      }
      if (!hasSpecialChar) return `Password must contain at least one special character. Supported Special chars: ${supportedSpecialChars.join(',')}`;

      // Check if password has at least one number
      let hasNumber = false;
      for (const char of password) {
        if (numbers.includes(char)) {
          hasNumber = true;
          break;
        }
      }
      if (!hasNumber) return 'Password must contain at least one number';

      return true;
    },
  },
];

export { defPrompt, newEmployeeForm, userIntent };
