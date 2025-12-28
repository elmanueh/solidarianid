import {
  PASSWORD_MIN_LENGTH,
  PASSWORD_COMPLEXITY_REGEX,
} from '@app/value-objects/constants/validation.constants';
import {
  IsNotEmpty,
  IsEmail,
  IsString,
  MinLength,
  Matches,
} from 'class-validator';

export class AdminLoginRequestDto {
  @IsNotEmpty({ message: 'El correo electrónico es obligatorio' })
  @IsEmail({}, { message: 'Introduce un correo electrónico válido' })
  email: string;

  @IsNotEmpty({ message: 'La contraseña es obligatoria' })
  @IsString({ message: 'La contraseña debe ser un texto' })
  @MinLength(PASSWORD_MIN_LENGTH, {
    message: `La contraseña debe tener al menos ${PASSWORD_MIN_LENGTH} caracteres`,
  })
  @Matches(PASSWORD_COMPLEXITY_REGEX, {
    message:
      'La contraseña debe contener al menos una mayúscula, un número y un carácter especial',
  })
  password: string;
}
