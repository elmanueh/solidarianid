import { Cause } from '@app/communities/domain/model/entities/cause';
import { Injectable } from '@nestjs/common';
import { Cause as CauseGraphql } from '../entities/cause';
import { ActionsGraphqlMapper } from './actions-graphql.mapper';

@Injectable()
export class CausesGraphqlMapper {
  constructor(private readonly actionsGraphqlMapper: ActionsGraphqlMapper) {}

  static toCauseBaseFromDomain(cause: Cause): CauseGraphql {
    return {
      id: cause.id.value,
      name: cause.name,
      description: cause.description,
      durationDays: cause.durationDays,
      ods: cause.ods,
      initialDate: cause.initialDate,
      communityId: cause.communityId,
      userIds: cause.userIds,
    } as CauseGraphql;
  }

  toCause(cause: Cause): CauseGraphql {
    return {
      id: cause.id.value,
      name: cause.name,
      description: cause.description,
      durationDays: cause.durationDays,
      ods: cause.ods,
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
