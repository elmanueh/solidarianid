import { Action } from '@app/communities/domain/model/entities/action';
import { Cause } from '@app/communities/domain/model/entities/cause';
import { User } from '@app/communities/domain/model/entities/user';
import { ActionsRepositoryPort } from '@app/communities/domain/ports/actions.repository.port';
import { CausesService } from '@app/communities/domain/services/causes.service';
import { CommunitiesService } from '@app/communities/domain/services/communities.service';
import { Injectable, Scope } from '@nestjs/common';
import DataLoader from 'dataloader';

interface CommunityMembersData {
  creator: User;
  admins: User[];
  members: User[];
}

@Injectable({ scope: Scope.REQUEST })
export class GraphqlLoadersService {
  readonly communityMembersByCommunityId: DataLoader<string, CommunityMembersData>;
  readonly causesByCommunityId: DataLoader<string, Cause[]>;
  readonly actionsByCauseId: DataLoader<string, Action[]>;

  constructor(
    private readonly communitiesService: CommunitiesService,
    private readonly causesService: CausesService,
    private readonly actionsRepository: ActionsRepositoryPort,
  ) {
    this.communityMembersByCommunityId = new DataLoader<string, CommunityMembersData>(async communityIds => {
      const communitiesOrError = await this.communitiesService.getCommunitiesByIds([...communityIds]);

      if (communitiesOrError.isLeft()) {
        throw communitiesOrError.value;
      }

      const communitiesById = new Map(
        communitiesOrError.value.map(community => [
          community.id.value,
          {
            creator: community.creator,
            admins: [...community.admins],
            members: [...community.members],
          },
        ]),
      );

      return communityIds.map(communityId => {
        const community = communitiesById.get(communityId);

        if (!community) {
          throw new Error(`Community ${communityId} not found`);
        }

        return community;
      });
    });

    this.causesByCommunityId = new DataLoader<string, Cause[]>(async communityIds => {
      const causesOrError = await this.causesService.getAllByCommunityIds([...communityIds]);

      if (causesOrError.isLeft()) {
        throw causesOrError.value;
      }

      const causesByCommunityId = new Map<string, Cause[]>();

      for (const cause of causesOrError.value) {
        const current = causesByCommunityId.get(cause.communityId) ?? [];
        current.push(cause);
        causesByCommunityId.set(cause.communityId, current);
      }

      return communityIds.map(communityId => causesByCommunityId.get(communityId) ?? []);
    });

    this.actionsByCauseId = new DataLoader<string, Action[]>(async causeIds => {
      const actionsOrError = await this.actionsRepository.findAllByCauseIds([...causeIds]);

      if (actionsOrError.isLeft()) {
        throw actionsOrError.value;
      }

      const actionsByCauseId = new Map<string, Action[]>();

      for (const action of actionsOrError.value) {
        const current = actionsByCauseId.get(action.causeId) ?? [];
        current.push(action);
        actionsByCauseId.set(action.causeId, current);
      }

      return causeIds.map(causeId => actionsByCauseId.get(causeId) ?? []);
    });
  }
}
