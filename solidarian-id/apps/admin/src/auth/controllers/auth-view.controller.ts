import { AuthGuard } from '@app/admin/auth/controllers/guards/auth.guard';
import { Controller, Get, Render, UseGuards } from '@nestjs/common';
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
      title: 'Inicio de sesión',
      isLoginPage: true,
      apiBaseUrl: this.configService.get<string>('GATEWAY_BASE_URL') ?? '',
    };
  }

  @UseGuards(AuthGuard)
  @Get('/register')
  @Render('pages/register')
  // @UseGuards(AuthGuard) // Descomentar si se desea proteger la ruta de registro
  register() {
    return {
      title: 'Registro de usuario',
      isRegisterPage: true,
      apiBaseUrl: this.configService.get<string>('GATEWAY_BASE_URL') ?? '',
    };
  }
}
