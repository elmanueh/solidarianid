import { ApiProperty } from '@nestjs/swagger';

export class EventSummaryResponseDto {
  @ApiProperty({
    description: 'Event unique identifier',
    example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
  })
  id: string;

  @ApiProperty({
    description: 'Event name',
    example: 'Community Cleanup Day',
  })
  name: string;

  @ApiProperty({
    description: 'Event description',
    example: 'Join us for a community cleanup to make our neighborhood better',
  })
  description: string;

  @ApiProperty({
    description: 'Event start date and time',
    example: '2026-02-15T10:00:00Z',
  })
  initialDate: Date;

  @ApiProperty({
    description: 'Event location details',
    example: {
      direction: '123 Main Street',
      city: 'Madrid',
      countryCode: 'ES',
    },
  })
  place: {
    direction: string;
    city: string;
    countryCode: string;
  };
}
