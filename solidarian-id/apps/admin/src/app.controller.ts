import { Controller, Get, Redirect, Render } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  @Redirect('/login')
  root() {
    return {
      title: 'Auth',
    };
  }

  @Get('/login')
  @Render('pages/login')
  login() {
    return {
      title: 'Login',
    };
  }

  @Get('/register')
  @Render('pages/register')
  register() {
    return {
      title: 'Registro',
    };
  }

  @Get('/dashboard')
  @Render('pages/metricas')
  dashboard() {
    return {
      title: 'Dashboard',
      layout: 'dashboard',
    };
  }

  @Get('/solicitudes')
  @Render('pages/solicitudes')
  solicitudes() {
    return {
      title: 'Solicitudes',
      layout: 'dashboard',
    };
  }
}
