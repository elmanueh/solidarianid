import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Res,
} from '@nestjs/common';
import type { Response } from 'express';
import {
  UsersServicePort,
  RegisterUserCommand,
} from '@app/users/domain/ports/input/users.service.port';
import { RegisterUserDtoRequest } from '@app/users/infrastructure/presentation/dtos/register-user.dto';
import {
  ApiOperation,
  ApiBody,
  ApiTags,
  ApiCreatedResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly usersService: UsersServicePort) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Registrarse en la plataforma' })
  @ApiBody({ type: RegisterUserDtoRequest })
  @ApiCreatedResponse({
    description: 'Usuario creado exitosamente',
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  async register(
    @Body() dto: RegisterUserDtoRequest,
    @Res() res: Response,
  ): Promise<void> {
    const command: RegisterUserCommand = {
      username: dto.username,
      mobilePhone: dto.mobilePhone,
      password: dto.password,
      city: dto.city,
      countryCode: dto.countryCode,
    };

    const userResult = await this.usersService.registerUser(command);
    if (userResult.isLeft()) {
      res
        .status(HttpStatus.CONFLICT)
        .send({ message: userResult.value.message });
      return;
    }

    // Retornar 201 Created con Location header
    res.setHeader('Location', `/users/${userResult.value}`);
    res.status(HttpStatus.CREATED).send();
  }
}
