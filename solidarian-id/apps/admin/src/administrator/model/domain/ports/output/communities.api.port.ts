import { Either } from '@app/ddd/either';
import { RepositoryException } from '@app/ddd/repository/exceptions/repository.exception';
import { CommunityRankingUserResponseDto } from '../../../infrastructure/apis/dtos/community-ranking-user.response.dto';
import { ValidationError } from '@app/value-objects/errors/validation/validation-error';
import { CommunityLastUsersJoinedSummaryResponseDto } from '../../../infrastructure/apis/dtos/community-last-users-joined-summary.response.dto';

export abstract class CommunitiesApiPort {
  abstract getCommunitiesOrderByMostUsers(
    limit?: number,
  ): Promise<Either<RepositoryException, CommunityRankingUserResponseDto[]>>;
  abstract getJoinedUsersLastMonths(
    communityId: string,
    months?: number,
  ): Promise<Either<ValidationError, CommunityLastUsersJoinedSummaryResponseDto>>;
}
