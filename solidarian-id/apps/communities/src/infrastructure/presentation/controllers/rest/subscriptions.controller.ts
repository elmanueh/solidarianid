import { SubscriptionsService } from '@app/communities/domain/services/subscriptions.service';
import { Controller, Get, Param, ParseUUIDPipe, Query } from '@nestjs/common';
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

@Controller()
@ApiTags('Subscriptions')
export class SubscriptionsController {
  constructor(private readonly subscriptionsService: SubscriptionsService) {}

  @Get('subscriptions/:userId')
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
}
