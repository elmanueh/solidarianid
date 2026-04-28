import { Community } from '@app/communities/shared/domain/model/aggregates/community';
import { User } from '@app/communities/shared/domain/model/entities/user';
import { MemberType } from '@app/communities/shared/domain/model/enums/member-type';
import { CommunityUserEntity } from '../entities/community-user.entity';

export class CommunityUserEntityMapper {
  static toPersistence(member: User, community: Community): CommunityUserEntity {
    const communityUser = new CommunityUserEntity();
    communityUser.userId = member.id.value;
    communityUser.communityId = community.id.value;

    if (community.isCreator(member)) {
      communityUser.role = MemberType.CREATOR;
    } else if (community.hasAdmin(member)) {
      communityUser.role = MemberType.ADMIN;
    } else {
      communityUser.role = MemberType.MEMBER;
    }

    return communityUser;
  }
}
