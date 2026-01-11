import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Either, left, right } from '@app/ddd/either';
import { RepositoryException } from '@app/ddd/repository/exceptions/repository.exception';
import { CommunitiesApiPort } from '../../domain/ports/output/communities.api.port';
import { CommunityRankingUserResponseDto } from './dtos/community-ranking-user.response.dto';
import { CommunityLastUsersJoinedSummaryResponseDto } from './dtos/community-last-users-joined-summary.response.dto';

@Injectable()
export class CommunitiesApiServiceImpl extends CommunitiesApiPort {
  private readonly communitiesApiUrl: string;

  constructor(private readonly configService: ConfigService) {
    super();
    const url = this.configService.get<string>('API_BASE_COMMUNITIES_INTERNAL_URL');
    this.communitiesApiUrl = url ? `${url}api/communities` : 'http://localhost:3002/api/communities';
  }

  async getCommunitiesOrderByMostUsers(
    limit?: number,
  ): Promise<Either<RepositoryException, CommunityRankingUserResponseDto[]>> {
    try {
      const url = new URL(`${this.communitiesApiUrl}/ranking/most-users`);
      if (limit) {
        url.searchParams.append('limit', limit.toString());
      }

      const response = await fetch(url.toString(), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        signal: AbortSignal.timeout(5000),
      });

      if (!response.ok) {
        return left(
          new RepositoryException(
            `Failed to retrieve communities from microservice: ${response.statusText}`,
            new Error(`HTTP ${response.status}`),
          ),
        );
      }

      const data = (await response.json()) as CommunityRankingUserResponseDto[];
      return right(data);
    } catch (error) {
      return left(new RepositoryException('Failed to communicate with Communities microservice', error as Error));
    }
  }

  async getJoinedUsersLastMonths(
    communityId: string,
    months?: number,
  ): Promise<Either<RepositoryException, CommunityLastUsersJoinedSummaryResponseDto>> {
    try {
      const url = new URL(`${this.communitiesApiUrl}/${communityId}/users-joined`);
      if (months) {
        url.searchParams.append('months', months.toString());
      }

      const response = await fetch(url.toString(), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        signal: AbortSignal.timeout(5000),
      });

      if (!response.ok) {
        return left(
          new RepositoryException(
            `Failed to retrieve joined users from microservice: ${response.statusText}`,
            new Error(`HTTP ${response.status}`),
          ),
        );
      }

      const data = (await response.json()) as CommunityLastUsersJoinedSummaryResponseDto;
      return right(data);
    } catch (error) {
      return left(new RepositoryException('Failed to communicate with Communities microservice', error as Error));
    }
  }
}
