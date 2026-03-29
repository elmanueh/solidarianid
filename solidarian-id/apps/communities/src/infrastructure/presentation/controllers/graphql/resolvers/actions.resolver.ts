import { ActionsService } from '@app/communities/domain/services/actions.service';
import { ParseUUIDPipe } from '@nestjs/common';
import { Args, ID, Query, Resolver } from '@nestjs/graphql';
import { Action } from '../entities/action';
import { ActionsGraphqlMapper } from '../mappers/actions-graphql.mapper';

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
}
