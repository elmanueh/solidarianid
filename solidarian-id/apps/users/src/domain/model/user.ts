import { Either, left, right } from '@app/ddd/either';
import { Entity } from '@app/ddd/entity';
import { ValidationError } from '@app/value-objects/errors/validation/validation-error';
import { FullName } from '@app/value-objects/model/fullname';
import { HashedPassword } from '@app/value-objects/model/hashed-password';
import { MobilePhone } from '@app/value-objects/model/mobile-phone';
import { SustainableDevelopmentGoal } from '@app/value-objects/model/ods';
import { UniqueEntityID } from '@app/value-objects/model/unique-entity-id';
import { UserLocation } from '@app/value-objects/model/user-location';
import { CauseCategory, DurationPreference, UserPreferences } from '@app/value-objects/model/user-preferences';
import { Username } from '@app/value-objects/model/username';

export interface UserProps {
  fullName: FullName;
  username: Username;
  mobilePhone: MobilePhone;
  passwordHash: HashedPassword;
  location: UserLocation;
  userPreferences: UserPreferences;
}

export interface UserCreationProps {
  fullName: string;
  username: string;
  mobilePhone: string;
  passwordHash: string;
  city: string;
  countryCode: string;
}

export class User extends Entity<UserProps> {
  private constructor(props: UserProps, id?: UniqueEntityID) {
    super(props, id);
  }

  get username(): string {
    return this.props.username.value;
  }

  get mobilePhone(): string {
    return this.props.mobilePhone.value;
  }

  get passwordHash(): string {
    return this.props.passwordHash.value;
  }

  get city(): string {
    return this.props.location.city;
  }

  get countryCode(): string {
    return this.props.location.countryCode;
  }

  get fullName(): string {
    return this.props.fullName.value;
  }

  get userPreferences(): UserPreferences {
    return this.props.userPreferences;
  }

  private set username(username: Username) {
    this.props.username = username;
  }

  private set mobilePhone(mobilePhone: MobilePhone) {
    this.props.mobilePhone = mobilePhone;
  }

  private set fullName(fullName: FullName) {
    this.props.fullName = fullName;
  }

  private set location(location: UserLocation) {
    this.props.location = location;
  }

  private set userPreferences(preferences: UserPreferences) {
    this.props.userPreferences = preferences;
  }

  public updateUserPreferences(
    preferences: Partial<{
      preferredSDGs: SustainableDevelopmentGoal[];
      preferredCategories: CauseCategory[];
      durationPreferences: DurationPreference[];
      notificationsEnabled: boolean;
    }>,
  ): Either<ValidationError, void> {
    const currentPrefs = this.props.userPreferences;
    const preferencesOrError = UserPreferences.create({
      preferredSDGs: preferences.preferredSDGs ?? currentPrefs.preferredSDGs.slice(),
      preferredCategories: preferences.preferredCategories ?? currentPrefs.preferredCategories.slice(),
      durationPreferences: preferences.durationPreferences ?? currentPrefs.durationPreferences.slice(),
      notificationsEnabled: preferences.notificationsEnabled ?? currentPrefs.notificationsEnabled,
    });

    if (preferencesOrError.isLeft()) {
      return left(preferencesOrError.value);
    }

    this.userPreferences = preferencesOrError.value;
    return right(undefined);
  }

  public updateUserProfile(
    fullName?: string,
    username?: string,
    mobilePhone?: string,
    city?: string,
    countryCode?: string,
  ): Either<ValidationError, void> {
    const validationResult = this.validateUpdatePayload(fullName, username, mobilePhone, city, countryCode);
    if (validationResult.isLeft()) {
      return validationResult;
    }

    const fullNameResult = this.updateField(
      fullName,
      val => FullName.create(val),
      v => (this.fullName = v),
    );
    if (fullNameResult.isLeft()) return left(fullNameResult.value);

    const usernameResult = this.updateField(
      username,
      val => Username.create(val),
      v => (this.username = v),
    );
    if (usernameResult.isLeft()) return left(usernameResult.value);

    const phoneResult = this.updateField(
      mobilePhone,
      val => MobilePhone.create(val),
      v => (this.mobilePhone = v),
    );
    if (phoneResult.isLeft()) return left(phoneResult.value);

    return this.updateLocation(city, countryCode);
  }

  // Métodos Privados para reducir complejidad

  /**
   * Encapsula la lógica de validación de invariantes de la petición.
   * Reduce la complejidad del método principal al mover los operadores && y || aquí.
   */
  private validateUpdatePayload(
    fullName?: string,
    username?: string,
    mobilePhone?: string,
    city?: string,
    countryCode?: string,
  ): Either<ValidationError, void> {
    const hasNoUpdates = !fullName && !username && !mobilePhone && !city && !countryCode;
    if (hasNoUpdates) {
      return left(new ValidationError('At least one field must be provided to update the profile.'));
    }

    const locationFieldsCount = [city, countryCode].filter(Boolean).length;
    // Simplificado: si hay 1 campo, es un error (deben ser 0 o 2)
    if (locationFieldsCount === 1) {
      return left(new ValidationError('City and country code must both be provided when updating user location'));
    }

    return right(undefined);
  }

  // Método genérico para el patrón: Si existe valor -> Crear VO -> Validar -> Asignar
  private updateField<T>(
    rawValue: string | undefined,
    factory: (val: string) => Either<ValidationError, T>,
    setter: (val: T) => void,
  ): Either<ValidationError, void> {
    if (!rawValue) {
      return right(undefined);
    }

    const result = factory(rawValue);
    if (result.isLeft()) {
      return left(result.value); // Retorna el error encapsulado
    }

    setter(result.value);
    return right(undefined);
  }

  // Lógica específica para Location (que requiere 2 campos)
  private updateLocation(city?: string, countryCode?: string): Either<ValidationError, void> {
    if (city && countryCode) {
      const locationOrError = UserLocation.create({ city, countryCode });
      if (locationOrError.isLeft()) {
        return left(locationOrError.value);
      }
      this.location = locationOrError.value;
    }
    return right(undefined);
  }

  public static create(props: UserCreationProps, id?: string): Either<ValidationError, User> {
    // Create UniqueEntityID if id is provided
    let entityId: UniqueEntityID | undefined;
    if (id) {
      const entityIdOrError = UniqueEntityID.create(id);
      if (entityIdOrError.isLeft()) {
        return left(entityIdOrError.value);
      }
      entityId = entityIdOrError.value;
    }

    // Create all value objects from plain props
    const usernameOrError = Username.create(props.username);
    if (usernameOrError.isLeft()) {
      return left(usernameOrError.value);
    }

    const mobilePhoneOrError = MobilePhone.create(props.mobilePhone);
    if (mobilePhoneOrError.isLeft()) {
      return left(mobilePhoneOrError.value);
    }

    const passwordHashOrError = HashedPassword.create(props.passwordHash);
    if (passwordHashOrError.isLeft()) {
      return left(passwordHashOrError.value);
    }

    const locationOrError = UserLocation.create({
      city: props.city,
      countryCode: props.countryCode,
    });
    if (locationOrError.isLeft()) {
      return left(locationOrError.value);
    }

    const fullNameOrError = FullName.create(props.fullName);
    if (fullNameOrError.isLeft()) {
      return left(fullNameOrError.value);
    }

    const user = new User(
      {
        fullName: fullNameOrError.value,
        username: usernameOrError.value,
        mobilePhone: mobilePhoneOrError.value,
        passwordHash: passwordHashOrError.value,
        location: locationOrError.value,
        userPreferences: UserPreferences.createDefault(),
      },
      entityId,
    );

    return right(user);
  }
}
