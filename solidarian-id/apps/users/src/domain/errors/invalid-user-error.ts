import { DomainError } from '@app/ddd/domain-error';

export class InvalidUserError extends Error implements DomainError {
  errorMessage?: string;
  error?: any;

  constructor(message: string = 'The user data provided is invalid.') {
    super(message);
    this.name = 'InvalidUserError';
    this.errorMessage = message;
  }
}
