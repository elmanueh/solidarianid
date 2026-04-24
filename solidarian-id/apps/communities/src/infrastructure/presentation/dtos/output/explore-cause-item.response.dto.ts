import { ApiProperty } from '@nestjs/swagger';

export class ExploreCauseItemResponseDto {
  @ApiProperty({
    description: 'Cause unique identifier',
    example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
  })
  id: string;

  @ApiProperty({
    description: 'Community unique identifier',
    example: '9f1d6f1d-58cc-4372-a567-0e02b2c3d470',
  })
  communityId: string;

  @ApiProperty({
    description: 'Cause name',
    example: 'Clean Water Initiative',
  })
  name: string;

  @ApiProperty({
    description: 'Cause description',
    example: 'Providing access to clean water for rural communities.',
  })
  description: string;

  @ApiProperty({
    description: 'Related UN Sustainable Development Goals (SDGs) numbers',
    example: [6, 14],
    type: [Number],
  })
  ods: number[];
}
