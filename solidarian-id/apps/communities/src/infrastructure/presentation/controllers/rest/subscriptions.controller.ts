import { SubscriptionsService } from '@app/communities/domain/services/subscriptions.service';
import { Controller, Get, Param, ParseUUIDPipe, Query, UseGuards } from '@nestjs/common';
import { Action, Resource, UsersPolicy } from '@solidarianid/security/core';
import { AuthorizationGuard, Authorize, JwtAuthGuard } from '@solidarianid/security/nestjs';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { SubscriptionsCriteriaRequestDto } from '../../dtos/input/subscriptions-criteria.request.dto';
import { UserSubscriptionsResponseDto } from '../../dtos/output/user-subscriptions.response.dto';

const AuthorizeUserSelf = (action: Action) =>
  Authorize({
    action,
    resource: Resource.USER,
    entityId: 'userId',
    policy: UsersPolicy.SELF_ONLY,
  });

@Controller()
@ApiTags('Subscriptions')
export class SubscriptionsController {
  constructor(private readonly subscriptionsService: SubscriptionsService) {}

  @Get('subscriptions/:userId')
  @UseGuards(JwtAuthGuard, AuthorizationGuard)
  @AuthorizeUserSelf(Action.READ)
  @ApiOperation({ summary: 'Obtener las suscripciones de un usuario' })
  @ApiOkResponse({
    description: 'Suscripciones del usuario obtenidas exitosamente',
    type: UserSubscriptionsResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'El ID de usuario proporcionado es inválido',
  })
  @ApiNotFoundResponse({
    description: 'Usuario no encontrado',
  })
  @ApiInternalServerErrorResponse({
    description: 'Error interno del servidor',
  })
  async getUserSubscriptions(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Query() criteria: SubscriptionsCriteriaRequestDto,
  ): Promise<UserSubscriptionsResponseDto> {
    const subscriptionsOrError = await this.subscriptionsService.getUserSubscriptions(userId, criteria);

    if (subscriptionsOrError.isLeft()) {
      throw subscriptionsOrError.value;
    }

    return subscriptionsOrError.value;
  }
}
