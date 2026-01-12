import {
  PASSWORD_MIN_LENGTH,
  USERNAME_MAX_LENGTH,
  USERNAME_MIN_LENGTH,
} from '@app/value-objects/constants/validation.constants';
import { IsString, IsNotEmpty, MinLength, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDtoRequest {
  @ApiProperty({
    description: 'Username for the user´containing only alphanumeric characters',
    example: 'johnDoe',
    minLength: USERNAME_MIN_LENGTH,
    maxLength: USERNAME_MAX_LENGTH,
  })
  @IsString()
  @IsNotEmpty()
  @Length(USERNAME_MIN_LENGTH, USERNAME_MAX_LENGTH)
  username: string;

  @ApiProperty({
    description: 'Password for the user account with at least a symbol, a number, and an uppercase letter',
    example: 'SecureP@ssw0rd',
    minLength: PASSWORD_MIN_LENGTH,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(PASSWORD_MIN_LENGTH)
  password: string;
}
