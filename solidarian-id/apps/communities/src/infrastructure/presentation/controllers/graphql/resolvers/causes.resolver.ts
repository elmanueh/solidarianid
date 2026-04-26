import { CausesService } from '@app/communities/domain/services/causes.service';
import { Cause } from '@app/communities/infrastructure/presentation/controllers/graphql/entities/cause';
import { ActionsGraphqlMapper } from '@app/communities/infrastructure/presentation/controllers/graphql/mappers/actions-graphql.mapper';
import { CausesGraphqlMapper } from '@app/communities/infrastructure/presentation/controllers/graphql/mappers/causes-graphql.mapper';
import { ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { Args, ID, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import {
  CommunityMembershipPolicy,
  Resource,
  Action as SecurityAction,
  UsersPolicy,
} from '@solidarianid/security/core';
import { AuthorizationGuard, Authorize, CurrentUser, JwtAuthGuard } from '@solidarianid/security/nestjs';
import { Action } from '../entities/action';
import { GraphqlLoadersService } from '../loaders/graphql-loaders.service';

@Resolver(() => Cause)
export class CausesResolver {
  constructor(
    private readonly causesService: CausesService,
    private readonly causesGraphqlMapper: CausesGraphqlMapper,
    private readonly actionsGraphqlMapper: ActionsGraphqlMapper,
    private readonly graphqlLoaders: GraphqlLoadersService,
  ) {}

  @Query(() => [Cause])
  @UseGuards(JwtAuthGuard)
  async causes(): Promise<Cause[]> {
    const causesOrError = await this.causesService.getAll();

    if (causesOrError.isLeft()) {
      throw causesOrError.value;
    }

    return causesOrError.value.map(cause => this.causesGraphqlMapper.toCauseBase(cause));
  }

  @Query(() => Cause)
  @UseGuards(JwtAuthGuard)
  async cause(@Args('id', { type: () => ID }, new ParseUUIDPipe()) id: string): Promise<Cause> {
    const causeOrError = await this.causesService.getById(id);

    if (causeOrError.isLeft()) {
      throw causeOrError.value;
    }

    return this.causesGraphqlMapper.toCauseBase(causeOrError.value);
  }

  @Query(() => [Cause])
  @UseGuards(JwtAuthGuard, AuthorizationGuard)
  @Authorize({
    action: SecurityAction.READ,
    resource: Resource.USER,
    policy: UsersPolicy.SELF_ONLY,
    entityId: 'userId',
  })
  async userFollowedCauses(@Args('userId', { type: () => ID }, new ParseUUIDPipe()) userId: string): Promise<Cause[]> {
    const causesOrError = await this.causesService.getUserFollowedCauses(userId);

    if (causesOrError.isLeft()) {
      throw causesOrError.value;
    }

    return causesOrError.value.map(cause => this.causesGraphqlMapper.toCauseBase(cause));
  }

  @Query(() => [Cause])
  @UseGuards(JwtAuthGuard)
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
  @UseGuards(JwtAuthGuard)
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
  @Authorize({
    action: SecurityAction.UPDATE,
    resource: Resource.CAUSE,
    policy: CommunityMembershipPolicy.MEMBER_ONLY,
    entityId: 'causeId',
  })
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

  @Mutation(() => Boolean)
  @UseGuards(JwtAuthGuard, AuthorizationGuard)
  @Authorize({
    action: SecurityAction.UPDATE,
    resource: Resource.CAUSE,
    policy: CommunityMembershipPolicy.MEMBER_ONLY,
    entityId: 'causeId',
  })
  async leaveCause(
    @Args('causeId', { type: () => ID }, new ParseUUIDPipe()) causeId: string,
    @CurrentUser('sub') actorId: string,
  ): Promise<boolean> {
    const result = await this.causesService.leaveCause(causeId, actorId);

    if (result.isLeft()) {
      throw result.value;
    }

    return true;
  }
}
