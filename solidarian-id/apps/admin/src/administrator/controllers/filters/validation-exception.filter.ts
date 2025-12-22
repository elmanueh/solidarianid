import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  BadRequestException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(BadRequestException)
export class ValidationExceptionFilter implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    // Verificar si es un error de validación de class-validator
    if (
      typeof exceptionResponse === 'object' &&
      'message' in exceptionResponse
    ) {
      const messages = exceptionResponse['message'];

      // Si es un array de mensajes de validación
      if (Array.isArray(messages)) {
        return response.status(status).json({
          statusCode: status,
          error: 'Error de validación',
          message: messages[0],
          timestamp: new Date().toISOString(),
        });
      }

      // Si es un mensaje simple
      return response.status(status).json({
        statusCode: status,
        error: 'Error de validación',
        message: messages,
        timestamp: new Date().toISOString(),
      });
    }

    // Respuesta por defecto
    return response.status(status).json({
      statusCode: status,
      error: 'Bad Request',
      message: 'Error en la solicitud',
      timestamp: new Date().toISOString(),
    });
  }
}
