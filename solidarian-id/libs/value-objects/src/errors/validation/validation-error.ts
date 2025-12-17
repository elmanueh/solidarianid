export class ValidationError extends EvalError {
  constructor(message: string = 'Validation error occurred') {
    super(message);
    this.name = 'ValidationError';
  }
}
