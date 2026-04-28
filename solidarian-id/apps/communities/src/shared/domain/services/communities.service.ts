import { CommunityLastUsersJoinedData } from '@app/communities/communities/application/services/data/community-last-users-joined.data';
import { RankingCommunitiesByUsersData } from '@app/communities/communities/application/services/data/community-ranking.data';
import { ExploreCommunitiesCriteria } from '@app/communities/communities/application/services/data/explore-communities.criteria';
import { ExploreCommunityData } from '@app/communities/communities/application/services/data/explore-community.data';
import { ExplorePaginatedResultData } from '@app/communities/shared/domain/model/pagination/explore-paginated-result.data';
import { Either } from '@app/ddd/either';
import { RepositoryException } from '@app/ddd/repository/exceptions/repository.exception';
import { ValidationError } from '@app/value-objects/errors/validation/validation-error';
import { CommunityRequestEventDto } from '@solidarianid/kafka';
import { Community } from '../model/aggregates/community';

export abstract class CommunitiesService {
  abstract getCommunities(): Promise<Either<ValidationError | RepositoryException, Community[]>>;
  abstract getExploreCommunities(
    criteria: ExploreCommunitiesCriteria,
  ): Promise<Either<ValidationError | RepositoryException, ExplorePaginatedResultData<ExploreCommunityData>>>;
  abstract getCommunityById(id: string, relations?: string[]): Promise<Either<ValidationError, Community>>;
  abstract getCommunitiesByIds(
    ids: string[],
    relations?: string[],
  ): Promise<Either<ValidationError | RepositoryException, Community[]>>;
  abstract getOrderByMostUsers(limit?: number): Promise<Either<ValidationError, RankingCommunitiesByUsersData[]>>;
  abstract getOrderByMostUsers(
    limit?: number,
  ): Promise<Either<ValidationError | RepositoryException, RankingCommunitiesByUsersData[]>>;
  abstract getJoinedUsersLastMonths(
    communityId: string,
    months?: number,
  ): Promise<Either<ValidationError | RepositoryException, CommunityLastUsersJoinedData[]>>;
  abstract create(
    communityDto: CommunityRequestEventDto,
  ): Promise<Either<ValidationError | RepositoryException, Community>>;
  abstract joinCommunity(
    communityId: string,
    userId: string,
  ): Promise<Either<ValidationError | RepositoryException, void>>;
  abstract getUserMemberCommunities(
    userId: string,
  ): Promise<Either<ValidationError | RepositoryException, Community[]>>;
  abstract leaveCommunity(
    communityId: string,
    actorId: string,
  ): Promise<Either<ValidationError | RepositoryException, void>>;
}
