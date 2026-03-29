import { Either } from '@app/ddd/either';
import { ValidationError } from '@app/value-objects/errors/validation/validation-error';
import { Community } from '../model/aggregates/community';
import { CommunityRequestEventDto } from '@solidarianid/kafka';
import { RepositoryException } from '@app/ddd/repository/exceptions/repository.exception';
import { RankingCommunitiesByUsersData } from '@app/communities/application/services/community-ranking.data';
import { CommunityLastUsersJoinedData } from '@app/communities/application/services/community-last-users-joined.data';

export abstract class CommunitiesService {
  abstract getCommunities(): Promise<Either<ValidationError | RepositoryException, Community[]>>;
  abstract getCommunityById(id: string, relations?: string[]): Promise<Either<ValidationError, Community>>;
  abstract getCommunitiesByIds(
    ids: string[],
    relations?: string[],
  ): Promise<Either<ValidationError | RepositoryException, Community[]>>;
  abstract getOrderByMostUsers(limit?: number): Promise<Either<ValidationError, RankingCommunitiesByUsersData[]>>;
  abstract getJoinedUsersLastMonths(
    communityId: string,
    months?: number,
  ): Promise<Either<ValidationError, CommunityLastUsersJoinedData[]>>;
  abstract create(
    communityDto: CommunityRequestEventDto,
  ): Promise<Either<ValidationError | RepositoryException, Community>>;
  abstract joinCommunity(
    communityId: string,
    userId: string,
  ): Promise<Either<ValidationError | RepositoryException, void>>;
}
