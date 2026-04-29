import { ActionsGraphqlMapper } from '@app/communities/actions/infrastructure/presentation/controllers/graphql/mappers/actions-graphql.mapper';
import { Cause } from '@app/communities/shared/domain/model/aggregates/cause';
import { Injectable } from '@nestjs/common';
import { Cause as CauseGraphql } from '../entities/cause';

@Injectable()
export class CausesGraphqlMapper {
  constructor(private readonly actionsGraphqlMapper: ActionsGraphqlMapper) {}

  static toCauseBaseFromDomain(cause: Cause): CauseGraphql {
    return {
      id: cause.id.value,
      name: cause.name,
      description: cause.description,
      durationDays: cause.durationDays,
      ods: cause.ods.map(Number),
      initialDate: cause.initialDate,
      actions: [],
      communityId: cause.communityId,
      userIds: cause.userIds,
    };
  }

  toCause(cause: Cause): CauseGraphql {
    return {
      id: cause.id.value,
      name: cause.name,
      description: cause.description,
      durationDays: cause.durationDays,
      ods: cause.ods.map(Number),
      initialDate: cause.initialDate,
      actions: cause.actions.map(action => this.actionsGraphqlMapper.toAction(action)),
      communityId: cause.communityId,
      userIds: cause.userIds,
    };
  }

  toCauseBase(cause: Cause): CauseGraphql {
    return CausesGraphqlMapper.toCauseBaseFromDomain(cause);
  }
}
