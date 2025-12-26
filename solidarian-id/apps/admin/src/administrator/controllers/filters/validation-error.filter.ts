import { ErrorDto } from '@app/utils/http/error.dto';
import { ValidationError } from '@app/value-objects/errors/validation/validation-error';
import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';

@Catch(ValidationError)
export class ValidationErrorFilter implements ExceptionFilter {
  catch(exception: ValidationError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const errorDto: ErrorDto = new ErrorDto(400, exception.message);
    response.status(400).json(errorDto);
  }
}
