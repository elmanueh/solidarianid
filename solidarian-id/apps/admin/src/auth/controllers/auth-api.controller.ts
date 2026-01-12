import { Body, Controller, HttpCode, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AdminRegisterRequestDto } from './dto/input/admin-register-request.dto';
import { AdminLoginRequestDto } from './dto/input/admin-login-request.dto';
import { AuthService } from '../../administrator/model/domain/services/auth.service';
import type { Request, Response } from 'express';
import { Administrator } from '@app/admin/administrator/model/domain/models/administrator';
import { Either } from '@app/ddd/either';
import { AdministratorDtoMapper } from './mappers/administrator.dto.mapper';
import { AdministratorResponseDto } from './dto/output/administrator-response.dto';
import { ConfigService } from '@nestjs/config';
import { ValidationError } from '@app/value-objects/errors/validation/validation-error';
import { AuthError } from '@app/ddd/errors/auth-error';
import { ConflictError } from '@app/ddd/errors/conflict-error';
import { AuthGuard } from '@app/admin/auth/controllers/guards/auth.guard';

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

  @UseGuards(AuthGuard)
  @Post('register')
  async register(
    @Req() request: Request,
    @Res() response: Response,
    @Body() registerDto: AdminRegisterRequestDto,
  ): Promise<Response<void>> {
    const registerOrError: Either<AuthError | ConflictError | ValidationError, Administrator> =
      await this.authService.register(registerDto.fullName, registerDto.email, registerDto.phone, registerDto.password);

    if (registerOrError.isLeft()) {
      throw registerOrError.value;
    }

    const locationUrl = `${request.protocol}://${request.get('host')}${request.path}/${registerOrError.value.id.value}`;

    return response.status(201).location(locationUrl).json(AdministratorDtoMapper.toDto(registerOrError.value));
  }

  @Post('login')
  @HttpCode(200)
  async login(@Req() request: Request, @Body() loginDto: AdminLoginRequestDto) {
    const loginOrError: Either<AuthError, Administrator> = await this.authService.login(
      loginDto.email,
      loginDto.password,
    );

    if (loginOrError.isLeft()) {
      throw loginOrError.value;
    }

    const adminDto: AdministratorResponseDto = AdministratorDtoMapper.toDto(loginOrError.value);

    request.session.user = adminDto;

    return adminDto;
  }

  @UseGuards(AuthGuard)
  @Post('logout')
  logout(@Req() request: Request, @Res() response: Response) {
    request.session.destroy(() => {
      response.status(204).send();
    });
  }
}
