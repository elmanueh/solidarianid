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
import { RegisterUserDtoRequest } from '@app/users/infrastructure/presentation/dtos/register-user.request.dto';
import {
  ApiOperation,
  ApiBody,
  ApiTags,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiInternalServerErrorResponse,
} from '@nestjs/swagger';
import { ValidationError } from '@app/value-objects/errors/validation/validation-error';
import { DomainError } from '@app/ddd/domain-error';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly usersService: UsersServicePort) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Creating an account for SolidarianID' })
  @ApiBody({ type: RegisterUserDtoRequest })
  @ApiCreatedResponse({
    description: 'User created successfully',
  })
  @ApiConflictResponse({
    description:
      'Either the username or the phone number (or both) were registered previously',
  })
  @ApiBadRequestResponse({ description: 'Invalid request payload' })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
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
      const error = userResult.value;

      // Diferenciar entre errores de validación (400) y conflictos (409)
      if (error instanceof ValidationError) {
        res.status(HttpStatus.BAD_REQUEST).send({ message: error.message });
        return;
      }

      if (error instanceof DomainError) {
        res.status(HttpStatus.CONFLICT).send({ message: error.message });
        return;
      }

      // Error genérico
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send({ message: 'An unexpected error occurred' });
      return;
    }

    // Retornar 201 Created con Location header
    res.setHeader('Location', `/users/${userResult.value}`);
    res.status(HttpStatus.CREATED).send();
  }
}
