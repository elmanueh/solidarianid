import { User } from '@app/communities/domain/model/entities/user';
import { CommunityUserEntity } from '../entities/community-user.entity';
import { Community } from '@app/communities/domain/model/aggregates/community';

export class CommunityUserEntityMapper {
  static toPersistence(member: User, community: Community): CommunityUserEntity {
    const communityUser = new CommunityUserEntity();
    communityUser.userId = member.id.value;
    communityUser.communityId = community.id.value;
    communityUser.role = community.hasAdmin(member) ? 'admin' : 'member';
    return communityUser;
  }
}
