import { SustainableDevelopmentGoal } from '@app/value-objects/model/ods';
import { CauseCategory, DurationPreference } from '@app/value-objects/model/user-preferences';
import { ApiProperty } from '@nestjs/swagger';
import { ArrayMaxSize, ArrayMinSize, IsArray, IsBoolean, IsEnum, IsOptional } from 'class-validator';

export class UpdateUserPreferencesRequestDto {
  @ApiProperty({
    description: 'SDGs (Objetivos de Desarrollo Sostenible) preferidos por el usuario',
    example: [1, 2, 4, 10],
    enum: SustainableDevelopmentGoal,
    isArray: true,
    required: false,
    maxItems: 17,
  })
  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(17)
  @IsEnum(SustainableDevelopmentGoal, { each: true })
  preferredSDGs?: SustainableDevelopmentGoal[];

  @ApiProperty({
    description: 'Categorías temáticas de causas que interesan al usuario',
    example: [CauseCategory.POVERTY, CauseCategory.EDUCATION, CauseCategory.HUMANITARIAN_AID],
    enum: CauseCategory,
    isArray: true,
    required: false,
    maxItems: 10,
  })
  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(10)
  @IsEnum(CauseCategory, { each: true })
  preferredCategories?: CauseCategory[];

  @ApiProperty({
    description: 'Preferencias de duración de actividades y proyectos',
    example: [DurationPreference.SHORT_TERM, DurationPreference.MEDIUM_TERM],
    enum: DurationPreference,
    isArray: true,
    required: false,
    maxItems: 4,
  })
  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(4)
  @IsEnum(DurationPreference, { each: true })
  durationPreferences?: DurationPreference[];

  @ApiProperty({
    description: 'Indica si el usuario desea recibir notificaciones sobre nuevas causas',
    example: true,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  notificationsEnabled?: boolean;
}
