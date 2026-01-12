import { HttpStatus } from '@nestjs/common';

export function RenderHttpExceptionMapper(statusCode: HttpStatus) {
  switch (statusCode) {
    case HttpStatus.NOT_FOUND:
      return {
        statusCode,
        errorTitle: 'Página no encontrada',
        message: 'La página que buscas no existe o ha sido movida.',
        showHomeLink: true,
      };

    case HttpStatus.FORBIDDEN:
      return {
        statusCode,
        errorTitle: 'Acceso denegado',
        message: 'No tienes permisos para acceder a este recurso.',
        showHomeLink: false,
      };

    case HttpStatus.INTERNAL_SERVER_ERROR:
      return {
        statusCode,
        errorTitle: 'Error del servidor',
        message: 'Ha ocurrido un error inesperado. Por favor, intenta de nuevo más tarde.',
        showHomeLink: true,
      };

    default:
      return {
        statusCode,
        errorTitle: 'Error',
        message: 'Ha ocurrido un error al procesar tu solicitud.',
        showHomeLink: true,
      };
  }
}
