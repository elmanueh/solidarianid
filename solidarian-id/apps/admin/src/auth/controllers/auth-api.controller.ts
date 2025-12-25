import { Body, Controller, Post, Render, Req, Res } from '@nestjs/common';
import { AdminRegisterRequestDto } from './dto/input/admin-register-request.dto';
import { AdminLoginRequestDto } from './dto/input/admin-login-request.dto';
import { AuthService } from '../../administrator/model/domain/services/auth.service';
import type { Request, Response } from 'express';
import { AuthError } from '@app/admin/administrator/model/domain/errors/auth.error';
import { Administrator } from '@app/admin/administrator/model/domain/model/administrator';
import { Either } from '@app/ddd/either';
import { AdministratorDtoMapper } from './mappers/administrator.dto.mapper';
import { AdministratorResponseDto } from './dto/output/administrator-response.dto';
import { ConfigService } from '@nestjs/config';

/**
 * Controlador API para autenticación
 * Maneja las peticiones REST de autenticación
 */
@Controller('/api/auth')
export class AuthApiController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @Post('register')
  @Render('pages/register')
  // @UseGuards(AuthGuard) // Descomentar si se desea proteger la ruta de registro
  async register(@Body() registerDto: AdminRegisterRequestDto) {
    const registerOrError: Either<AuthError, void> =
      await this.authService.register(
        registerDto.fullName,
        registerDto.email,
        registerDto.phone,
        registerDto.password,
      );

    if (registerOrError.isLeft()) {
      return {
        title: 'Register',
        isRegisterPage: true,
        apiBaseUrl: this.configService.get<string>('API_BASE_URL'),
        errorMessage: registerOrError.value.message,
      };
    }

    return {
      title: 'Login',
      isLoginPage: true,
      apiBaseUrl: this.configService.get<string>('API_BASE_URL'),
      successMessage: 'Registro exitoso del nuevo administrador. ',
    };
  }

  @Post('login')
  async login(
    @Req() request: Request,
    @Res() response: Response,
    @Body() loginDto: AdminLoginRequestDto,
  ) {
    const loginOrError: Either<AuthError, Administrator> =
      await this.authService.login(loginDto.email, loginDto.password);

    if (loginOrError.isLeft()) {
      return response.render('pages/login', {
        title: 'Login',
        isLoginPage: true,
        apiBaseUrl: this.configService.get<string>('API_BASE_URL'),
        errorMessage: loginOrError.value.message,
      });
    }

    const adminDto: AdministratorResponseDto = AdministratorDtoMapper.toDto(
      loginOrError.value,
    );

    request.session.user = adminDto;

    return response.redirect('/dashboard');
  }

  @Post('logout')
  // @UseGuards(AuthGuard) // Descomentar si se desea proteger la ruta de registro
  logout(@Req() request: Request, @Res() response: Response) {
    request.session.destroy(() => {
      response.redirect('/login');
    });
  }
}
