import {
  IsString,
  IsNotEmpty,
  MinLength,
  Length,
  IsISO31661Alpha2,
} from 'class-validator';

export class RegisterUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  username: string;

  @IsString()
  @IsNotEmpty()
  mobilePhone: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(12)
  password: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 150)
  city: string;

  @IsISO31661Alpha2()
  countryCode: string;
}
