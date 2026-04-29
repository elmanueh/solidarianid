import { CommunityLastUsersJoinedData } from '@app/communities/communities/application/services/data/community-last-users-joined.data';
import { RankingCommunitiesByUsersData } from '@app/communities/communities/application/services/data/community-ranking.data';
import { ExploreCommunitiesCriteria } from '@app/communities/communities/application/services/data/explore-communities.criteria';
import { ExploreCommunityData } from '@app/communities/communities/application/services/data/explore-community.data';
import { ExplorePaginatedResultData } from '@app/communities/shared/domain/model/pagination/explore-paginated-result.data';
import { Either } from '@app/ddd/either';
import { RepositoryException } from '@app/ddd/repository/exceptions/repository.exception';

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
