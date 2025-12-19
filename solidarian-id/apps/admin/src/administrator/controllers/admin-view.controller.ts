import { Controller, Get, Render } from '@nestjs/common';

/**
 * Controlador de vistas para el panel de administración (MVC)
 * Maneja las rutas que renderizan las vistas del dashboard
 */
@Controller()
export class AdminViewController {
  @Get('/dashboard')
  @Render('pages/metrics')
  dashboard() {
    return {
      title: 'Dashboard',
      layout: 'dashboard',
    };
  }

  @Get('/requests')
  @Render('pages/requests')
  requests() {
    return {
      title: 'Requests',
      layout: 'dashboard',
    };
  }
}
