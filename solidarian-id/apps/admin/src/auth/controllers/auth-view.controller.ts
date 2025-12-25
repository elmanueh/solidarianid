import { Controller, Get, Render } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

/**
 * Controlador de vistas para autenticación (MVC)
 * Maneja las rutas que renderizan las vistas de login y registro
 */
@Controller()
export class AuthViewController {
  constructor(private readonly configService: ConfigService) {}

  @Get('/login')
  @Render('pages/login')
  login() {
    return {
      title: 'Login',
      isLoginPage: true,
      apiBaseUrl: this.configService.get<string>('API_BASE_URL'),
    };
  }

  @Get('/register')
  @Render('pages/register')
  // @UseGuards(AuthGuard) // Descomentar si se desea proteger la ruta de registro
  register() {
    return {
      title: 'Register',
      isRegisterPage: true,
      apiBaseUrl: this.configService.get<string>('API_BASE_URL'),
    };
  }
}
