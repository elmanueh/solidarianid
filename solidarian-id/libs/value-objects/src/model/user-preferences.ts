import { Either, left, right } from '@app/ddd/either';
import { ValueObject } from '@app/ddd/value-object';
import { ValidationError } from '../errors/validation/validation-error';
import { SustainableDevelopmentGoal } from './ods';

export enum CauseCategory {
  /** Pobreza y exclusión social */
  POVERTY = 'pobreza',

  /** Alimentación y nutrición */
  FOOD = 'alimentación',

  /** Educación y formación */
  EDUCATION = 'educación',

  /** Salud y bienestar */
  HEALTH = 'salud',

  /** Medio ambiente y sostenibilidad */
  ENVIRONMENT = 'medio ambiente',

  /** Agua potable y saneamiento */
  WATER = 'agua potable',

  /** Ayuda humanitaria y emergencias */
  HUMANITARIAN_AID = 'ayuda humanitaria',

  /** Desarrollo comunitario */
  COMMUNITY_DEVELOPMENT = 'desarrollo comunitario',

  /** Derechos humanos */
  HUMAN_RIGHTS = 'derechos humanos',

  /** Infancia y juventud */
  CHILDREN_YOUTH = 'infancia',

  /** Personas mayores / tercera edad */
  ELDERLY = 'tercera edad',

  /** Género e igualdad */
  GENDER_EQUALITY = 'igualdad de género',

  /** Vivienda y hábitat */
  HOUSING = 'vivienda',

  /** Refugiados y migrantes */
  REFUGEES = 'refugiados',

  /** Discapacidad e inclusión */
  DISABILITY = 'discapacidad',

  /** Desarrollo sostenible */
  SUSTAINABLE_DEVELOPMENT = 'desarrollo sostenible',

  /** Empleo y emprendimiento */
  EMPLOYMENT = 'empleo',

  /** Cultura y arte */
  CULTURE = 'cultura',

  /** Tecnología e innovación social */
  TECH_INNOVATION = 'tecnología',
}

export enum DurationPreference {
  // <30 days
  SHORT_TERM = 'short_term',

  // >=60
  MEDIUM_TERM = 'medium_term',

  //>=120 days
  LONG_TERM = 'long_term',

  ANY = 'any',
}

/**
 * Props para crear UserPreferences
 */
export interface UserPreferencesProps {
  preferredSDGs: SustainableDevelopmentGoal[];

  preferredCategories: CauseCategory[];

  durationPreferences: DurationPreference[];

  notificationsEnabled: boolean;
}

/**
 * Value Object que representa las preferencias de un usuario
 * en cuanto a causas, SDGs, categorías y duración de actividades.
 *
 * Siguiendo DDD, este VO encapsula las reglas de negocio y validaciones
 * relacionadas con las preferencias del usuario.
 */
export class UserPreferences extends ValueObject<UserPreferencesProps> {
  // Límites de validación
  private static readonly MAX_SDGS = 17;
  private static readonly MAX_CATEGORIES = 10;
  private static readonly MAX_DURATIONS = 4;

  get preferredSDGs(): ReadonlyArray<SustainableDevelopmentGoal> {
    return this.props.preferredSDGs;
  }

  get preferredCategories(): ReadonlyArray<CauseCategory> {
    return this.props.preferredCategories;
  }

  get durationPreferences(): ReadonlyArray<DurationPreference> {
    return this.props.durationPreferences;
  }

  get notificationsEnabled(): boolean {
    return this.props.notificationsEnabled;
  }

  public static createDefault(): UserPreferences {
    return new UserPreferences({
      preferredSDGs: [],
      preferredCategories: [],
      durationPreferences: [DurationPreference.ANY],
      notificationsEnabled: true,
    });
  }

  public static create(props: UserPreferencesProps): Either<ValidationError, UserPreferences> {
    const preferredSDGs = props.preferredSDGs ?? [];
    const preferredCategories = props.preferredCategories ?? [];
    const durationPreferences = props.durationPreferences ?? [DurationPreference.ANY];
    const notificationsEnabled = props.notificationsEnabled ?? true;

    const uniqueSDGs = Array.from(new Set(preferredSDGs));
    if (uniqueSDGs.length !== preferredSDGs.length) {
      return left(new ValidationError('Preferred SDGs must be unique'));
    }

    if (preferredSDGs.length > this.MAX_SDGS) {
      return left(new ValidationError(`Cannot have more than ${this.MAX_SDGS} preferred SDGs`));
    }

    const validSDGRange = Array.from({ length: 17 }, (_, i) => i + 1);
    const invalidSDGs = preferredSDGs.filter(sdg => !validSDGRange.includes(Number(sdg)));
    if (invalidSDGs.length > 0) {
      return left(new ValidationError('All SDGs must be between 1 and 17'));
    }

    const uniqueCategories = Array.from(new Set(preferredCategories));
    if (uniqueCategories.length !== preferredCategories.length) {
      return left(new ValidationError('Preferred categories must be unique'));
    }

    if (preferredCategories.length > this.MAX_CATEGORIES) {
      return left(new ValidationError(`Cannot have more than ${this.MAX_CATEGORIES} preferred categories`));
    }

    const validCategories = Object.values(CauseCategory);
    const invalidCategories = preferredCategories.filter(cat => !validCategories.includes(cat));
    if (invalidCategories.length > 0) {
      return left(new ValidationError(`Invalid categories: ${invalidCategories.join(', ')}`));
    }

    const uniqueDurations = Array.from(new Set(durationPreferences));
    if (uniqueDurations.length !== durationPreferences.length) {
      return left(new ValidationError('Duration preferences must be unique'));
    }

    if (durationPreferences.length > this.MAX_DURATIONS) {
      return left(new ValidationError(`Cannot have more than ${this.MAX_DURATIONS} duration preferences`));
    }

    const validDurations = Object.values(DurationPreference);
    const invalidDurations = durationPreferences.filter(dur => !validDurations.includes(dur));
    if (invalidDurations.length > 0) {
      return left(new ValidationError(`Invalid duration preferences: ${invalidDurations.join(', ')}`));
    }

    return right(
      new UserPreferences({
        preferredSDGs: uniqueSDGs,
        preferredCategories: uniqueCategories,
        durationPreferences: uniqueDurations,
        notificationsEnabled,
      }),
    );
  }

  private constructor(props: UserPreferencesProps) {
    super(props);
  }
}
