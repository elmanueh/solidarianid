import { ConflictError } from '@app/ddd/errors/conflict-error';
import { ErrorDto } from '@app/utils/http/error.dto';
import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';

@Catch(ConflictError)
export class ConflictErrorFilter implements ExceptionFilter {
  catch(exception: ConflictError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const errorDto: ErrorDto = new ErrorDto(409, exception.message);
    response.status(409).json(errorDto);
  }
}
