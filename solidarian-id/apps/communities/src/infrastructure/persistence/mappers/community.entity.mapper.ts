import { UniqueEntityID } from '@app/value-objects/model/unique-entity-id';
import { CommunitySummary } from 'apps/communities/src/domain/model/entities/community-summary';
import { CommunityEntity } from 'apps/communities/src/infrastructure/persistence/entities/community.entity';

export class CommunityEntityMapper {
  static toCommunitySummaryDomain(
    community: CommunityEntity,
  ): CommunitySummary {
    const idOrError = UniqueEntityID.create(community.id);

    if (idOrError.isLeft()) {
      throw idOrError.value;
    }

    return CommunitySummary.create(
      { name: community.name, description: community.description },
      idOrError.value,
    );
  }
}
