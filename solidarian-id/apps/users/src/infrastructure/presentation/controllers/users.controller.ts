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
