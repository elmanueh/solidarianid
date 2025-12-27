import { Request } from '@app/admin/administrator/model/domain/models/request';
import {
  RequestDocument,
  RequestEntity,
} from '@app/admin/administrator/model/infrastructure/persistence/entities/request.entity';
import { RequestMapper } from '@app/admin/administrator/model/infrastructure/persistence/request.mapper';
import { RequestsRepositoryPort } from '@app/admin/administrator/model/domain/ports/output/request.repository.port';
import { RepositoryMongoose } from '@app/ddd/repository/repository-mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class RequestRepositoryMongoose
  extends RepositoryMongoose<Request<any>, RequestEntity>
  implements RequestsRepositoryPort
{
  constructor(
    @InjectModel(RequestEntity.name)
    private readonly requestRepository: Model<RequestDocument>,
    private readonly requestMapper: RequestMapper,
  ) {
    super(requestRepository, requestMapper);
  }
}
