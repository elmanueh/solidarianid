import { AggregateRoot } from '@app/ddd/aggregate-root';
import { DomainEvent } from '@app/ddd/domain-event';
import { Either, left, right } from '@app/ddd/either';
import { UserCreatedEvent } from '@app/users/domain/events/user-created.event';
import { UserFullNameUpdatedEvent } from '@app/users/domain/events/user-fullname-updated.event';
import { UserLocationUpdatedEvent } from '@app/users/domain/events/user-location-updated.event';
import { UserMobilePhoneUpdatedEvent } from '@app/users/domain/events/user-mobile-phone-updated.event';
import { UserPreferencesUpdatedEvent } from '@app/users/domain/events/user-preferences-updated.event';
import { UserUsernameUpdatedEvent } from '@app/users/domain/events/user-username-updated.event';
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

export class User extends AggregateRoot<UserProps> {
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
    this.addDomainEvent(
      new UserPreferencesUpdatedEvent(
        this.id.value,
        this.userPreferences.preferredSDGs.slice(),
        this.userPreferences.preferredCategories.slice(),
        this.userPreferences.durationPreferences.slice(),
        this.userPreferences.notificationsEnabled,
      ),
    );

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
    if (fullNameResult.value) {
      this.addDomainEvent(new UserFullNameUpdatedEvent(this.id.value, this.fullName));
    }

    const usernameResult = this.updateField(
      username,
      val => Username.create(val),
      v => (this.username = v),
    );
    if (usernameResult.isLeft()) return left(usernameResult.value);
    if (usernameResult.value) {
      this.addDomainEvent(new UserUsernameUpdatedEvent(this.id.value, this.username));
    }

    const phoneResult = this.updateField(
      mobilePhone,
      val => MobilePhone.create(val),
      v => (this.mobilePhone = v),
    );
    if (phoneResult.isLeft()) return left(phoneResult.value);
    if (phoneResult.value) {
      this.addDomainEvent(new UserMobilePhoneUpdatedEvent(this.id.value, this.mobilePhone));
    }

    const locationResult = this.updateLocation(city, countryCode);
    if (locationResult.isLeft()) return left(locationResult.value);
    if (locationResult.value) {
      this.addDomainEvent(new UserLocationUpdatedEvent(this.id.value, this.city, this.countryCode));
    }

    return right(undefined);
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
  ): Either<ValidationError, boolean> {
    if (rawValue === undefined) {
      return right(false);
    }

    const result = factory(rawValue);
    if (result.isLeft()) {
      return left(result.value);
    }

    setter(result.value);
    return right(true);
  }

  // Lógica específica para Location (que requiere 2 campos)
  private updateLocation(city?: string, countryCode?: string): Either<ValidationError, boolean> {
    if (city === undefined || countryCode === undefined) {
      return right(false);
    }

    const locationOrError = UserLocation.create({ city, countryCode });
    if (locationOrError.isLeft()) {
      return left(locationOrError.value);
    }
    this.location = locationOrError.value;
    return right(true);
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

    user.addDomainEvent(
      new UserCreatedEvent(
        user.id.value,
        user.fullName,
        user.username,
        user.mobilePhone,
        user.passwordHash,
        user.city,
        user.countryCode,
        user.userPreferences.preferredSDGs.slice(),
        user.userPreferences.preferredCategories.slice(),
        user.userPreferences.durationPreferences.slice(),
        user.userPreferences.notificationsEnabled,
      ),
    );

    return right(user);
  }

  public applyEvent(event: DomainEvent): Either<ValidationError, void> {
    switch (event.type) {
      case UserCreatedEvent.name:
        this.props.fullName = FullName.create((event as UserCreatedEvent).fullName).value as FullName;
        this.props.username = Username.create((event as UserCreatedEvent).username).value as Username;
        this.props.mobilePhone = MobilePhone.create((event as UserCreatedEvent).mobilePhone).value as MobilePhone;
        this.props.passwordHash = HashedPassword.create((event as UserCreatedEvent).passwordHash)
          .value as HashedPassword;
        this.props.location = UserLocation.create({
          city: (event as UserCreatedEvent).city,
          countryCode: (event as UserCreatedEvent).countryCode,
        }).value as UserLocation;
        break;
      case UserFullNameUpdatedEvent.name:
        this.props.fullName = FullName.create((event as UserFullNameUpdatedEvent).fullName).value as FullName;
        break;
      case UserUsernameUpdatedEvent.name:
        this.props.username = Username.create((event as UserUsernameUpdatedEvent).username).value as Username;
        break;
      case UserMobilePhoneUpdatedEvent.name:
        this.props.mobilePhone = MobilePhone.create((event as UserMobilePhoneUpdatedEvent).mobilePhone)
          .value as MobilePhone;
        break;
      case UserLocationUpdatedEvent.name:
        this.props.location = UserLocation.create({
          city: (event as UserLocationUpdatedEvent).city,
          countryCode: (event as UserLocationUpdatedEvent).countryCode,
        }).value as UserLocation;
        break;
      case UserPreferencesUpdatedEvent.name:
        this.props.userPreferences = UserPreferences.create({
          preferredSDGs: (event as UserPreferencesUpdatedEvent).preferredSDGs as SustainableDevelopmentGoal[],
          preferredCategories: (event as UserPreferencesUpdatedEvent).preferredCategories as CauseCategory[],
          durationPreferences: (event as UserPreferencesUpdatedEvent).durationPreferences as DurationPreference[],
          notificationsEnabled: (event as UserPreferencesUpdatedEvent).notificationsEnabled,
        }).value as UserPreferences;
        break;
      default:
        return left(new ValidationError(`Unsupported event type: ${event.type}`));
    }

    return right(undefined);
  }
}
