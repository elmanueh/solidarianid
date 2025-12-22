export class DomainError extends EvalError {
  constructor(message: string = 'Domain error occurred') {
    super(message);
    this.name = 'DomainError';
  }
}
