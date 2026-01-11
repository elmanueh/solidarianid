import { ApiProperty } from '@nestjs/swagger';
import { EventSummaryResponseDto } from './event-summary.response.dto';
import { ObjetiveSummaryResponseDto } from './objetive-summary.response.dto';

export class ActionDetailResponseDto {
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

  @ApiProperty({
    description: 'List of events associated with this action',
    type: [EventSummaryResponseDto],
  })
  events: EventSummaryResponseDto[];

  @ApiProperty({
    description: 'List of objectives for this action',
    type: [ObjetiveSummaryResponseDto],
  })
  objectives: ObjetiveSummaryResponseDto[];
}
