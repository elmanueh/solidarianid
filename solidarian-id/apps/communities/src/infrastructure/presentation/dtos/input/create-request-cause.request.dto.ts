import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsArray,
  IsEnum,
  IsDateString,
  Min,
  ArrayMinSize,
  MaxLength,
  MinLength,
  IsInt,
} from 'class-validator';
import { SustainableDevelopmentGoal } from '@app/value-objects/model/ods';
import {
  NAME_MIN_LENGTH,
  NAME_MAX_LENGTH,
  DESCRIPTION_MIN_LENGTH,
  DESCRIPTION_MAX_LENGTH,
} from '@app/value-objects/constants/validation.constants';

/**
 * DTO for creating a new charitable cause request.
 * Causes must be validated by administrators and must be related to one or more SDGs.
 */
export class CreateCauseRequestDto {
  @ApiProperty({
    description: 'The name of the charitable cause',
    example: 'Ayuda alimentaria para familias vulnerables',
    minLength: NAME_MIN_LENGTH,
    maxLength: NAME_MAX_LENGTH,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(NAME_MIN_LENGTH)
  @MaxLength(NAME_MAX_LENGTH)
  name: string;

  @ApiProperty({
    description: 'Detailed description of the charitable cause',
    example:
      'Campaña para recolectar alimentos no perecederos y distribuirlos entre familias en situación de vulnerabilidad social.',
    minLength: DESCRIPTION_MIN_LENGTH,
    maxLength: DESCRIPTION_MAX_LENGTH,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(DESCRIPTION_MIN_LENGTH)
  @MaxLength(DESCRIPTION_MAX_LENGTH)
  description: string;

  @ApiProperty({
    description:
      'Sustainable Development Goals (SDGs) related to this cause. Must include at least one SDG.',
    example: [SustainableDevelopmentGoal.GenderEquality],
    isArray: true,
    enum: SustainableDevelopmentGoal,
    minItems: 1,
  })
  @IsArray()
  @ArrayMinSize(1)
  @IsEnum(SustainableDevelopmentGoal, { each: true })
  ods: SustainableDevelopmentGoal[];

  @ApiProperty({
    description: 'Initial date when the cause starts (ISO 8601 format)',
    example: '2026-01-15T00:00:00.000Z',
    type: String,
    format: 'date-time',
  })
  @IsNotEmpty()
  @IsDateString()
  initialDate: string;

  @ApiProperty({
    description: 'Duration of the cause in days (must be a positive integer)',
    example: 90,
    minimum: 1,
  })
  @IsInt()
  @Min(1)
  durationDays: number;

  @ApiProperty({
    description: 'The ID of the user creating the request',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @IsString()
  @IsNotEmpty()
  userId: string;
}
