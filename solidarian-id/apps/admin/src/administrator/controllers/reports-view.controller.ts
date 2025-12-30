import { Controller, Get, Render } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

/**
 * Controlador de vistas para reportes (MVC)
 * Maneja las rutas que renderizan las vistas del módulo de reportes
 */
@Controller()
export class ReportsViewController {
  constructor(private readonly configService: ConfigService) {}

  /**
   * Renderiza la página de reportes de usuarios
   * GET /reports
   */
  @Get('/reports')
  @Render('pages/reports')
  reports() {
    return {
      title: 'Reportes de Usuarios',
      layout: 'dashboard',
      apiBaseUrl: this.configService.get<string>('API_ADMIN_BASE_URL'),
    };
  }
}
