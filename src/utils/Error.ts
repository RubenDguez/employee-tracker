export default class EmployeeTrackerError extends Error {
  constructor(message: string) {
    super(message);

    super.name = 'Employee Error Tracker';
    this.name = 'Employee Error Tracker';
    this.stack = '';
  }
}
