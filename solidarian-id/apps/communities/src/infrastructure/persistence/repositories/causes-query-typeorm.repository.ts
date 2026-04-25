import { ExploreCauseData } from '@app/communities/application/services/explore-cause.data';
import { ExploreCausesCriteria } from '@app/communities/application/services/explore-causes.criteria';
import { ExplorePaginatedResultData } from '@app/communities/application/services/explore-paginated-result.data';
import { ExploreSortOrder } from '@app/communities/application/services/explore-sort-order';
import { CausesQueryRepositoryPort } from '@app/communities/domain/ports/causes-query.repository.port';
import { Either, left, right } from '@app/ddd/either';
import { RepositoryException } from '@app/ddd/repository/exceptions/repository.exception';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository as TypeOrmRepository } from 'typeorm';
import { CauseEntity } from '../entities/cause.entity';

@Injectable()
export class CausesQueryTypeOrmRepositoryAdapter implements CausesQueryRepositoryPort {
  constructor(@InjectRepository(CauseEntity) private readonly causeRepository: TypeOrmRepository<CauseEntity>) {}

  async findExplore(
    criteria: ExploreCausesCriteria,
  ): Promise<Either<RepositoryException, ExplorePaginatedResultData<ExploreCauseData>>> {
    const safePage = Number.isFinite(criteria.page) ? Math.max(1, Math.floor(criteria.page)) : 1;
    const safePageSize = Number.isFinite(criteria.pageSize) ? Math.max(1, Math.floor(criteria.pageSize)) : 10;
    const normalizedSearch = criteria.search?.trim().toLocaleLowerCase() ?? '';
    const sortOrder = criteria.sortOrder === ExploreSortOrder.DESC ? 'DESC' : 'ASC';

    const baseQueryBuilder = this.causeRepository.createQueryBuilder('cause');

    if (normalizedSearch) {
      baseQueryBuilder.where('LOWER(cause.name) LIKE :search', {
        search: `%${normalizedSearch}%`,
      });
    }

    if (criteria.ods && criteria.ods.length > 0) {
      const odsCondition = `EXISTS (
        SELECT 1
        FROM jsonb_array_elements_text(cause.ods::jsonb) AS ods_value
        WHERE (ods_value)::int IN (:...ods)
      )`;

      if (normalizedSearch) {
        baseQueryBuilder.andWhere(odsCondition, { ods: criteria.ods });
      } else {
        baseQueryBuilder.where(odsCondition, { ods: criteria.ods });
      }
    }

    let total: number;

    try {
      total = await baseQueryBuilder.getCount();
    } catch (error) {
      return left(new RepositoryException('Failed to count causes for explore query', error));
    }

    const totalPages = Math.max(1, Math.ceil(total / safePageSize));
    const boundedPage = Math.min(safePage, totalPages);
    const offset = (boundedPage - 1) * safePageSize;

    const queryBuilder = baseQueryBuilder
      .clone()
      .orderBy('cause.name', sortOrder)
      .addOrderBy('cause.id', 'ASC')
      .skip(offset)
      .take(safePageSize);

    let causes: CauseEntity[];

    try {
      causes = await queryBuilder.getMany();
    } catch (error) {
      return left(new RepositoryException('Failed to retrieve causes for explore query', error));
    }

    return right({
      items: causes.map(cause => ({
        id: cause.id,
        communityId: cause.communityId,
        name: cause.name,
        description: cause.description,
        ods: cause.ods,
      })),
      total,
      page: boundedPage,
      pageSize: safePageSize,
      totalPages,
    });
  }
}
