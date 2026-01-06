import { User } from '@app/communities/domain/model/entities/user';
import { CommunityUserEntity } from '../entities/community-user.entity';
import { Community } from '@app/communities/domain/model/aggregates/community';
import { MemberType } from '@app/communities/domain/model/enums/member-type';

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
