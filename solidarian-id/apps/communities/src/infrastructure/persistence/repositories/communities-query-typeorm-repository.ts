import { Either, left, right } from '@app/ddd/either';
import { RepositoryException } from '@app/ddd/repository/exceptions/repository.exception';
import { RankingCommunitiesByUsersData } from '@app/communities/application/services/community-ranking.data';
import { CommunitiesQueryRepositoryPort } from '@app/communities/domain/ports/community-query-repository-port';
import { InjectRepository } from '@nestjs/typeorm';
import { CommunityEntity } from '../entities/community.entity';
import { Repository as TypeOrmRepository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { CommunityLastUsersJoinedData } from '@app/communities/application/services/community-last-users-joined.data';

@Injectable()
export class CommunitiesQueryTypeOrmRepositoryAdapter implements CommunitiesQueryRepositoryPort {
  constructor(
    @InjectRepository(CommunityEntity) private readonly communityRepository: TypeOrmRepository<CommunityEntity>,
  ) {}

  async findOrderByMostUsers(limit?: number): Promise<Either<RepositoryException, RankingCommunitiesByUsersData[]>> {
    const queryBuilder = this.communityRepository
      .createQueryBuilder('community')
      .select('community.id', 'communityId')
      .addSelect('community.name', 'communityName')
      .innerJoin('community.members', 'cm')
      .addSelect('COUNT(cm.userId)', 'userCount')
      .groupBy('community.id')
      .orderBy('COUNT(cm.userId)::int', 'DESC');

    if (limit) {
      queryBuilder.limit(limit);
    }

    let communityEntitiesData: RankingCommunitiesByUsersData[];

    try {
      communityEntitiesData = await queryBuilder.getRawMany<RankingCommunitiesByUsersData>();
    } catch (error) {
      return left(new RepositoryException('Failed to retrieve communities ordered by most users', error));
    }

    return right(
      communityEntitiesData.map(data => ({
        communityId: data.communityId,
        communityName: data.communityName,
        userCount: Number(data.userCount),
      })),
    );
  }

  async findJoinedUsersLastMonths(
    communityId: string,
    months: number = 12,
  ): Promise<Either<RepositoryException, CommunityLastUsersJoinedData[]>> {
    const queryBuilder = this.communityRepository
      .createQueryBuilder('community')
      .leftJoinAndSelect('community.members', 'cm')
      .where('cm.communityId = :communityId', { communityId })
      .select(`to_char(date_trunc('month', cm.joinedAt), 'YYYY-MM')`, 'month')
      .addSelect('COUNT(*)', 'userCount')
      .addSelect('community.name', 'communityName')
      .groupBy(`to_char(date_trunc('month', cm.joinedAt), 'YYYY-MM')`)
      .addGroupBy('community.name')
      .orderBy(`to_char(date_trunc('month', cm.joinedAt), 'YYYY-MM')`, 'DESC')
      .limit(months);

    let communityEntitiesData: CommunityLastUsersJoinedData[];
    try {
      communityEntitiesData = await queryBuilder.getRawMany<CommunityLastUsersJoinedData>();
    } catch (error) {
      return left(new RepositoryException('Failed to retrieve communities ordered by most users', error));
    }

    return right(
      communityEntitiesData.map(data => ({
        communityName: data.communityName,
        month: data.month,
        userCount: Number(data.userCount),
      })),
    );
  }
}
