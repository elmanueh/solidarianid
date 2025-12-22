import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { AdminRegisterRequestDto } from './dto/input/admin-register-request.dto';
import { AdminLoginRequestDto } from './dto/input/admin-login-request.dto';
import { AuthService } from '../../administrator/model/domain/services/auth.service';
import type { Request, Response } from 'express';

/**
 * Controlador API para autenticación
 * Maneja las peticiones REST de autenticación
 */
@Controller('/api/auth')
export class AuthApiController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() registerDto: AdminRegisterRequestDto) {
    console.log('Register DTO:', registerDto);
  }

  @Post('login')
  login(@Body() loginDto: AdminLoginRequestDto) {
    this.authService.login(loginDto.email, loginDto.password);
  }

  @Post('logout')
  logout(@Req() request: Request, @Res() response: Response) {
    request.session.destroy(() => response.redirect('/login'));
  }
}
