import {
  CommunityMembership,
  ReconstituteCommunityMembershipProps,
} from '@app/admin/administrator/model/domain/value-objects/community-membership';
import { Either, left, right, sequence } from '@app/ddd/either';
import { Entity } from '@app/ddd/entity';
import { ValidationError } from '@app/value-objects/errors/validation/validation-error';
import { FullName } from '@app/value-objects/model/fullname';
import { MobilePhone } from '@app/value-objects/model/mobile-phone';
import { UniqueEntityID } from '@app/value-objects/model/unique-entity-id';
import { UserLocation } from '@app/value-objects/model/user-location';
import { Username } from '@app/value-objects/model/username';

interface UserProps {
  fullName: FullName;
  username: Username;
  phone: MobilePhone;
  location: UserLocation;
  communityMemberships: CommunityMembership[];
}

interface CreateUserProps {
  id: string;
  fullName: string;
  username: string;
  phone: string;
  city: string;
  countryCode: string;
}

interface ReconstituteUserProps {
  id: string;
  fullName: string;
  username: string;
  phone: string;
  city: string;
  countryCode: string;
  communityMemberships: ReconstituteCommunityMembershipProps[];
}

export class User extends Entity<UserProps> {
  get fullName(): string {
    return this.props.fullName.value;
  }

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

  get communityMemberships(): ReadonlyArray<CommunityMembership> {
    return this.props.communityMemberships;
  }

  private constructor(props: UserProps, id: UniqueEntityID) {
    super(props, id);
  }

  public static create(props: CreateUserProps): Either<ValidationError, User> {
    const idOrError = UniqueEntityID.create(props.id);
    if (idOrError.isLeft()) return left(idOrError.value);

    const fullNameOrError = FullName.create(props.fullName);
    if (fullNameOrError.isLeft()) return left(fullNameOrError.value);

    const usernameOrError = Username.create(props.username);
    if (usernameOrError.isLeft()) return left(usernameOrError.value);

    const phoneOrError = MobilePhone.create(props.phone);
    if (phoneOrError.isLeft()) return left(phoneOrError.value);

    const locationOrError = UserLocation.create({ city: props.city, countryCode: props.countryCode });
    if (locationOrError.isLeft()) return left(locationOrError.value);

    return right(
      new User(
        {
          fullName: fullNameOrError.value,
          username: usernameOrError.value,
          phone: phoneOrError.value,
          location: locationOrError.value,
          communityMemberships: [],
        },
        idOrError.value,
      ),
    );
  }

  public static reconstitute(props: ReconstituteUserProps): Either<ValidationError, User> {
    const idOrError = UniqueEntityID.create(props.id);
    if (idOrError.isLeft()) return left(idOrError.value);

    const fullNameOrError = FullName.create(props.fullName);
    if (fullNameOrError.isLeft()) return left(fullNameOrError.value);

    const usernameOrError = Username.create(props.username);
    if (usernameOrError.isLeft()) return left(usernameOrError.value);

    const phoneOrError = MobilePhone.create(props.phone);
    if (phoneOrError.isLeft()) return left(phoneOrError.value);

    const locationOrError = UserLocation.create({ city: props.city, countryCode: props.countryCode });
    if (locationOrError.isLeft()) return left(locationOrError.value);

    const communityMembershipsOrErrors = sequence(
      props.communityMemberships.map(membership => CommunityMembership.create(membership)),
    );
    if (communityMembershipsOrErrors.isLeft()) return left(communityMembershipsOrErrors.value);

    return right(
      new User(
        {
          fullName: fullNameOrError.value,
          username: usernameOrError.value,
          phone: phoneOrError.value,
          location: locationOrError.value,
          communityMemberships: communityMembershipsOrErrors.value,
        },
        idOrError.value,
      ),
    );
  }
}
