import { Controller, Post, Body, HttpCode, HttpStatus, Res, Patch, Param } from '@nestjs/common';
import type { Response } from 'express';
import { UsersService, RegisterUserCommand } from '@app/users/domain/services/users.service';
import { RegisterUserDtoRequest } from '@app/users/infrastructure/presentation/dtos/register-user.request.dto';
import {
  ApiOperation,
  ApiBody,
  ApiTags,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiInternalServerErrorResponse,
  ApiNoContentResponse,
} from '@nestjs/swagger';
import { UpdateUserProfileDtoRequest } from '../dtos/update-user-profile.dto';
import { LoginUserDtoRequest } from '../dtos/login-user.request.dto';
import { ApiOkResponse } from '@nestjs/swagger';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Creating an account for SolidarianID' })
  @ApiBody({ type: RegisterUserDtoRequest })
  @ApiCreatedResponse({
    description: 'User created successfully',
  })
  @ApiConflictResponse({
    description: 'Either the username or the phone number (or both) were registered previously',
  })
  @ApiBadRequestResponse({ description: 'Invalid request payload' })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  async register(@Body() dto: RegisterUserDtoRequest, @Res() res: Response): Promise<void> {
    const command: RegisterUserCommand = {
      fullName: dto.fullName,
      username: dto.username,
      mobilePhone: dto.mobilePhone,
      password: dto.password,
      city: dto.city,
      countryCode: dto.countryCode,
    };

    const userResult = await this.usersService.registerUser(command);
    if (userResult.isLeft()) {
      throw userResult.value;
    }

    // Si no hay error, retornar 201 Created con Location header
    res.setHeader('Location', `/users/${userResult.value}`);
    res.status(HttpStatus.CREATED).send();
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'User login for SolidarianID' })
  @ApiBody({ type: LoginUserDtoRequest })
  @ApiOkResponse({
    description: 'User logged in successfully',
  })
  @ApiBadRequestResponse({ description: 'Invalid request payload' })
  async login(@Body() dto: LoginUserDtoRequest, @Res() res: Response): Promise<void> {
    const loginResult = await this.usersService.loginUser(dto.username, dto.password);

    if (loginResult.isLeft()) {
      throw loginResult.value;
    }

    res.status(loginResult.value ? HttpStatus.OK : HttpStatus.UNAUTHORIZED).send();
  }

  @ApiOperation({ summary: 'Update user profile information' })
  @ApiBody({ type: UpdateUserProfileDtoRequest })
  @ApiNoContentResponse({ description: 'User profile updated successfully' })
  @ApiBadRequestResponse({ description: 'Invalid request payload' })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Patch(':id')
  async updateUserProfile(
    @Param('id') id: string,
    @Body() updateUserProfileDto: UpdateUserProfileDtoRequest,
    @Res() response: Response,
  ) {
    const user = await this.usersService.updateUserProfile(id, {
      fullName: updateUserProfileDto.fullName,
      username: updateUserProfileDto.username,
      mobilePhone: updateUserProfileDto.mobilePhone,
      city: updateUserProfileDto.city,
      countryCode: updateUserProfileDto.countryCode,
    });

    if (user.isLeft()) {
      throw user.value;
    }

    response.status(HttpStatus.NO_CONTENT).send();
  }
}
