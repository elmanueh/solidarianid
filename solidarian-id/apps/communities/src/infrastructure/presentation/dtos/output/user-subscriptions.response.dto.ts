import { ApiProperty } from '@nestjs/swagger';

export class UserSubscriptionsResponseDto {
  @ApiProperty({
    description: 'Array de IDs de solicitudes del usuario según el criterio de búsqueda',
    type: [String],
    example: ['550e8400-e29b-41d4-a716-446655440000', '550e8400-e29b-41d4-a716-446655440001'],
  })
  requestIds!: string[];

  @ApiProperty({
    description: 'Array de IDs de causas que el usuario sigue',
    type: [String],
    example: ['550e8400-e29b-41d4-a716-446655440000', '550e8400-e29b-41d4-a716-446655440001'],
  })
  followedCauseIds!: string[];

  @ApiProperty({
    description: 'Array de IDs de comunidades que el usuario sigue',
    type: [String],
    example: ['550e8400-e29b-41d4-a716-446655440000', '550e8400-e29b-41d4-a716-446655440001'],
  })
  followedCommunityIds!: string[];

  @ApiProperty({
    description: 'Array de IDs de eventos a los que está suscrito el usuario',
    type: [String],
    example: ['550e8400-e29b-41d4-a716-446655440010', '550e8400-e29b-41d4-a716-446655440011'],
  })
  eventIds!: string[];

  @ApiProperty({
    description: 'Array de IDs de objetivos a los que contribuye el usuario (formato actionId:objectiveName)',
    type: [String],
    example: ['550e8400-e29b-41d4-a716-446655440020:Recaudacion inicial'],
  })
  objectiveIds!: string[];
}
