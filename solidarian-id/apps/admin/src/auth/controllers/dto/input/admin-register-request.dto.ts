import {
  IsNotEmpty,
  IsString,
  IsEmail,
  MinLength,
  MaxLength,
  Matches,
} from 'class-validator';

export class AdminRegisterRequestDto {
  @IsNotEmpty({ message: 'El nombre completo es obligatorio' })
  @IsString({ message: 'El nombre completo debe ser un texto' })
  @MinLength(3, {
    message: 'El nombre completo debe tener al menos 3 caracteres',
  })
  @MaxLength(50, {
    message: 'El nombre completo no puede exceder 50 caracteres',
  })
  @Matches(/^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑàèìòùÀÈÌÒÙçÇ\s]+$/, {
    message:
      'El nombre completo solo puede contener letras y espacios. No se permiten números ni signos.',
  })
  fullName: string;

  @IsNotEmpty({ message: 'El correo electrónico es obligatorio' })
  @IsEmail({}, { message: 'Introduce un correo electrónico válido' })
  email: string;

  @IsNotEmpty({ message: 'El teléfono es obligatorio' })
  @IsString({ message: 'El teléfono debe ser un texto' })
  @Matches(/^\+\d{1,3}\d{9}$/, {
    message: 'Introduce un número en formato internacional (ej: +34612345678)',
  })
  phone: string;

  @IsNotEmpty({ message: 'La contraseña es obligatoria' })
  @IsString({ message: 'La contraseña debe ser un texto' })
  @MinLength(12, {
    message: 'La contraseña debe tener al menos 12 caracteres',
  })
  @Matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{12,}$/, {
    message:
      'La contraseña debe tener al menos 12 caracteres, una mayúscula, un número y un carácter especial',
  })
  password: string;
}
