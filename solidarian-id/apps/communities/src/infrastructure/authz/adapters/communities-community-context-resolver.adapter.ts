import { ActionEntity } from '@app/communities/infrastructure/persistence/entities/action.entity';
import { CauseEntity } from '@app/communities/infrastructure/persistence/entities/cause.entity';
import {
  CommunityContextResolver,
  EntityType,
  ResolveCommunityContextInput,
  ResolvedCommunityContext,
} from '@solidarianid/security/core';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository as TypeOrmRepository } from 'typeorm';

@Injectable()
export class CommunitiesCommunityContextResolverAdapter extends CommunityContextResolver {
  constructor(
    @InjectRepository(CauseEntity)
    private readonly causeRepository: TypeOrmRepository<CauseEntity>,
    @InjectRepository(ActionEntity)
    private readonly actionRepository: TypeOrmRepository<ActionEntity>,
  ) {
    super();
  }

  async resolve(input: ResolveCommunityContextInput): Promise<ResolvedCommunityContext | null> {
    if (input.entityType === EntityType.COMMUNITY) {
      return { communityId: input.entityId };
    }

    if (input.entityType === EntityType.CAUSE) {
      return this.resolveFromCause(input.entityId);
    }

    if (input.entityType === EntityType.ACTION) {
      return this.resolveFromAction(input.entityId);
    }

    return null;
  }

  private async resolveFromCause(causeId: string): Promise<ResolvedCommunityContext | null> {
    const row = await this.causeRepository
      .createQueryBuilder('cause')
      .select('cause.communityId', 'communityId')
      .where('cause.id = :causeId', { causeId })
      .getRawOne<{ communityId: string }>();

    if (!row?.communityId) {
      return null;
    }

    return { communityId: row.communityId };
  }

  private async resolveFromAction(actionId: string): Promise<ResolvedCommunityContext | null> {
    const row = await this.actionRepository
      .createQueryBuilder('action')
      .innerJoin('action.cause', 'cause')
      .select('cause.communityId', 'communityId')
      .where('action.id = :actionId', { actionId })
      .getRawOne<{ communityId: string }>();

    if (!row?.communityId) {
      return null;
    }

    return { communityId: row.communityId };
  }
}
