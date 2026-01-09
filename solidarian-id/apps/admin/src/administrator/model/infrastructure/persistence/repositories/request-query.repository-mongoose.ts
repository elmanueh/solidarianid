import { Either, left, right } from '@app/ddd/either';
import { RepositoryException } from '@app/ddd/repository/exceptions/repository.exception';
import { RequestsQueryRepositoryPort } from '../../../domain/ports/output/request-query.repository.port';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { RequestDocument, RequestEntity } from '../entities/request.entity';
import { Model } from 'mongoose';
import { RequestStatus } from '../../../domain/enums/request-status';
import { RequestType } from '@app/communities/domain/model/enums/request-type';
import { CauseGroupByOdsData } from '../../../application/services/data/cause-group-by-ods.data';

@Injectable()
export class RequestsQueryMongooseRepository extends RequestsQueryRepositoryPort {
  constructor(
    @InjectModel(RequestEntity.name)
    private readonly requestModel: Model<RequestDocument>,
  ) {
    super();
  }
  async findCausesGroupByOds(): Promise<Either<RepositoryException, CauseGroupByOdsData[]>> {
    let causesGrouped: CauseGroupByOdsData[];
    try {
      causesGrouped = await this.requestModel.aggregate<CauseGroupByOdsData>([
        { $match: { $and: [{ type: RequestType.CAUSE }, { status: RequestStatus.APPROVED }] } },
        { $unwind: '$ods' },
        { $group: { _id: '$ods', causeCount: { $sum: 1 } } },
        { $project: { _id: 0, ods: '$_id', causeCount: 1 } },
        { $sort: { ods: 1 } },
      ]);
    } catch (error) {
      return left(new RepositoryException('Failed to retrieve causes grouped by ODS', error));
    }
    return right(causesGrouped);
  }
}
