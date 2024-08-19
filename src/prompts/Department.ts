/**
 * New Department Prompt
 * @description Create a new department prompt
 */
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

const deleteDepartment = () => [
  {
    name: 'id',
    message: 'Select a department to delete',
    validate: (id: string) => {
      if (!id.length) {
        return 'Please select a department to delete.';
      }
      if (isNaN(parseInt(id))) {
        return 'Please provide a valid department ID.';
      }

      return true;
    }
  }
]

export { newDepartment, deleteDepartment };
