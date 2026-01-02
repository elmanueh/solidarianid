import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';
import { RenderHttpExceptionMapper } from './mappers/http-exception-render.mapper';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    const acceptsJson = request.accepts('json', 'html') === 'json';

    if (!acceptsJson) {
      const errorData = RenderHttpExceptionMapper(status);

      response.status(status).render('pages/error', {
        ...errorData,
        layout: 'auth',
        title: errorData.errorTitle,
      });
    } else {
      response.status(status).json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
        message: exception.message,
      });
    }
  }
}
