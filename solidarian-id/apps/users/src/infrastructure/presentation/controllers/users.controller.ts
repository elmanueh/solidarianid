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
  UserServicePort,
  RegisterUserCommand,
} from '@app/users/domain/ports/in/users.service.port';
import { RegisterUserDto } from '@app/users/application/dtos/register-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UserServicePort) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async register(
    @Body() dto: RegisterUserDto,
    @Res() res: Response,
  ): Promise<void> {
    const command: RegisterUserCommand = {
      username: dto.username,
      mobilePhone: dto.mobilePhone,
      password: dto.password,
    };

    const userId = await this.usersService.registerUser(command);

    // Retornar 201 Created con Location header
    res.setHeader('Location', `/users/${userId}`);
    res.status(HttpStatus.CREATED).send();
  }
}
