import { Community } from '@app/communities/domain/model/aggregates/community';
import { Cause } from '@app/communities/domain/model/entities/cause';
import { CommunitiesRepositoryPort } from '@app/communities/domain/ports/communities.repository.port';
import { CommunitiesService } from '@app/communities/domain/services/communities.service';
import { Either, left, right } from '@app/ddd/either';
import { RepositoryException } from '@app/ddd/repository/exceptions/repository.exception';
import { ValidationError } from '@app/value-objects/errors/validation/validation-error';
import { Injectable } from '@nestjs/common';
import { CommunityRequestEventDto } from '@solidarianid/kafka';
import { UsersRepositoryPort } from '@app/communities/domain/ports/users.repository.port';
import { RankingCommunitiesByUsersData } from './community-ranking.data';
import { CommunitiesQueryRepositoryPort } from '@app/communities/domain/ports/community-query.repository.port';
import { CommunityLastUsersJoinedData } from './community-last-users-joined.data';

@Injectable()
export class CommunitiesServiceImpl implements CommunitiesService {
  constructor(
    private readonly communityRepository: CommunitiesRepositoryPort,
    private readonly usersRepository: UsersRepositoryPort,
    private readonly communityQueryRepository: CommunitiesQueryRepositoryPort,
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

    return right(community);
  }

  async getCommunities(): Promise<Either<RepositoryException | ValidationError, Community[]>> {
    return await this.communityRepository.findAll(['members', 'members.user']);
  }

  async getCommunityById(id: string): Promise<Either<ValidationError, Community>> {
    return await this.communityRepository.findById(id, ['causes', 'members', 'members.user']);
  }

  async getOrderByMostUsers(limit?: number): Promise<Either<ValidationError, RankingCommunitiesByUsersData[]>> {
    return await this.communityQueryRepository.findOrderByMostUsers(limit);
  }

  async getJoinedUsersLastMonths(
    communityId: string,
    months?: number,
  ): Promise<Either<ValidationError, CommunityLastUsersJoinedData[]>> {
    return await this.communityQueryRepository.findJoinedUsersLastMonths(communityId, months);
  }
}
