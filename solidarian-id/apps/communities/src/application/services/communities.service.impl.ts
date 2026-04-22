import { Community } from '@app/communities/domain/model/aggregates/community';
import { Cause } from '@app/communities/domain/model/entities/cause';
import { CommunitiesPublisherPort } from '@app/communities/domain/ports/communities.publisher.port';
import { CommunitiesRepositoryPort } from '@app/communities/domain/ports/communities.repository.port';
import { CommunitiesQueryRepositoryPort } from '@app/communities/domain/ports/community-query.repository.port';
import { UsersRepositoryPort } from '@app/communities/domain/ports/users.repository.port';
import { CommunitiesService } from '@app/communities/domain/services/communities.service';
import { Either, left, right } from '@app/ddd/either';
import { ConflictError } from '@app/ddd/errors/conflict-error';
import { RepositoryException } from '@app/ddd/repository/exceptions/repository.exception';
import { ValidationError } from '@app/value-objects/errors/validation/validation-error';
import { Injectable } from '@nestjs/common';
import { CommunityRequestEventDto, EventType } from '@solidarianid/kafka';
import { CommunityLastUsersJoinedData } from './community-last-users-joined.data';
import { ExploreCommunitiesCriteria } from './explore-communities.criteria';
import { ExploreCommunityData } from './explore-community.data';
import { ExplorePaginatedResultData } from './explore-paginated-result.data';
import { RankingCommunitiesByUsersData } from './community-ranking.data';

@Injectable()
export class CommunitiesServiceImpl implements CommunitiesService {
  constructor(
    private readonly communityRepository: CommunitiesRepositoryPort,
    private readonly usersRepository: UsersRepositoryPort,
    private readonly communityQueryRepository: CommunitiesQueryRepositoryPort,
    private readonly communitiesPublisher: CommunitiesPublisherPort,
  ) {}

  async create(
    communityDto: CommunityRequestEventDto,
  ): Promise<Either<ValidationError | RepositoryException, Community>> {
    const userOrError = await this.usersRepository.findById(communityDto.userId);

    if (userOrError.isLeft()) {
      return left(userOrError.value);
    }

    const communityOrError = Community.create(
      {
        name: communityDto.name,
        description: communityDto.description,
        creator: userOrError.value,
        admins: [],
        members: [userOrError.value],
        causes: [],
      },
      communityDto.id,
    );

    if (communityOrError.isLeft()) {
      return left(communityOrError.value);
    }

    const community = communityOrError.value;

    for (const causeRequest of communityDto.causeRequests) {
      const causeOrError = Cause.create({
        name: causeRequest.name,
        description: causeRequest.description,
        initialDate: new Date(causeRequest.initialDate),
        durationDays: causeRequest.durationDays,
        ods: causeRequest.ods,
        actions: [],
        communityId: community.id.value,
        userIds: [communityDto.userId],
      });

      if (causeOrError.isLeft()) {
        return left(causeOrError.value);
      }

      community.add(causeOrError.value);
    }

    const saveResult = await this.communityRepository.save(community);

    if (saveResult.isLeft()) {
      return left(saveResult.value);
    }

    await this.communitiesPublisher.publish(EventType.COMMUNITY_CREATED, community);

    return right(community);
  }

  async getCommunities(): Promise<Either<RepositoryException | ValidationError, Community[]>> {
    return await this.communityRepository.findAll(['members', 'members.user']);
  }

  async getExploreCommunities(
    criteria: ExploreCommunitiesCriteria,
  ): Promise<Either<ValidationError | RepositoryException, ExplorePaginatedResultData<ExploreCommunityData>>> {
    return await this.communityQueryRepository.findExplore(criteria);
  }

  async getCommunityById(
    id: string,
    relations: string[] = ['members', 'members.user'],
  ): Promise<Either<ValidationError, Community>> {
    return await this.communityRepository.findById(id, relations);
  }

  async getCommunitiesByIds(
    ids: string[],
    relations: string[] = ['members', 'members.user'],
  ): Promise<Either<ValidationError | RepositoryException, Community[]>> {
    return await this.communityRepository.findAllByIds(ids, relations);
  }

  async getOrderByMostUsers(
    limit?: number,
  ): Promise<Either<ValidationError | RepositoryException, RankingCommunitiesByUsersData[]>> {
    return await this.communityQueryRepository.findOrderByMostUsers(limit);
  }

  async getJoinedUsersLastMonths(
    communityId: string,
    months?: number,
  ): Promise<Either<ValidationError | RepositoryException, CommunityLastUsersJoinedData[]>> {
    return await this.communityQueryRepository.findJoinedUsersLastMonths(communityId, months);
  }

  async joinCommunity(
    communityId: string,
    userId: string,
  ): Promise<Either<ValidationError | RepositoryException, void>> {
    const communityOrError = await this.communityRepository.findById(communityId, ['members', 'members.user']);

    if (communityOrError.isLeft()) {
      return left(communityOrError.value);
    }

    const userOrError = await this.usersRepository.findById(userId);

    if (userOrError.isLeft()) {
      return left(userOrError.value);
    }

    if (communityOrError.value.hasMember(userOrError.value)) {
      return left(new ConflictError('User is already a member of the community'));
    }
    communityOrError.value.addMember(userOrError.value);

    const saveResult = await this.communityRepository.save(communityOrError.value);

    if (saveResult.isLeft()) {
      return left(saveResult.value);
    }

    await this.communitiesPublisher.publish(EventType.COMMUNITY_MEMBER_JOINED, communityOrError.value);

    return right(saveResult.value);
  }
}
