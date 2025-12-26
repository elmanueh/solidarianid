import { ValidationError } from './validation-error';

export class InvalidHashPasswordError extends ValidationError {
  constructor(message: string = 'The hashed password is invalid.') {
    super(message);
    this.name = 'InvalidHashPasswordError';
  }
}
