import { Cause } from '@app/communities/domain/model/entities/cause';
import { SustainableDevelopmentGoal } from '@app/value-objects/model/ods';
import { Injectable } from '@nestjs/common';
import { Cause as CauseGraphql } from '../entities/cause';
import { ActionsGraphqlMapper } from '@app/communities/infrastructure/presentation/controllers/graphql/mappers/actions-graphql.mapper';

@Injectable()
export class CausesGraphqlMapper {
  constructor(private readonly actionsGraphqlMapper: ActionsGraphqlMapper) {}

  private static readonly ODS_NUMERIC_VALUES = new Set<number>(
    Object.values(SustainableDevelopmentGoal).filter((value): value is number => typeof value === 'number'),
  );

  private static normalizeOdsValue(odsValue: unknown): SustainableDevelopmentGoal | null {
    if (typeof odsValue === 'number' && CausesGraphqlMapper.ODS_NUMERIC_VALUES.has(odsValue)) {
      return odsValue as SustainableDevelopmentGoal;
    }

    if (typeof odsValue !== 'string') {
      return null;
    }

    const normalizedValue = odsValue.trim();

    if (!normalizedValue) {
      return null;
    }

    const parsedNumericValue = Number.parseInt(normalizedValue, 10);

    if (Number.isInteger(parsedNumericValue) && CausesGraphqlMapper.ODS_NUMERIC_VALUES.has(parsedNumericValue)) {
      return parsedNumericValue as SustainableDevelopmentGoal;
    }

    if (!(normalizedValue in SustainableDevelopmentGoal)) {
      return null;
    }

    const enumValue = SustainableDevelopmentGoal[normalizedValue as keyof typeof SustainableDevelopmentGoal];

    return typeof enumValue === 'number' ? (enumValue as SustainableDevelopmentGoal) : null;
  }

  private static normalizeOdsValues(odsValues: ReadonlyArray<unknown>): SustainableDevelopmentGoal[] {
    return odsValues.reduce<SustainableDevelopmentGoal[]>((normalizedValues, odsValue) => {
      const normalizedOdsValue = CausesGraphqlMapper.normalizeOdsValue(odsValue);

      if (normalizedOdsValue !== null) {
        normalizedValues.push(normalizedOdsValue);
      }

      return normalizedValues;
    }, []);
  }

  static toCauseBaseFromDomain(cause: Cause): CauseGraphql {
    return {
      id: cause.id.value,
      name: cause.name,
      description: cause.description,
      durationDays: cause.durationDays,
      ods: CausesGraphqlMapper.normalizeOdsValues(cause.ods),
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
      ods: CausesGraphqlMapper.normalizeOdsValues(cause.ods),
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
