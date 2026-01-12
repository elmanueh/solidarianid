import { ApiProperty } from '@nestjs/swagger';

export class ActionSummaryResponseDto {
  @ApiProperty({
    description: 'Action unique identifier',
    example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
  })
  id: string;

  @ApiProperty({
    description: 'Action name',
    example: 'Food Collection Drive',
  })
  name: string;

  @ApiProperty({
    description: 'Action description',
    example: 'Collecting food donations for local families in need',
  })
  description: string;
}
