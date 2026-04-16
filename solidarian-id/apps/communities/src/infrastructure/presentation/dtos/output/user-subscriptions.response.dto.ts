import { ApiProperty } from '@nestjs/swagger';

export class UserSubscriptionsResponseDto {
  @ApiProperty({
    description: 'Array de IDs de requests pendientes del usuario',
    type: [String],
    example: ['550e8400-e29b-41d4-a716-446655440000', '550e8400-e29b-41d4-a716-446655440001'],
  })
  pendingRequestIds: string[];

  @ApiProperty({
    description: 'Array de IDs de causas que el usuario sigue',
    type: [String],
    example: ['550e8400-e29b-41d4-a716-446655440000', '550e8400-e29b-41d4-a716-446655440001'],
  })
  followedCauseIds: string[];

  @ApiProperty({
    description: 'Array de IDs de comunidades que el usuario sigue',
    type: [String],
    example: ['550e8400-e29b-41d4-a716-446655440000', '550e8400-e29b-41d4-a716-446655440001'],
  })
  followedCommunityIds: string[];
}
