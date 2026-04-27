import { CommunityLastUsersJoinedData } from '@app/communities/application/services/data/community-last-users-joined.data';
import { RankingCommunitiesByUsersData } from '@app/communities/application/services/data/community-ranking.data';
import { ExploreCommunitiesCriteria } from '@app/communities/application/services/data/explore-communities.criteria';
import { ExploreCommunityData } from '@app/communities/application/services/data/explore-community.data';
import { ExplorePaginatedResultData } from '@app/communities/application/services/data/explore-paginated-result.data';
import { ExploreSortOrder } from '@app/communities/application/services/data/explore-sort-order';
import { CommunitiesQueryRepositoryPort } from '@app/communities/domain/ports/community-query.repository.port';
import { Either, left, right } from '@app/ddd/either';
import { RepositoryException } from '@app/ddd/repository/exceptions/repository.exception';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository as TypeOrmRepository } from 'typeorm';
import { CommunityEntity } from '../entities/community.entity';

@Injectable()
export class CommunitiesQueryTypeOrmRepositoryAdapter implements CommunitiesQueryRepositoryPort {
  constructor(
    @InjectRepository(CommunityEntity) private readonly communityRepository: TypeOrmRepository<CommunityEntity>,
  ) {}

  async findExplore(
    criteria: ExploreCommunitiesCriteria,
  ): Promise<Either<RepositoryException, ExplorePaginatedResultData<ExploreCommunityData>>> {
    const safePage = Number.isFinite(criteria.page) ? Math.max(1, Math.floor(criteria.page)) : 1;
    const safePageSize = Number.isFinite(criteria.pageSize) ? Math.max(1, Math.floor(criteria.pageSize)) : 10;
    const normalizedSearch = criteria.search?.trim().toLocaleLowerCase() ?? '';
    const sortOrder = criteria.sortOrder === ExploreSortOrder.DESC ? 'DESC' : 'ASC';

    const baseQueryBuilder = this.communityRepository.createQueryBuilder('community');

    if (normalizedSearch) {
      baseQueryBuilder.where('LOWER(community.name) LIKE :search', {
        search: `%${normalizedSearch}%`,
      });
    }

    let total: number;

    try {
      total = await baseQueryBuilder.getCount();
    } catch (error) {
      return left(new RepositoryException('Failed to count communities for explore query', error));
    }

    const totalPages = Math.max(1, Math.ceil(total / safePageSize));
    const boundedPage = Math.min(safePage, totalPages);
    const offset = (boundedPage - 1) * safePageSize;

    const queryBuilder = baseQueryBuilder
      .clone()
      .orderBy('community.name', sortOrder)
      .addOrderBy('community.id', 'ASC')
      .skip(offset)
      .take(safePageSize);

    let communities: CommunityEntity[];

    try {
      communities = await queryBuilder.getMany();
    } catch (error) {
      return left(new RepositoryException('Failed to retrieve communities for explore query', error));
    }

    return right({
      items: communities.map(community => ({
        id: community.id,
        name: community.name,
        description: community.description,
      })),
      total,
      page: boundedPage,
      pageSize: safePageSize,
      totalPages,
    });
  }

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
