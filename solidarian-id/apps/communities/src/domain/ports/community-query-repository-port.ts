import { Either } from '@app/ddd/either';
import { RepositoryException } from '@app/ddd/repository/exceptions/repository.exception';
import { RankingCommunitiesByUsersData } from '@app/communities/application/services/community-ranking.data';
import { CommunityLastUsersJoinedData } from '@app/communities/application/services/community-last-users-joined.data';

export abstract class CommunitiesQueryRepositoryPort {
  abstract findOrderByMostUsers(limit?: number): Promise<Either<RepositoryException, RankingCommunitiesByUsersData[]>>;
  abstract findJoinedUsersLastMonths(
    communityId: string,
    months?: number,
  ): Promise<Either<RepositoryException, CommunityLastUsersJoinedData[]>>;
}
