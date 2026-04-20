import { ActionsService } from '@app/communities/domain/services/actions.service';
import { Action, Objective } from '@app/communities/infrastructure/presentation/controllers/graphql/entities/action';
import { ActionsGraphqlMapper } from '@app/communities/infrastructure/presentation/controllers/graphql/mappers/actions-graphql.mapper';
import { ParseUUIDPipe } from '@nestjs/common';
import { Args, ID, Int, Mutation, Query, Resolver } from '@nestjs/graphql';

@Resolver(() => Action)
export class ActionsResolver {
  constructor(
    private readonly actionsService: ActionsService,
    private readonly actionsGraphqlMapper: ActionsGraphqlMapper,
  ) {}

  @Query(() => [Action])
  async actions(): Promise<Action[]> {
    const actionsOrError = await this.actionsService.getActions();

    if (actionsOrError.isLeft()) {
      throw actionsOrError.value;
    }

    return actionsOrError.value.map(action => this.actionsGraphqlMapper.toAction(action));
  }

  @Query(() => Action)
  async action(@Args('id', { type: () => ID }, new ParseUUIDPipe()) id: string): Promise<Action> {
    const actionOrError = await this.actionsService.getActionById(id);

    if (actionOrError.isLeft()) {
      throw actionOrError.value;
    }

    return this.actionsGraphqlMapper.toAction(actionOrError.value);
  }

  @Mutation(() => Boolean)
  async joinEvent(
    @Args('eventId', { type: () => ID }, new ParseUUIDPipe()) eventId: string,
    @Args('userId', { type: () => ID }, new ParseUUIDPipe()) userId: string,
  ): Promise<boolean> {
    const result = await this.actionsService.joinEvent(eventId, userId);

    if (result.isLeft()) throw result.value;

    return true;
  }

  @Mutation(() => Boolean)
  async leaveEvent(
    @Args('eventId', { type: () => ID }, new ParseUUIDPipe()) eventId: string,
    @Args('userId', { type: () => ID }, new ParseUUIDPipe()) userId: string,
  ): Promise<boolean> {
    const result = await this.actionsService.leaveEvent(eventId, userId);

    if (result.isLeft()) throw result.value;

    return true;
  }

  @Mutation(() => Objective)
  async contributeObjective(
    @Args('actionId', { type: () => ID }, new ParseUUIDPipe()) actionId: string,
    @Args('objectiveName') objectiveName: string,
    @Args('userId', { type: () => ID }, new ParseUUIDPipe()) userId: string,
    @Args('amount', { type: () => Int }) amount: number,
  ): Promise<Objective> {
    const result = await this.actionsService.contributeObjective(actionId, objectiveName, userId, amount);

    if (result.isLeft()) throw result.value;

    return this.actionsGraphqlMapper.toObjective(result.value);
  }
}
