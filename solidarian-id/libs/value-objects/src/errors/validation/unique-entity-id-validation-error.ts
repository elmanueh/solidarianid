import { ValidationError } from './validation-error';

export class InvalidUniqueEntityIDError extends ValidationError {
  constructor(
    message: string = 'The unique entity ID provided is not a valid UUID v4.',
  ) {
    super(message);
    this.name = 'InvalidUniqueEntityIDError';
  }
}
