import {
  CITY_MAX_LENGTH,
  CITY_MIN_LENGTH,
  MOBILE_PHONE_MAX_LENGTH,
  MOBILE_PHONE_REGEX,
  USERNAME_MAX_LENGTH,
  USERNAME_MIN_LENGTH,
  FULLNAME_MIN_LENGTH,
  FULLNAME_MAX_LENGTH,
} from '@app/value-objects/constants/validation.constants';
import { ApiProperty } from '@nestjs/swagger';
import { IsISO31661Alpha2, IsOptional, IsString, Length, Matches, MaxLength } from 'class-validator';

export class UpdateUserProfileDtoRequest {
  @ApiProperty({
    description: 'Full name of the user',
    example: 'Juan García López',
    minLength: FULLNAME_MIN_LENGTH,
    maxLength: FULLNAME_MAX_LENGTH,
    required: false,
  })
  @IsOptional()
  @IsString()
  @Length(FULLNAME_MIN_LENGTH, FULLNAME_MAX_LENGTH)
  fullName?: string;

  @ApiProperty({
    description: 'Username for the new user´containing only alphanumeric characters',
    example: 'johnDoe',
    minLength: USERNAME_MIN_LENGTH,
    maxLength: USERNAME_MAX_LENGTH,
    required: false,
  })
  @IsOptional()
  @IsString()
  @Length(USERNAME_MIN_LENGTH, USERNAME_MAX_LENGTH)
  username?: string;

  @ApiProperty({
    description: 'Mobile phone number of the user in E.164 format',
    example: '+34612345678',
    required: false,
  })
  @IsOptional()
  @IsString()
  @MaxLength(MOBILE_PHONE_MAX_LENGTH)
  @Matches(MOBILE_PHONE_REGEX, {
    message: 'Introduce un número en formato internacional (ej: +34612345678)',
  })
  mobilePhone?: string;

  @ApiProperty({
    description: 'City where the user resides',
    example: 'Madrid',
    minLength: CITY_MIN_LENGTH,
    maxLength: CITY_MAX_LENGTH,
    required: false,
  })
  @IsString()
  @IsOptional()
  @Length(CITY_MIN_LENGTH, CITY_MAX_LENGTH)
  city?: string;

  @ApiProperty({
    description: 'ISO 3166-1 alpha-2 country code',
    example: 'ES',
    required: false,
  })
  @IsISO31661Alpha2()
  @IsOptional()
  countryCode?: string;
}
