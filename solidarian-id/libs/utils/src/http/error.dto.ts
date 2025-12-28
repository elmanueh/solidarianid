export class ErrorDto {
  private readonly statusCode: number;
  private readonly message: string;
  private readonly timestamp: string;

  constructor(statusCode: number, message: string) {
    this.statusCode = statusCode;
    this.message = message;
    this.timestamp = new Date().toISOString();
  }
}
