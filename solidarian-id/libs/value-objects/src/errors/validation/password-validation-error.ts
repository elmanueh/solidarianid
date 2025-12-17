import { ValidationError } from './validation-error';

export class PasswordTooWeakError extends ValidationError {
  constructor(message: string = 'The password is too weak.') {
    super(message);
    this.name = 'InvalidPasswordError';
  }
}
