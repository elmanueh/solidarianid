import { ValidationError } from './validation-error';

export class InvalidUsernameError extends ValidationError {
  constructor(message: string = 'The username provided is invalid.') {
    super(message);
    this.name = 'InvalidUsernameError';
  }
}
