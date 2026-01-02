import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsArray,
  IsNumber,
  Min,
  ArrayMinSize,
  MaxLength,
  MinLength,
  ValidateNested,
  IsDateString,
  Matches,
  Length,
} from 'class-validator';
import { Type } from 'class-transformer';
import {
  NAME_MIN_LENGTH,
  NAME_MAX_LENGTH,
  DESCRIPTION_MIN_LENGTH,
  DESCRIPTION_MAX_LENGTH,
  CITY_MIN_LENGTH,
  CITY_MAX_LENGTH,
  COUNTRY_CODE_REGEX,
  COUNTRY_CODE_LENGTH,
} from '@app/value-objects/constants/validation.constants';

/**
 * DTO for defining a quantifiable objective within an action
 */
export class ActionObjectiveDto {
  @ApiProperty({
    description: 'Name of the objective',
    example: 'Recolección de alimentos',
    minLength: NAME_MIN_LENGTH,
    maxLength: NAME_MAX_LENGTH,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(NAME_MIN_LENGTH)
  @MaxLength(NAME_MAX_LENGTH)
  name: string;

  @ApiProperty({
    description: 'Description of the objective',
    example: 'Recolectar alimentos no perecederos para familias necesitadas',
    minLength: DESCRIPTION_MIN_LENGTH,
    maxLength: DESCRIPTION_MAX_LENGTH,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(DESCRIPTION_MIN_LENGTH)
  @MaxLength(DESCRIPTION_MAX_LENGTH)
  description: string;

  @ApiProperty({
    description: 'Quantifiable target amount (must be greater than 0)',
    example: 500,
    minimum: 1,
  })
  @IsNumber()
  @Min(1)
  quantity: number;

  @ApiProperty({
    description: 'Unit of measurement for the objective',
    example: 'kilogramos',
  })
  @IsString()
  @IsNotEmpty()
  unit: string;
}

/**
 * DTO for defining the physical location of an event
 */
export class EventPlaceDto {
  @ApiProperty({
    description: 'Street address or directions to the event',
    example: 'Calle Mayor 123',
  })
  @IsString()
  @IsNotEmpty()
  direction: string;

  @ApiProperty({
    description: 'City where the event takes place',
    example: 'Madrid',
    minLength: CITY_MIN_LENGTH,
    maxLength: CITY_MAX_LENGTH,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(CITY_MIN_LENGTH)
  @MaxLength(CITY_MAX_LENGTH)
  city: string;

  @ApiProperty({
    description: 'Country code (ISO 3166-1 alpha-2)',
    example: 'ES',
    minLength: COUNTRY_CODE_LENGTH,
    maxLength: COUNTRY_CODE_LENGTH,
    pattern: COUNTRY_CODE_REGEX.source,
  })
  @IsString()
  @IsNotEmpty()
  @Length(COUNTRY_CODE_LENGTH, COUNTRY_CODE_LENGTH)
  @Matches(COUNTRY_CODE_REGEX, {
    message:
      'Country code must be a valid ISO 3166-1 alpha-2 code (e.g., ES, US)',
  })
  countryCode: string;
}

/**
 * DTO for defining an in-person event within an action
 */
export class ActionEventDto {
  @ApiProperty({
    description: 'Name of the event',
    example: 'Jornada de recolección de alimentos',
    minLength: NAME_MIN_LENGTH,
    maxLength: NAME_MAX_LENGTH,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(NAME_MIN_LENGTH)
  @MaxLength(NAME_MAX_LENGTH)
  name: string;

  @ApiProperty({
    description: 'Description of the event',
    example:
      'Evento público para recolectar donaciones de alimentos no perecederos',
    minLength: DESCRIPTION_MIN_LENGTH,
    maxLength: DESCRIPTION_MAX_LENGTH,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(DESCRIPTION_MIN_LENGTH)
  @MaxLength(DESCRIPTION_MAX_LENGTH)
  description: string;

  @ApiProperty({
    description: 'Date and time when the event starts (ISO 8601 format)',
    example: '2026-01-20T10:00:00.000Z',
    type: String,
    format: 'date-time',
  })
  @IsNotEmpty()
  @IsDateString()
  initialDate: string;

  @ApiProperty({
    description: 'Physical location where the event will take place',
    type: EventPlaceDto,
  })
  @ValidateNested()
  @Type(() => EventPlaceDto)
  place: EventPlaceDto;
}

/**
 * DTO for creating a new charitable action request.
 * Actions are concrete projects within a cause with quantifiable objectives and events.
 */
export class CreateActionRequestDto {
  @ApiProperty({
    description: 'The name of the charitable action',
    example: 'Campaña de alimentos enero 2026',
    minLength: NAME_MIN_LENGTH,
    maxLength: NAME_MAX_LENGTH,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(NAME_MIN_LENGTH)
  @MaxLength(NAME_MAX_LENGTH)
  name: string;

  @ApiProperty({
    description: 'Detailed description of the charitable action',
    example:
      'Acción concreta para recolectar y distribuir alimentos durante el mes de enero.',
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
      'Quantifiable objectives for this action. Must include at least one objective.',
    type: [ActionObjectiveDto],
    minItems: 1,
  })
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => ActionObjectiveDto)
  objectives: ActionObjectiveDto[];

  @ApiProperty({
    description:
      'In-person events associated with this action. Must include at least one event.',
    type: [ActionEventDto],
    minItems: 1,
  })
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => ActionEventDto)
  events: ActionEventDto[];

  @ApiProperty({
    description: 'The ID of the user creating the request',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @IsString()
  @IsNotEmpty()
  userId: string;
}
