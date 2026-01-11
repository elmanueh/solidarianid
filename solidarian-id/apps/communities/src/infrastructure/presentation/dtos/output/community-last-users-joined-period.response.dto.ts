import { ApiProperty } from '@nestjs/swagger';

export class CommunityLastUsersJoinedPeriodResponseDto {
  @ApiProperty({
    description: 'Month in format YYYY-MM',
    example: '2026-01',
  })
  month: string;

  @ApiProperty({
    description: 'Number of users joined in this month',
    example: 25,
  })
  userCount: number;
}
