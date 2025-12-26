import { AuthError } from '@app/ddd/errors/auth-error';
import { ErrorDto } from '@app/utils/http/error.dto';
import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';

@Catch(AuthError)
export class AuthenticationErrorFilter implements ExceptionFilter {
  catch(exception: AuthError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const errorDto: ErrorDto = new ErrorDto(401, exception.message);
    response.status(401).json(errorDto);
  }
}
