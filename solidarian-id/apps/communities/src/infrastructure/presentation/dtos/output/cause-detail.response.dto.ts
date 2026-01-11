import { ApiProperty } from '@nestjs/swagger';
import { ActionSummaryResponseDto } from './action-summary.response.dto';

export class CauseDetailResponseDto {
  @ApiProperty({
    description: 'Cause unique identifier',
    example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
  })
  id: string;

  @ApiProperty({
    description: 'Cause name',
    example: 'Clean Water Initiative',
  })
  name: string;

  @ApiProperty({
    description: 'Cause description',
    example: 'Providing access to clean water for rural communities',
  })
  description: string;

  @ApiProperty({
    description: 'Duration of the cause in days',
    example: 90,
  })
  durationDays: number;

  @ApiProperty({
    description: 'Related UN Sustainable Development Goals (SDGs) numbers',
    example: [6, 3],
    type: [Number],
  })
  ods: number[];

  @ApiProperty({
    description: 'List of actions associated with this cause',
    type: [ActionSummaryResponseDto],
  })
  actions: ActionSummaryResponseDto[];
}
