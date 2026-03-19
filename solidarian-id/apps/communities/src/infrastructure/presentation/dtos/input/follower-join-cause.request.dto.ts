import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class FollowerJoinCauseRequestDto {
  @IsUUID()
  @ApiProperty({
    description: 'Unique identifier of the user following the cause',
    example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
  })
  userId: string;
}
