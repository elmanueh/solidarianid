import { Controller, Get, Render } from '@nestjs/common';

/**
 * Controlador de vistas para autenticación (MVC)
 * Maneja las rutas que renderizan las vistas de login y registro
 */
@Controller()
export class AuthViewController {
  @Get('/login')
  @Render('pages/login')
  login() {
    return {
      title: 'Inicio de sesión',
    };
  }

  @Get('/register')
  @Render('pages/register')
  register() {
    return {
      title: 'Registro de usuario',
    };
  }
}
