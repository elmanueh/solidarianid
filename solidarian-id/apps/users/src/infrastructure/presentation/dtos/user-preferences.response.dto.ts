import { SustainableDevelopmentGoal } from '@app/value-objects/model/ods';
import { CauseCategory, DurationPreference } from '@app/value-objects/model/user-preferences';
import { ApiProperty } from '@nestjs/swagger';

/**
 * DTO de respuesta para las preferencias del usuario
 */
export class UserPreferencesResponseDto {
  @ApiProperty({
    description: 'SDGs (Objetivos de Desarrollo Sostenible) preferidos por el usuario',
    example: [1, 2, 4, 10],
    enum: SustainableDevelopmentGoal,
    isArray: true,
  })
  preferredSDGs: SustainableDevelopmentGoal[];

  @ApiProperty({
    description: 'Categorías temáticas de causas que interesan al usuario',
    example: ['pobreza', 'educación', 'salud'],
    enum: CauseCategory,
    isArray: true,
  })
  preferredCategories: CauseCategory[];

  @ApiProperty({
    description: 'Preferencias de duración de actividades y proyectos',
    example: ['short_term', 'medium_term'],
    enum: DurationPreference,
    isArray: true,
  })
  durationPreferences: DurationPreference[];

  @ApiProperty({
    description: 'Indica si el usuario desea recibir notificaciones sobre nuevas causas',
    example: true,
  })
  notificationsEnabled: boolean;
}
