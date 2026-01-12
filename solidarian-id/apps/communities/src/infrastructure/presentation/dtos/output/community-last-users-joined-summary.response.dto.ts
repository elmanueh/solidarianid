import { ApiProperty } from '@nestjs/swagger';
import { CommunityLastUsersJoinedPeriodResponseDto } from './community-last-users-joined-period.response.dto';

export class CommunityLastUsersJoinedSummaryResponseDto {
  @ApiProperty({
    description: 'Community name',
    example: 'Friends for Africa',
  })
  communityName: string;

  @ApiProperty({
    description: 'Data range showing users joined per period',
    type: [CommunityLastUsersJoinedPeriodResponseDto],
  })
  dataRange: CommunityLastUsersJoinedPeriodResponseDto[];
}
