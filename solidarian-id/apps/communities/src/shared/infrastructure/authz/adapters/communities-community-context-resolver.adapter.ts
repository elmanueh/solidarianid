import { ActionEntity } from '@app/communities/actions/infrastructure/persistence/entities/action.entity';
import { EventEntity } from '@app/communities/actions/infrastructure/persistence/entities/event.entity';
import { CauseEntity } from '@app/communities/causes/infrastructure/persistence/entities/cause.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CommunityContextResolver,
  ResolveCommunityContextInput,
  ResolvedCommunityContext,
  Resource,
} from '@solidarianid/security/core';
import { Repository as TypeOrmRepository } from 'typeorm';

@Injectable()
export class CommunitiesCommunityContextResolverAdapter extends CommunityContextResolver {
  constructor(
    @InjectRepository(CauseEntity)
    private readonly causeRepository: TypeOrmRepository<CauseEntity>,
    @InjectRepository(ActionEntity)
    private readonly actionRepository: TypeOrmRepository<ActionEntity>,
    @InjectRepository(EventEntity)
    private readonly eventRepository: TypeOrmRepository<EventEntity>,
  ) {
    super();
  }

  async resolve(input: ResolveCommunityContextInput): Promise<ResolvedCommunityContext | null> {
    if (input.resource === Resource.COMMUNITY) {
      return { communityId: input.entityId };
    }

    if (input.resource === Resource.CAUSE) {
      return this.resolveFromCause(input.entityId);
    }

    if (input.resource === Resource.ACTION) {
      return this.resolveFromAction(input.entityId);
    }

    if (input.resource === Resource.EVENT) {
      return this.resolveFromEvent(input.entityId);
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

  private async resolveFromEvent(eventId: string): Promise<ResolvedCommunityContext | null> {
    const row = await this.eventRepository
      .createQueryBuilder('event')
      .innerJoin('event.action', 'action')
      .innerJoin('action.cause', 'cause')
      .select('cause.communityId', 'communityId')
      .where('event.id = :eventId', { eventId })
      .getRawOne<{ communityId: string }>();

    if (!row?.communityId) {
      return null;
    }

    return { communityId: row.communityId };
  }
}
