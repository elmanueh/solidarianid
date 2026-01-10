import { ApiProperty } from '@nestjs/swagger';

export class CommunityRankingUserResponseDto {
  @ApiProperty({
    description: 'Community unique identifier',
    example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
  })
  id: string;

  @ApiProperty({
    description: 'Community name',
    example: 'Friends for Africa',
  })
  name: string;

  @ApiProperty({
    description: 'Number of users in the community',
    example: 150,
  })
  userCount: number;
}
