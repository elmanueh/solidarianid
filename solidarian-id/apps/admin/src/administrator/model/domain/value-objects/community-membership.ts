import { Either, left, right } from '@app/ddd/either';
import { ValueObject } from '@app/ddd/value-object';
import { InvalidUniqueEntityIDError } from '@app/value-objects/errors/validation/unique-entity-id-validation-error';
import { UniqueEntityID } from '@app/value-objects/model/unique-entity-id';

interface CommunityMembershipProps {
  communityId: UniqueEntityID;
  communityName: string;
  isAdmin: boolean;
}

interface CreateCommunityMembershipProps {
  communityId: string;
  communityName: string;
  isAdmin: boolean;
}

export interface ReconstituteCommunityMembershipProps {
  communityId: string;
  communityName: string;
  isAdmin: boolean;
}

/**
 * Value Object que representa la membresía de un usuario a una comunidad
 * Encapsula el ID de la comunidad, su nombre y el rol del usuario (admin o miembro)
 */
export class CommunityMembership extends ValueObject<CommunityMembershipProps> {
  private constructor(props: CommunityMembershipProps) {
    super(props);
  }

  get communityId(): string {
    return this.props.communityId.value;
  }

  get communityName(): string {
    return this.props.communityName;
  }

  get isAdmin(): boolean {
    return this.props.isAdmin;
  }

  public equals(other: CommunityMembership): boolean {
    return (
      this.communityId === other.communityId &&
      this.communityName === other.communityName &&
      this.isAdmin === other.isAdmin
    );
  }

  public static create(props: CreateCommunityMembershipProps): Either<InvalidUniqueEntityIDError, CommunityMembership> {
    // Validar que el nombre de la comunidad no esté vacío
    if (!props.communityName || props.communityName.trim().length === 0) {
      return left(new InvalidUniqueEntityIDError('Community name cannot be empty.'));
    }

    // Validar el ID de la comunidad
    const communityIdResult = UniqueEntityID.create(props.communityId);
    if (communityIdResult.isLeft()) {
      return left(communityIdResult.value);
    }

    const membershipProps: CommunityMembershipProps = {
      communityId: communityIdResult.value,
      communityName: props.communityName.trim(),
      isAdmin: props.isAdmin,
    };

    return right(new CommunityMembership(membershipProps));
  }
}
