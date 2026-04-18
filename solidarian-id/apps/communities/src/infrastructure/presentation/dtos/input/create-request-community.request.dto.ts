import {
  DESCRIPTION_MAX_LENGTH,
  DESCRIPTION_MIN_LENGTH,
  NAME_MAX_LENGTH,
  NAME_MIN_LENGTH,
} from '@app/value-objects/constants/validation.constants';
import { SustainableDevelopmentGoal } from '@app/value-objects/model/ods';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsDateString,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsString,
  MaxLength,
  Min,
  MinLength,
  ValidateNested,
} from 'class-validator';

/**
 * DTO for defining a cause within a community request
 */
export class CommunityCauseDto {
  @ApiProperty({
    description: 'Name of the cause within the community',
    example: 'Ayuda educativa',
    minLength: NAME_MIN_LENGTH,
    maxLength: NAME_MAX_LENGTH,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(NAME_MIN_LENGTH)
  @MaxLength(NAME_MAX_LENGTH)
  name: string;

  @ApiProperty({
    description: 'Description of the cause',
    example: 'Programa de apoyo educativo para niños en situación de vulnerabilidad',
    minLength: DESCRIPTION_MIN_LENGTH,
    maxLength: DESCRIPTION_MAX_LENGTH,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(DESCRIPTION_MIN_LENGTH)
  @MaxLength(DESCRIPTION_MAX_LENGTH)
  description: string;

  @ApiProperty({
    description: 'Sustainable Development Goals (SDGs) related to this cause. Must include at least one SDG.',
    example: [SustainableDevelopmentGoal.ZeroHunger],
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
    example: '2026-02-01T00:00:00.000Z',
    type: String,
    format: 'date-time',
  })
  @IsNotEmpty()
  @IsDateString()
  initialDate: string;

  @ApiProperty({
    description: 'Duration of the cause in days (must be a positive integer)',
    example: 180,
    minimum: 1,
  })
  @IsInt()
  @Min(1)
  durationDays: number;
}

/**
 * DTO for creating a new community request.
 * Communities are groups of users with common interests and can include multiple causes.
 */
export class CreateCommunityRequestDto {
  @ApiProperty({
    description: 'The name of the community',
    example: 'Amigos por África',
    minLength: NAME_MIN_LENGTH,
    maxLength: NAME_MAX_LENGTH,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(NAME_MIN_LENGTH)
  @MaxLength(NAME_MAX_LENGTH)
  name: string;

  @ApiProperty({
    description: 'Detailed description of the community and its purpose',
    example: 'Comunidad dedicada a apoyar proyectos de desarrollo sostenible en países africanos.',
    minLength: DESCRIPTION_MIN_LENGTH,
    maxLength: DESCRIPTION_MAX_LENGTH,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(DESCRIPTION_MIN_LENGTH)
  @MaxLength(DESCRIPTION_MAX_LENGTH)
  description: string;

  @ApiProperty({
    description: 'List of charitable causes associated with this community. Must include at least one cause.',
    type: [CommunityCauseDto],
    minItems: 1,
  })
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => CommunityCauseDto)
  causeCreationRequests: CommunityCauseDto[];
}
