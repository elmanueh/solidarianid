import {
  CITY_MAX_LENGTH,
  CITY_MIN_LENGTH,
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
} from 'class-validator';

export class RegisterUserDtoRequest {
  @IsString()
  @IsNotEmpty()
  @Length(USERNAME_MIN_LENGTH, USERNAME_MAX_LENGTH)
  username: string;

  @IsString()
  @IsNotEmpty()
  mobilePhone: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(PASSWORD_MIN_LENGTH)
  password: string;

  @IsString()
  @IsNotEmpty()
  @Length(CITY_MIN_LENGTH, CITY_MAX_LENGTH)
  city: string;

  @IsISO31661Alpha2()
  countryCode: string;
}
