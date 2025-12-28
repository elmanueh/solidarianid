import { Either, left, right } from '@app/ddd/either';
import { Entity } from '@app/ddd/entity';
import { ValidationError } from '@app/value-objects/errors/validation/validation-error';
import { UniqueEntityID } from '@app/value-objects/model/unique-entity-id';
import { Username } from '@app/value-objects/model/username';
import { MobilePhone } from '@app/value-objects/model/mobile-phone';
import { UserLocation } from '@app/value-objects/model/user-location';
import { CommunityMembership } from '@app/admin/administrator/model/domain/value-objects/community-membership';

interface UserProps {
  username: Username;
  phone: MobilePhone;
  location: UserLocation;
  communityMemberships: CommunityMembership[];
}

/**
 * Entidad de dominio User
 * Representa un usuario/voluntario del sistema SolidarianID
 * Los usuarios se obtienen desde el sistema, no se crean en este panel de administración
 */
export class User extends Entity<UserProps> {
  private constructor(props: UserProps, id: UniqueEntityID) {
    super(props, id);
  }

  /**
   * Factory method para crear un usuario desde persistencia/datos mock
   * Requiere ID obligatorio ya que los usuarios ya existen en el sistema
   */
  public static create(
    id: string,
    username: string,
    phone: string,
    city: string,
    countryCode: string,
    communityMemberships: Array<{
      communityId: string;
      communityName: string;
      isAdmin: boolean;
    }>,
  ): Either<ValidationError, User> {
    // Validar ID
    const idOrError = UniqueEntityID.create(id);
    if (idOrError.isLeft()) {
      return left(idOrError.value);
    }

    // Validar username
    const usernameOrError = Username.create(username);
    if (usernameOrError.isLeft()) {
      return left(usernameOrError.value);
    }

    // Validar teléfono
    const phoneOrError = MobilePhone.create(phone);
    if (phoneOrError.isLeft()) {
      return left(phoneOrError.value);
    }

    // Validar ubicación
    const locationOrError = UserLocation.create({ city, countryCode });
    if (locationOrError.isLeft()) {
      return left(locationOrError.value);
    }

    // Validar y crear memberships
    const membershipsOrErrors: CommunityMembership[] = [];
    for (const membership of communityMemberships) {
      const membershipOrError = CommunityMembership.create(membership);
      if (membershipOrError.isLeft()) {
        return left(membershipOrError.value);
      }
      membershipsOrErrors.push(membershipOrError.value);
    }

    const user = new User(
      {
        username: usernameOrError.value,
        phone: phoneOrError.value,
        location: locationOrError.value,
        communityMemberships: membershipsOrErrors,
      },
      idOrError.value,
    );

    return right(user);
  }

  // ════════════════════════════════════════════════════════════════
  // GETTERS
  // ════════════════════════════════════════════════════════════════

  get username(): string {
    return this.props.username.value;
  }

  get phone(): string {
    return this.props.phone.value;
  }

  get city(): string {
    return this.props.location.city;
  }

  get countryCode(): string {
    return this.props.location.countryCode;
  }

  get communityMemberships(): CommunityMembership[] {
    return this.props.communityMemberships;
  }
}
