import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { ErrorMapper } from './error-mapper';
import { Request, Response } from 'express';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const httpException = exception instanceof HttpException ? exception : ErrorMapper.toHttp(exception as Error);

    // In GraphQL (and other non-HTTP transports), there is no Express response object.
    if (host.getType() !== 'http') {
      throw httpException;
    }

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status = httpException.getStatus();
    const res = httpException.getResponse();

    response.status(status).json({
      ok: false,
      timestamp: new Date().toISOString(),
      path: request.url,
      error: res,
    });
  }
}
