import { RenderHttpExceptionMapper } from '@app/admin/administrator/controllers/filters/mappers/http-exception-render.mapper';
import { ErrorMapper } from '@app/utils/http/filters/error-mapper';
import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const httpException = exception instanceof HttpException ? exception : ErrorMapper.toHttp(exception as Error);
    const status = httpException.getStatus();

    const acceptsJson = request.accepts('json', 'html') === 'json';

    if (acceptsJson) {
      response.status(status).json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
        message: httpException.message,
      });
    } else {
      const errorData = RenderHttpExceptionMapper(status);

      response.status(status).render('pages/error', {
        ...errorData,
        layout: 'auth',
        title: errorData.errorTitle,
      });
    }
  }
}
