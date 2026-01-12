import { Either, left, right } from '@app/ddd/either';
import { ValueObject } from '@app/ddd/value-object';
import { InvalidUniqueEntityIDError } from '@app/value-objects/errors/validation/unique-entity-id-validation-error';
import { UniqueEntityID } from '@app/value-objects/model/unique-entity-id';
import { Role } from '../enums/role';

interface CommunityMembershipProps {
  communityId: UniqueEntityID;
  communityName: string;
  role: Role;
}

export interface CreateCommunityMembershipProps {
  communityId: string;
  communityName: string;
  role: Role;
}

export interface ReconstituteCommunityMembershipProps {
  communityId: string;
  communityName: string;
  role: Role;
}

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

  get role(): Role {
    return this.props.role;
  }

  public static create(props: CreateCommunityMembershipProps): Either<InvalidUniqueEntityIDError, CommunityMembership> {
    if (!props.communityName || props.communityName.trim().length === 0) {
      return left(new InvalidUniqueEntityIDError('Community name cannot be empty.'));
    }

    const communityIdResult = UniqueEntityID.create(props.communityId);
    if (communityIdResult.isLeft()) {
      return left(communityIdResult.value);
    }

    const membershipProps: CommunityMembershipProps = {
      communityId: communityIdResult.value,
      communityName: props.communityName,
      role: props.role,
    };

    return right(new CommunityMembership(membershipProps));
  }
}
