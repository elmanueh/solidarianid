import { RequestStatus } from '@app/communities/shared/domain/model/enums/request-status';
import { RequestType } from '@app/communities/shared/domain/model/enums/request-type';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsBoolean, IsEnum, IsOptional } from 'class-validator';

const parseBoolean = ({ value }: { value: unknown }): unknown => {
  if (value === 'true') return true;
  if (value === 'false') return false;
  return value;
};

export class SubscriptionsCriteriaRequestDto {
  @ApiPropertyOptional({
    description: 'Tipo de solicitud a filtrar',
    enum: RequestType,
    example: RequestType.CAUSE,
  })
  @IsOptional()
  @IsEnum(RequestType)
  requestType?: RequestType;

  @ApiPropertyOptional({
    description: 'Estado de solicitud a filtrar. Por defecto se usa pending.',
    enum: RequestStatus,
    example: RequestStatus.PENDING,
  })
  @IsOptional()
  @IsEnum(RequestStatus)
  requestStatus?: RequestStatus;

  @ApiPropertyOptional({
    description: 'Incluye IDs de solicitudes en la respuesta',
    default: true,
  })
  @IsOptional()
  @Transform(parseBoolean)
  @IsBoolean()
  includeRequestIds?: boolean;

  @ApiPropertyOptional({
    description: 'Incluye IDs de causas seguidas en la respuesta',
    default: true,
  })
  @IsOptional()
  @Transform(parseBoolean)
  @IsBoolean()
  includeFollowedCauseIds?: boolean;

  @ApiPropertyOptional({
    description: 'Incluye IDs de comunidades seguidas en la respuesta',
    default: true,
  })
  @IsOptional()
  @Transform(parseBoolean)
  @IsBoolean()
  includeFollowedCommunityIds?: boolean;

  @ApiPropertyOptional({
    description: 'Incluye IDs de eventos a los que se ha unido el usuario',
    default: true,
  })
  @IsOptional()
  @Transform(parseBoolean)
  @IsBoolean()
  includeEventIds?: boolean;

  @ApiPropertyOptional({
    description: 'Incluye IDs de objetivos a los que contribuye el usuario',
    default: true,
  })
  @IsOptional()
  @Transform(parseBoolean)
  @IsBoolean()
  includeObjectiveIds?: boolean;
}
