import { CommunityLastUsersJoinedPeriodResponseDto } from './community-last-users-joined-period.response.dto';

export class CommunityLastUsersJoinedSummaryResponseDto {
  communityName: string;
  dataRange: CommunityLastUsersJoinedPeriodResponseDto[];
}
