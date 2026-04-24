import { Either } from '@app/ddd/either';
import { ExploreCommunitiesCriteria } from '@app/communities/application/services/explore-communities.criteria';
import { ExploreCommunityData } from '@app/communities/application/services/explore-community.data';
import { ExplorePaginatedResultData } from '@app/communities/application/services/explore-paginated-result.data';
import { RepositoryException } from '@app/ddd/repository/exceptions/repository.exception';
import { RankingCommunitiesByUsersData } from '@app/communities/application/services/community-ranking.data';
import { CommunityLastUsersJoinedData } from '@app/communities/application/services/community-last-users-joined.data';

export abstract class CommunitiesQueryRepositoryPort {
  abstract findExplore(
    criteria: ExploreCommunitiesCriteria,
  ): Promise<Either<RepositoryException, ExplorePaginatedResultData<ExploreCommunityData>>>;
  abstract findOrderByMostUsers(limit?: number): Promise<Either<RepositoryException, RankingCommunitiesByUsersData[]>>;
  abstract findJoinedUsersLastMonths(
    communityId: string,
    months?: number,
  ): Promise<Either<RepositoryException, CommunityLastUsersJoinedData[]>>;
}
