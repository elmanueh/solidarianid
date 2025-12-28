import { EntityNotFoundException } from '@app/ddd/repository/exceptions/entity-not-found.exception';
import { ErrorDto } from '@app/utils/http/error.dto';
import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';

@Catch(EntityNotFoundException)
export class NotFoundErrorFilter implements ExceptionFilter {
  catch(exception: EntityNotFoundException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const errorDto: ErrorDto = new ErrorDto(404, exception.message);
    response.status(404).json(errorDto);
  }
}
