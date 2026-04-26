import { UserPreferencesResponseDto } from '@app/users/infrastructure/presentation/dtos/user-preferences.response.dto';
import { ApiProperty } from '@nestjs/swagger';

/**
 * DTO de respuesta para la información de un usuario
 */
export class UserResponseDto {
  @ApiProperty({
    description: 'User unique identifier',
    example: 'ef160968-67bb-432d-b833-b4eb29f7d73c',
  })
  id: string;

  @ApiProperty({
    description: 'Full name of the user',
    example: 'John Doe',
  })
  fullName: string;

  @ApiProperty({
    description: 'Username for the user account',
    example: 'johndoe',
  })
  username: string;

  @ApiProperty({
    description: 'Mobile phone number of the user in E.164 format',
    example: '+34612345678',
  })
  mobilePhone: string;

  @ApiProperty({
    description: 'City where the user resides',
    example: 'Madrid',
  })
  city: string;

  @ApiProperty({
    description: 'ISO 3166-1 alpha-2 country code',
    example: 'ES',
  })
  countryCode: string;

  @ApiProperty({
    description: 'User preferences including SDGs and categories',
    type: UserPreferencesResponseDto,
  })
  preferences: UserPreferencesResponseDto;
}
