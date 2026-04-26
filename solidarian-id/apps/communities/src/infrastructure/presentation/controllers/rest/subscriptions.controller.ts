import { SubscriptionsService } from '@app/communities/domain/services/subscriptions.service';
import { PushSubscriptionRequestDto } from '@app/communities/infrastructure/presentation/dtos/input/push-subscription.request.dto';
import { PushSubscriptionCreatedResponseDto } from '@app/communities/infrastructure/presentation/dtos/output/push-subscription-created.response.dto';
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
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CurrentUser, JwtAuthGuard } from '@solidarianid/security/nestjs';
import { SubscriptionsCriteriaRequestDto } from '../../dtos/input/subscriptions-criteria.request.dto';
import { UserSubscriptionsResponseDto } from '../../dtos/output/user-subscriptions.response.dto';
import { SubscriptionDomainMapper } from '../../mappers/subscription.mapper';

@Controller('subscriptions')
@ApiTags('Subscriptions')
export class SubscriptionsController {
  constructor(private readonly subscriptionsService: SubscriptionsService) {}

  @Get(':userId')
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
    @Param('userId', new ParseUUIDPipe()) userId: string,
    @Query() criteria: SubscriptionsCriteriaRequestDto,
  ): Promise<UserSubscriptionsResponseDto> {
    const subscriptionsOrError = await this.subscriptionsService.getUserSubscriptions(userId, criteria);

    if (subscriptionsOrError.isLeft()) {
      throw subscriptionsOrError.value;
    }

    return subscriptionsOrError.value;
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  async pushSubscription(
    @CurrentUser('sub') userId: string,
    @Body() pushSubscriptionRequestDto: PushSubscriptionRequestDto,
  ): Promise<PushSubscriptionCreatedResponseDto> {
    const { endpoint, p256dh, auth } = pushSubscriptionRequestDto;

    const pushSubscription = await this.subscriptionsService.pushSubscription(userId, endpoint, p256dh, auth);

    if (pushSubscription.isLeft()) {
      throw pushSubscription.value;
    }

    return SubscriptionDomainMapper.toSubscriptionDto(pushSubscription.value);
  }

  @Delete(':endpoint')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteSubscription(@Param('endpoint') endpoint: string) {
    const result = await this.subscriptionsService.deleteSubscription(endpoint);

    if (result.isLeft()) {
      throw result.value;
    }

    return undefined;
  }
}
