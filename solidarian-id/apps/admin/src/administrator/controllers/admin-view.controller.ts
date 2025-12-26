import { Controller, Get, Render } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

/**
 * Controlador de vistas para el panel de administración (MVC)
 * Maneja las rutas que renderizan las vistas del dashboard
 */
@Controller()
export class AdminViewController {
  constructor(private readonly configService: ConfigService) {}

  @Get('/dashboard')
  @Render('pages/metrics')
  dashboard() {
    return {
      title: 'Dashboard',
      layout: 'dashboard',
      apiBaseUrl: this.configService.get<string>('API_BASE_URL'),
    };
  }

  @Get('/requests')
  @Render('pages/requests')
  requests() {
    return {
      title: 'Requests',
      layout: 'dashboard',
      apiBaseUrl: this.configService.get<string>('API_BASE_URL'),
    };
  }

  @Get('/reports')
  @Render('pages/reports')
  reports() {
    return {
      title: 'Reportes',
      layout: 'dashboard',
      apiBaseUrl: this.configService.get<string>('API_BASE_URL'),
    };
  }
}
