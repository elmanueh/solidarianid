import { ValidationError } from './validation-error';

export class InvalidDateError extends ValidationError {
  constructor(message: string = 'The date provided is invalid. It must be a valid date string or timestamp.') {
    super(message);
    this.name = 'InvalidDateError';
  }
}
