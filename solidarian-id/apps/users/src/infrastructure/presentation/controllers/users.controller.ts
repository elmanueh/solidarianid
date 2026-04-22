import { RegisterUserCommand, UsersService } from '@app/users/domain/services/users.service';
import { RegisterUserDtoRequest } from '@app/users/infrastructure/presentation/dtos/register-user.request.dto';
import { UpdateUserPreferencesRequestDto } from '@app/users/infrastructure/presentation/dtos/update-user-preferences.request.dto';
import { UpdateUserProfileDtoRequest } from '@app/users/infrastructure/presentation/dtos/update-user-profile.dto';
import { UserPreferencesResponseDto } from '@app/users/infrastructure/presentation/dtos/user-preferences.response.dto';
import { UserResponseDto } from '@app/users/infrastructure/presentation/dtos/user.response.dto';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Action, Resource } from '@solidarianid/security/core';
import { AuthorizationGuard, Authorize, CurrentUser, JwtAuthGuard, Public } from '@solidarianid/security/nestjs';
import type { Response } from 'express';

const SELF_POLICY = 'self';
const AuthorizeUserSelf = (action: Action) =>
  Authorize({
    action,
    resource: Resource.USER,
    policy: SELF_POLICY,
  });

@Controller('/api/users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @Public()
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

  @ApiOperation({ summary: 'Update user profile information' })
  @ApiBody({ type: UpdateUserProfileDtoRequest })
  @ApiNoContentResponse({ description: 'User profile updated successfully' })
  @ApiBadRequestResponse({ description: 'Invalid request payload' })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Patch(':id')
  @UseGuards(JwtAuthGuard, AuthorizationGuard)
  @AuthorizeUserSelf(Action.UPDATE)
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

  @Get(':id/preferences')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get user preferences' })
  @ApiOkResponse({
    description: 'User preferences retrieved successfully',
    type: UserPreferencesResponseDto,
  })
  @ApiBadRequestResponse({ description: 'Invalid user ID' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @UseGuards(JwtAuthGuard, AuthorizationGuard)
  @AuthorizeUserSelf(Action.READ)
  async getUserPreferences(@Param('id', ParseUUIDPipe) id: string): Promise<UserPreferencesResponseDto> {
    const preferencesResult = await this.usersService.getUserPreferences(id);

    if (preferencesResult.isLeft()) {
      throw preferencesResult.value;
    }

    return preferencesResult.value;
  }

  @Patch(':id/preferences')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Update user preferences' })
  @ApiBody({ type: UpdateUserPreferencesRequestDto })
  @ApiNoContentResponse({ description: 'User preferences updated successfully' })
  @ApiBadRequestResponse({ description: 'Invalid request payload' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @UseGuards(JwtAuthGuard, AuthorizationGuard)
  @AuthorizeUserSelf(Action.UPDATE)
  async updateUserPreferences(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updatePreferencesDto: UpdateUserPreferencesRequestDto,
    @Res() response: Response,
  ): Promise<void> {
    const updateResult = await this.usersService.updateUserPreferences(id, {
      preferredSDGs: updatePreferencesDto.preferredSDGs,
      preferredCategories: updatePreferencesDto.preferredCategories,
      durationPreferences: updatePreferencesDto.durationPreferences,
      notificationsEnabled: updatePreferencesDto.notificationsEnabled,
    });

    if (updateResult.isLeft()) {
      throw updateResult.value;
    }

    response.status(HttpStatus.NO_CONTENT).send();
  }

  @Get('me')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get user info' })
  @ApiOkResponse({
    description: 'User info retrieved successfully',
    type: UserResponseDto,
  })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @UseGuards(JwtAuthGuard)
  @AuthorizeUserSelf(Action.READ)
  async getMe(@CurrentUser('sub') userId: string): Promise<UserResponseDto> {
    const userResult = await this.usersService.getUserById(userId);

    if (userResult.isLeft()) {
      throw userResult.value;
    }

    const userPreferencesResult = await this.usersService.getUserPreferences(userId);

    if (userPreferencesResult.isLeft()) {
      throw userPreferencesResult.value;
    }

    const user = userResult.value;
    const preferences = userPreferencesResult.value;

    const userResponse: UserResponseDto = {
      id: user.id.value,
      fullName: user.fullName,
      username: user.username,
      mobilePhone: user.mobilePhone,
      city: user.city,
      countryCode: user.countryCode,
      preferences: {
        preferredSDGs: preferences.preferredSDGs,
        preferredCategories: preferences.preferredCategories,
        durationPreferences: preferences.durationPreferences,
        notificationsEnabled: preferences.notificationsEnabled,
      },
    };

    return userResponse;
  }
}
