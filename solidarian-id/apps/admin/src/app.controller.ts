import { Controller, Get, Redirect } from '@nestjs/common';

/**
 * Controlador raíz de la aplicación
 * Solo maneja la redirección inicial
 */
@Controller()
export class AppController {
  @Get()
  @Redirect('/login')
  root() {
    return {
      title: 'Inicio de sesión',
    };
  }
}
