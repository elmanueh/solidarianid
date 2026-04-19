import { CausesService } from '@app/communities/domain/services/causes.service';
import { ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { Args, ID, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Cause } from '../entities/cause';
import { CausesGraphqlMapper } from '../mappers/causes-graphql.mapper';
import { Action } from '../entities/action';
import { ActionsGraphqlMapper } from '../mappers/actions-graphql.mapper';
import { GraphqlLoadersService } from '../loaders/graphql-loaders.service';
import { CurrentUser, JwtAuthGuard } from '@solidarianid/security/nestjs';
import { Action as SecurityAction, EntityType, Resource } from '@solidarianid/security/core';
import { AuthorizationGuard, Authorize } from '@solidarianid/security/nestjs';

const AuthorizeCommunityMemberByCauseArgId = () =>
  Authorize({
    action: SecurityAction.UPDATE,
    resource: Resource.COMMUNITY,
    policy: 'community.member',
    entityType: EntityType.CAUSE,
    entityId: {
      source: 'args',
      key: 'causeId',
    },
  });

@Resolver(() => Cause)
export class CausesResolver {
  constructor(
    private readonly causesService: CausesService,
    private readonly causesGraphqlMapper: CausesGraphqlMapper,
    private readonly actionsGraphqlMapper: ActionsGraphqlMapper,
    private readonly graphqlLoaders: GraphqlLoadersService,
  ) {}

  @Query(() => [Cause])
  async causes(): Promise<Cause[]> {
    const causesOrError = await this.causesService.getAll();

    if (causesOrError.isLeft()) {
      throw causesOrError.value;
    }

    return causesOrError.value.map(cause => this.causesGraphqlMapper.toCauseBase(cause));
  }

  @Query(() => Cause)
  async cause(@Args('id', { type: () => ID }, new ParseUUIDPipe()) id: string): Promise<Cause> {
    const causeOrError = await this.causesService.getById(id);

    if (causeOrError.isLeft()) {
      throw causeOrError.value;
    }

    return this.causesGraphqlMapper.toCauseBase(causeOrError.value);
  }

  @Query(() => [Cause])
  async causesByCommunity(
    @Args('communityId', { type: () => ID }, new ParseUUIDPipe()) communityId: string,
  ): Promise<Cause[]> {
    const causesOrError = await this.causesService.getAllByCommunityId(communityId);

    if (causesOrError.isLeft()) {
      throw causesOrError.value;
    }

    return causesOrError.value.map(cause => this.causesGraphqlMapper.toCauseBase(cause));
  }

  @Query(() => Cause)
  async causeByCommunity(
    @Args('communityId', { type: () => ID }, new ParseUUIDPipe()) communityId: string,
    @Args('causeId', { type: () => ID }, new ParseUUIDPipe()) causeId: string,
  ): Promise<Cause> {
    const causeOrError = await this.causesService.getByCommunityIdAndCauseId(communityId, causeId);

    if (causeOrError.isLeft()) {
      throw causeOrError.value;
    }

    return this.causesGraphqlMapper.toCauseBase(causeOrError.value);
  }

  @ResolveField(() => [Action])
  async actions(@Parent() cause: Cause): Promise<Action[]> {
    const actions = await this.graphqlLoaders.actionsByCauseId.load(cause.id);

    return actions.map(action => this.actionsGraphqlMapper.toAction(action));
  }

  @Mutation(() => Boolean)
  @UseGuards(JwtAuthGuard, AuthorizationGuard)
  @AuthorizeCommunityMemberByCauseArgId()
  async joinCause(
    @Args('causeId', { type: () => ID }, new ParseUUIDPipe()) causeId: string,
    @CurrentUser('sub') actorId: string,
  ): Promise<boolean> {
    const result = await this.causesService.joinCause(causeId, actorId);

    if (result.isLeft()) {
      throw result.value;
    }

    return true;
  }
}
