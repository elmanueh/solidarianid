import { RequestStatus } from '@app/communities/domain/model/enums/request-status';
import { CausesRepositoryPort } from '@app/communities/domain/ports/causes.repository.port';
import { CommunitiesRepositoryPort } from '@app/communities/domain/ports/communities.repository.port';
import { RequestsRepositoryPort } from '@app/communities/domain/ports/requests.repository.port';
import { UsersRepositoryPort } from '@app/communities/domain/ports/users.repository.port';
import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { UserSubscriptionsResponseDto } from '../../dtos/output/user-subscriptions.response.dto';

@Controller()
@ApiTags('Subscriptions')
export class SubscriptionsController {
  constructor(
    private readonly requestsRepository: RequestsRepositoryPort,
    private readonly usersRepository: UsersRepositoryPort,
    private readonly communitiesRepository: CommunitiesRepositoryPort,
    private readonly causesRepository: CausesRepositoryPort,
  ) {}

  @Get('users/:userId/subscriptions')
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
  ): Promise<UserSubscriptionsResponseDto> {
    const userOrError = await this.usersRepository.findById(userId);
    if (userOrError.isLeft()) {
      throw userOrError.value;
    }

    const requestsOrError = await this.requestsRepository.findByUserId(userId);
    const pendingRequestIds = requestsOrError.isLeft()
      ? []
      : requestsOrError.value.filter(req => req.status === RequestStatus.PENDING).map(req => req.id.value);

    const causesOrError = await this.causesRepository.findAll(['users']);
    const followedCauseIds = causesOrError.isLeft()
      ? []
      : causesOrError.value.filter(cause => cause.userIds.includes(userId)).map(cause => cause.id.value);

    const communitiesOrError = await this.communitiesRepository.findAll(['members', 'members.user']);
    const followedCommunityIds = communitiesOrError.isLeft()
      ? []
      : communitiesOrError.value
          .filter(community => community.members.some(member => member.id.value === userId))
          .map(community => community.id.value);

    return {
      pendingRequestIds,
      followedCauseIds,
      followedCommunityIds,
    };
  }
}
