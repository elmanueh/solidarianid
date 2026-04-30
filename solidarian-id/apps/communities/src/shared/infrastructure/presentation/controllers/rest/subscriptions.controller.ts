import { PushSubscriptionsService } from '@app/communities/shared/domain/services/push-subscriptions.service';
import { PushSubscriptionRequestDto } from '@app/communities/shared/infrastructure/presentation/controllers/rest/dtos/input/push-subscription.request.dto';
import { SubscriptionsCriteriaRequestDto } from '@app/communities/shared/infrastructure/presentation/controllers/rest/dtos/input/subscriptions-criteria.request.dto';
import { PushSubscriptionCreatedResponseDto } from '@app/communities/shared/infrastructure/presentation/controllers/rest/dtos/output/push-subscription-created.response.dto';
import { UserSubscriptionsResponseDto } from '@app/communities/shared/infrastructure/presentation/controllers/rest/dtos/output/user-subscriptions.response.dto';
import { SubscriptionDomainMapper } from '@app/communities/shared/infrastructure/presentation/controllers/rest/mappers/subscription.mapper';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Action, Resource, UsersPolicy } from '@solidarianid/security/core';
import { AuthorizationGuard, Authorize, CurrentUser, JwtAuthGuard } from '@solidarianid/security/nestjs';

const AuthorizeUserSelf = (action: Action) =>
  Authorize({
    action,
    resource: Resource.USER,
    entityId: 'userId',
    policy: UsersPolicy.SELF_ONLY,
  });

@Controller('subscriptions')
@ApiTags('Subscriptions')
export class SubscriptionsController {
  constructor(private readonly pushSubscriptionsService: PushSubscriptionsService) {}

  @Get(':userId')
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
    const subscriptionsOrError = await this.pushSubscriptionsService.getUserSubscriptions(userId, criteria);

    if (subscriptionsOrError.isLeft()) {
      throw subscriptionsOrError.value;
    }

    return subscriptionsOrError.value;
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Registrar una push subscription del usuario autenticado' })
  @ApiCreatedResponse({
    description: 'Suscripción push registrada correctamente',
    type: PushSubscriptionCreatedResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'El cuerpo de la petición es inválido o faltan campos requeridos',
  })
  @ApiInternalServerErrorResponse({
    description: 'Error interno del servidor',
  })
  async pushSubscription(
    @CurrentUser('sub') userId: string,
    @Body() pushSubscriptionRequestDto: PushSubscriptionRequestDto,
  ): Promise<PushSubscriptionCreatedResponseDto> {
    const { endpoint, p256dh, auth } = pushSubscriptionRequestDto;

    const pushSubscription = await this.pushSubscriptionsService.pushSubscription(userId, endpoint, p256dh, auth);

    if (pushSubscription.isLeft()) {
      throw pushSubscription.value;
    }
    return SubscriptionDomainMapper.toSubscriptionDto(pushSubscription.value);
  }

  @Delete(':endpoint')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Eliminar una push subscription del usuario autenticado' })
  @ApiNoContentResponse({
    description: 'Suscripción push eliminada correctamente',
  })
  @ApiBadRequestResponse({
    description: 'El endpoint proporcionado no es válido',
  })
  @ApiInternalServerErrorResponse({
    description: 'Error interno del servidor',
  })
  async deleteSubscription(@Param('endpoint') endpoint: string, @CurrentUser('sub') userId: string) {
    const result = await this.pushSubscriptionsService.deleteSubscription(endpoint, userId);

    if (result.isLeft()) {
      throw result.value;
    }
    return undefined;
  }
}
