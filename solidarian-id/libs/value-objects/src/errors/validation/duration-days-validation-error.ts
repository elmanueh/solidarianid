import { ValidationError } from './validation-error';

export class InvalidDurationDaysError extends ValidationError {
  constructor(message: string = 'The duration days provided are invalid.') {
    super(message);
    this.name = 'InvalidDurationDaysError';
  }
}
