import {
  CITY_MAX_LENGTH,
  CITY_MIN_LENGTH,
  MOBILE_PHONE_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
  USERNAME_MAX_LENGTH,
  USERNAME_MIN_LENGTH,
} from '@app/value-objects/constants/validation.constants';
import {
  IsString,
  IsNotEmpty,
  MinLength,
  Length,
  IsISO31661Alpha2,
  MaxLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterUserDtoRequest {
  @ApiProperty({
    description:
      'Username for the new user´containing only alphanumeric characters',
    example: 'johnDoe',
    minLength: USERNAME_MIN_LENGTH,
    maxLength: USERNAME_MAX_LENGTH,
  })
  @IsString()
  @IsNotEmpty()
  @Length(USERNAME_MIN_LENGTH, USERNAME_MAX_LENGTH)
  username: string;

  @ApiProperty({
    description: 'Mobile phone number of the user in E.164 format',
    example: '+34612345678',
  })
  @IsString()
  @MaxLength(MOBILE_PHONE_MAX_LENGTH)
  @IsNotEmpty()
  mobilePhone: string;

  @ApiProperty({
    description:
      'Password for the user account with at least a symbol, a number, and an uppercase letter',
    example: 'SecureP@ssw0rd',
    minLength: PASSWORD_MIN_LENGTH,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(PASSWORD_MIN_LENGTH)
  password: string;

  @ApiProperty({
    description: 'City where the user resides',
    example: 'Madrid',
    minLength: CITY_MIN_LENGTH,
    maxLength: CITY_MAX_LENGTH,
  })
  @IsString()
  @IsNotEmpty()
  @Length(CITY_MIN_LENGTH, CITY_MAX_LENGTH)
  city: string;

  @ApiProperty({
    description: 'ISO 3166-1 alpha-2 country code',
    example: 'ES',
  })
  @IsISO31661Alpha2()
  countryCode: string;
}
