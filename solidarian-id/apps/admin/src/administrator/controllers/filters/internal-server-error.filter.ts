import { RepositoryException } from '@app/ddd/repository/exceptions/repository.exception';
import { ErrorDto } from '@app/utils/http/error.dto';
import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';

@Catch(RepositoryException)
export class InternalServerErrorFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const errorDto: ErrorDto = new ErrorDto(500, exception.message);
    response.status(500).json(errorDto);
  }
}
