import { MembershipRole } from '../constants/membership-role.enum';

export type MembershipPermissionLookupInput = {
  userId: string;
  communityId: string;
};

export abstract class MembershipPermissionSource {
  abstract findRole(input: MembershipPermissionLookupInput): Promise<MembershipRole | null>;
}
