import { ValidationError } from './validation-error';

export class InvalidPasswordError extends ValidationError {
  constructor(
    message: string = 'The password must be over 12 characters and include at least one number and one ASCII symbol.',
  ) {
    super(message);
    this.name = 'InvalidPasswordError';
  }
}
