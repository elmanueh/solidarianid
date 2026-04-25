import { ActionsService } from '@app/communities/domain/services/actions.service';
import { CausesService } from '@app/communities/domain/services/causes.service';
import { Action, Objective } from '@app/communities/infrastructure/presentation/controllers/graphql/entities/action';
import { ActionsGraphqlMapper } from '@app/communities/infrastructure/presentation/controllers/graphql/mappers/actions-graphql.mapper';
import { ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { Args, ID, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Action as SecurityAction, Resource, CommunityMembershipPolicy } from '@solidarianid/security/core';
import { AuthorizationGuard, Authorize, CurrentUser, JwtAuthGuard } from '@solidarianid/security/nestjs';

@Resolver(() => Action)
export class ActionsResolver {
  constructor(
    private readonly actionsService: ActionsService,
    private readonly causesService: CausesService,
    private readonly actionsGraphqlMapper: ActionsGraphqlMapper,
  ) {}

  private async resolveCommunityIdByCauseId(causeId: string): Promise<string> {
    const causeOrError = await this.causesService.getById(causeId);

    if (causeOrError.isLeft()) {
      throw causeOrError.value;
    }

    return causeOrError.value.communityId;
  }

  @Query(() => [Action])
  @UseGuards(JwtAuthGuard)
  async actions(): Promise<Action[]> {
    const actionsOrError = await this.actionsService.getActions();

    if (actionsOrError.isLeft()) {
      throw actionsOrError.value;
    }

    const communityIdsByCauseId = new Map<string, string>();

    return Promise.all(
      actionsOrError.value.map(async action => {
        const cachedCommunityId = communityIdsByCauseId.get(action.causeId);
        const communityId = cachedCommunityId ?? (await this.resolveCommunityIdByCauseId(action.causeId));

        if (!cachedCommunityId) {
          communityIdsByCauseId.set(action.causeId, communityId);
        }

        return this.actionsGraphqlMapper.toAction(action, communityId);
      }),
    );
  }

  @Query(() => Action)
  @UseGuards(JwtAuthGuard)
  async action(@Args('id', { type: () => ID }, new ParseUUIDPipe()) id: string): Promise<Action> {
    const actionOrError = await this.actionsService.getActionById(id);

    if (actionOrError.isLeft()) {
      throw actionOrError.value;
    }

    const communityId = await this.resolveCommunityIdByCauseId(actionOrError.value.causeId);

    return this.actionsGraphqlMapper.toAction(actionOrError.value, communityId);
  }

  @Mutation(() => Boolean)
  @UseGuards(JwtAuthGuard, AuthorizationGuard)
  @Authorize({
    action: SecurityAction.UPDATE,
    resource: Resource.EVENT,
    policy: CommunityMembershipPolicy.MEMBER_OR_CREATOR,
    entityId: 'eventId',
  })
  async joinEvent(
    @Args('eventId', { type: () => ID }, new ParseUUIDPipe()) eventId: string,
    @CurrentUser('sub') actorId: string,
  ): Promise<boolean> {
    const result = await this.actionsService.joinEvent(eventId, actorId);

    if (result.isLeft()) throw result.value;

    return true;
  }

  @Mutation(() => Boolean)
  @UseGuards(JwtAuthGuard, AuthorizationGuard)
  @Authorize({
    action: SecurityAction.UPDATE,
    resource: Resource.EVENT,
    policy: CommunityMembershipPolicy.MEMBER_OR_CREATOR,
    entityId: 'eventId',
  })
  async leaveEvent(
    @Args('eventId', { type: () => ID }, new ParseUUIDPipe()) eventId: string,
    @CurrentUser('sub') actorId: string,
  ): Promise<boolean> {
    const result = await this.actionsService.leaveEvent(eventId, actorId);

    if (result.isLeft()) throw result.value;

    return true;
  }

  @Mutation(() => Objective)
  @UseGuards(JwtAuthGuard, AuthorizationGuard)
  @Authorize({
    action: SecurityAction.UPDATE,
    resource: Resource.EVENT,
    policy: CommunityMembershipPolicy.MEMBER_OR_CREATOR,
    entityId: 'actionId',
  })
  async contributeObjective(
    @Args('actionId', { type: () => ID }, new ParseUUIDPipe()) actionId: string,
    @Args('objectiveName') objectiveName: string,
    @CurrentUser('sub') actorId: string,
    @Args('amount', { type: () => Int }) amount: number,
  ): Promise<Objective> {
    const result = await this.actionsService.contributeObjective(actionId, objectiveName, actorId, amount);

    if (result.isLeft()) throw result.value;

    return this.actionsGraphqlMapper.toObjective(result.value);
  }
}
