import { Controller, Get, Redirect } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('health')
  health() {
    return {
      status: 'ok',
    };
  }

  @Get()
  @Redirect('/login')
  root() {
    return {
      title: 'Inicio de sesión',
    };
  }
}
