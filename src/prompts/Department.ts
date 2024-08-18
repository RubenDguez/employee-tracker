const newDepartment = () => [
  {
    name: 'name',
    message: 'What is the name of the department?',
    validate: (name: string) => {
      if (!name.length) {
        return 'Please provide a department name.';
      }
      if (name.length <= 3 || name.length > 30) {
        return 'Please provide a name with 3 to 30 chars.';
      }
      return true;
    },
  },
];

export { newDepartment };
