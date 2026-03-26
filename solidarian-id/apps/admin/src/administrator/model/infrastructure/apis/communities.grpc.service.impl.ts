import { Either, left, right } from '@app/ddd/either';
import { RepositoryException } from '@app/ddd/repository/exceptions/repository.exception';
import { ValidationError } from '@app/value-objects/errors/validation/validation-error';
import { Inject, Injectable } from '@nestjs/common';
import type { ClientGrpc } from '@nestjs/microservices';
import {
  COMMUNITIES_SERVICE_NAME,
  CommunitiesServiceClient,
  CommunityCriteria,
  SOLIDARIANID_GRPC_COMMUNITIES_V1_PACKAGE_NAME,
} from '@solidarianid/grpc';
import { firstValueFrom, timeout } from 'rxjs';
import { CommunitiesApiPort } from '../../domain/ports/output/communities.api.port';
import { CommunityLastUsersJoinedSummaryResponseDto } from './dtos/community-last-users-joined-summary.response.dto';
import { CommunityRankingUserResponseDto } from './dtos/community-ranking-user.response.dto';

@Injectable()
export class CommunitiesApiGrpcServiceImpl extends CommunitiesApiPort {
  private readonly communitiesServiceClient: CommunitiesServiceClient;

  constructor(@Inject(SOLIDARIANID_GRPC_COMMUNITIES_V1_PACKAGE_NAME) private readonly communitiesClient: ClientGrpc) {
    super();
    this.communitiesServiceClient =
      this.communitiesClient.getService<CommunitiesServiceClient>(COMMUNITIES_SERVICE_NAME);
  }

  async getCommunitiesOrderByMostUsers(
    limit?: number,
  ): Promise<Either<RepositoryException, CommunityRankingUserResponseDto[]>> {
    try {
      const response = await firstValueFrom(
        this.communitiesServiceClient
          .getCommunities({
            criteria: CommunityCriteria.COMMUNITY_CRITERIA_MOST_USERS,
            ...(limit !== undefined ? { limit } : {}),
          })
          .pipe(timeout(5000)),
      );

      if (response.result?.$case !== 'ranking') {
        return left(
          new RepositoryException(
            'Unexpected response from Communities gRPC service: ranking payload was not returned',
          ),
        );
      }

      const ranking: CommunityRankingUserResponseDto[] = response.result.ranking.items.map(item => ({
        id: item.id,
        name: item.name,
        userCount: item.userCount,
      }));

      return right(ranking);
    } catch (error) {
      return left(new RepositoryException('Failed to communicate with Communities gRPC service', error as Error));
    }
  }

  async getJoinedUsersLastMonths(
    communityId: string,
    months?: number,
  ): Promise<Either<ValidationError, CommunityLastUsersJoinedSummaryResponseDto>> {
    try {
      const response = await firstValueFrom(
        this.communitiesServiceClient
          .getCommunityUsers({
            communityId,
            ...(months !== undefined ? { months } : {}),
          })
          .pipe(timeout(5000)),
      );

      const summary: CommunityLastUsersJoinedSummaryResponseDto = {
        communityName: response.communityName,
        dataRange: response.dataRange.map(period => ({
          month: period.month,
          userCount: period.userCount,
        })),
      };

      return right(summary);
    } catch {
      return left(new ValidationError('Failed to communicate with Communities gRPC service'));
    }
  }
}
