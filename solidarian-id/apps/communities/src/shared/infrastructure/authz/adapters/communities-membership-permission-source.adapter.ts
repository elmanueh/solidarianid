import { CommunityUserEntity } from '@app/communities/communities/infrastructure/persistence/entities/community-user.entity';
import { MemberType } from '@app/communities/shared/domain/model/enums/member-type';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  MembershipPermissionLookupInput,
  MembershipPermissionSource,
  MembershipRole,
} from '@solidarianid/security/core';
import { Repository as TypeOrmRepository } from 'typeorm';

@Injectable()
export class CommunitiesMembershipPermissionSourceAdapter extends MembershipPermissionSource {
  constructor(
    @InjectRepository(CommunityUserEntity)
    private readonly communityUserRepository: TypeOrmRepository<CommunityUserEntity>,
  ) {
    super();
  }

  async findRole(input: MembershipPermissionLookupInput): Promise<MembershipRole | null> {
    const membership = await this.communityUserRepository.findOne({
      where: {
        userId: input.userId,
        communityId: input.communityId,
      },
      select: {
        role: true,
      },
    });

    if (!membership) {
      return null;
    }

    if (membership.role === MemberType.CREATOR) {
      return MembershipRole.CREATOR;
    }

    return MembershipRole.MEMBER;
  }
}
