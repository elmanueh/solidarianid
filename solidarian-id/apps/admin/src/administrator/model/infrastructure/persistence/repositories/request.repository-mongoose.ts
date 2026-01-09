import { Request } from '@app/admin/administrator/model/domain/models/request';
import {
  RequestDocument,
  RequestEntity,
} from '@app/admin/administrator/model/infrastructure/persistence/entities/request.entity';
import { RequestMapper } from '@app/admin/administrator/model/infrastructure/persistence/mappers/request.mapper';
import { RequestsRepositoryPort } from '@app/admin/administrator/model/domain/ports/output/request.repository.port';
import { RepositoryMongoose } from '@app/ddd/repository/repository-mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Either, left, right, sequence } from '@app/ddd/either';
import { RepositoryException } from '@app/ddd/repository/exceptions/repository.exception';
import { RequestType } from '@app/admin/administrator/model/domain/enums/request-type';
import { EntityNotFoundException } from '@app/ddd/repository/exceptions/entity-not-found.exception';
import { CauseRequest } from '@app/admin/administrator/model/domain/models/cause-request';
import { CommunityRequest } from '@app/admin/administrator/model/domain/models/community-request';
import { CommunityRequestEntity } from '@app/admin/administrator/model/infrastructure/persistence/entities/community-request.entity';
import { CauseRequestEntity } from '@app/admin/administrator/model/infrastructure/persistence/entities/cause-request.entity';
import { ActionRequestEntity } from '@app/admin/administrator/model/infrastructure/persistence/entities/action-request.entity';
import { ActionRequest } from '@app/admin/administrator/model/domain/models/action-request';
import { RequestStatus } from '../../../domain/enums/request-status';

@Injectable()
export class RequestRepositoryMongoose
  extends RepositoryMongoose<Request<unknown>, RequestEntity>
  implements RequestsRepositoryPort
{
  constructor(
    @InjectModel(RequestEntity.name)
    private readonly requestModel: Model<RequestDocument>,
    private readonly requestMapper: RequestMapper,
  ) {
    super(requestModel, requestMapper);
  }

  override async save(model: Request<unknown>): Promise<Either<RepositoryException, void>> {
    try {
      if (model instanceof CommunityRequest) {
        return this.saveCommunityRequest(model);
      }

      if (model instanceof CauseRequest) {
        return this.saveCauseRequest(model);
      }

      const entity = this.requestMapper.toPersistence(model);
      await this.requestModel.replaceOne({ _id: entity._id }, entity, { upsert: true });

      return right(undefined);
    } catch (error: unknown) {
      return left(new RepositoryException('Failed to save request.', error));
    }
  }

  private async saveCommunityRequest(community: CommunityRequest): Promise<Either<RepositoryException, void>> {
    const payload = this.requestMapper.toPersistenceAggregate(community);

    await this.requestModel.replaceOne({ _id: payload.community._id }, payload.community, { upsert: true });

    for (const cause of payload.causes) {
      await this.requestModel.replaceOne({ _id: cause._id }, cause, { upsert: true });
    }

    for (const action of payload.actions) {
      await this.requestModel.replaceOne({ _id: action._id }, action, { upsert: true });
    }

    await this.cleanupDeletedCausesAndActions(payload);

    return right(undefined);
  }

  private async cleanupDeletedCausesAndActions(payload: {
    community: CommunityRequestEntity;
    causes: CauseRequestEntity[];
    actions: ActionRequestEntity[];
  }): Promise<void> {
    const communityId = payload.community._id;
    const domainCauseIds = new Set(payload.causes.map(c => c._id));
    const domainActionIds = new Set(payload.actions.map(a => a._id));

    const dbCauses = await this.requestModel.find({ type: RequestType.CAUSE, communityId }, { _id: 1 }).lean().exec();

    const causesToDelete = dbCauses.map(d => String(d._id)).filter(id => !domainCauseIds.has(id));

    if (causesToDelete.length) {
      await this.requestModel.deleteMany({ type: RequestType.ACTION, causeId: { $in: causesToDelete } });
      await this.requestModel.deleteMany({ type: RequestType.CAUSE, _id: { $in: causesToDelete } });
    }

    if (payload.causes.length) {
      const currentCauseIds = payload.causes.map(c => c._id);
      const dbActions = await this.requestModel
        .find({ type: RequestType.ACTION, causeId: { $in: currentCauseIds } }, { _id: 1 })
        .lean()
        .exec();

      const actionsToDelete = dbActions.map(d => String(d._id)).filter(id => !domainActionIds.has(id));

      if (actionsToDelete.length) {
        await this.requestModel.deleteMany({ type: RequestType.ACTION, _id: { $in: actionsToDelete } });
      }
    }
  }

  private async saveCauseRequest(cause: CauseRequest): Promise<Either<RepositoryException, void>> {
    const { cause: causeDoc, actions: actionDocs } = this.requestMapper.toPersistenceCauseAggregate(cause);

    await this.requestModel.replaceOne({ _id: causeDoc._id }, causeDoc, { upsert: true });

    for (const action of actionDocs) {
      await this.requestModel.replaceOne({ _id: action._id }, action, { upsert: true });
    }

    const domainActionIds = new Set(actionDocs.map(a => a._id));
    const dbActions = await this.requestModel
      .find({ type: RequestType.ACTION, causeId: cause.id.value }, { _id: 1 })
      .lean()
      .exec();

    const actionsToDelete = dbActions.map(d => String(d._id)).filter(id => !domainActionIds.has(id));

    if (actionsToDelete.length) {
      await this.requestModel.deleteMany({ type: RequestType.ACTION, _id: { $in: actionsToDelete } });
    }

    return right(undefined);
  }

  override async remove(id: string): Promise<Either<RepositoryException, void>> {
    try {
      const root = await this.requestModel.findById(id, { _id: 1, type: 1 }).lean().exec();
      if (!root) return left(new EntityNotFoundException('Request not found for removal.', id));

      if (root.type === RequestType.COMMUNITY) {
        const causes = await this.requestModel
          .find({ type: RequestType.CAUSE, communityId: id }, { _id: 1 })
          .lean()
          .exec();
        const causeIds = causes.map(c => String(c._id));
        if (causeIds.length) {
          await this.requestModel.deleteMany({ type: RequestType.ACTION, causeId: { $in: causeIds } });
          await this.requestModel.deleteMany({ type: RequestType.CAUSE, _id: { $in: causeIds } });
        }
        await this.requestModel.deleteOne({ _id: id, type: RequestType.COMMUNITY });
        return right(undefined);
      }

      if (root.type === RequestType.CAUSE) {
        await this.requestModel.deleteMany({ type: RequestType.ACTION, causeId: String(root._id) });
        await this.requestModel.deleteOne({ _id: id, type: RequestType.CAUSE });
        return right(undefined);
      }

      return super.remove(id);
    } catch (error) {
      return left(new RepositoryException('Failed to remove request.', error));
    }
  }

  override async findById(
    id: string,
  ): Promise<Either<RepositoryException | EntityNotFoundException, Request<unknown>>> {
    try {
      const root = await this.requestModel.findById(id).lean().exec();
      if (!root) return left(new EntityNotFoundException(this.requestModel.modelName, id));

      if (root.type === RequestType.COMMUNITY) {
        const causes = await this.requestModel.find({ type: RequestType.CAUSE, communityId: id }).lean().exec();
        const causeIds = causes.map(c => String(c._id));

        const actions = causeIds.length
          ? await this.requestModel
              .find({ type: RequestType.ACTION, causeId: { $in: causeIds } })
              .lean()
              .exec()
          : [];

        return this.requestMapper.fromPersistenceAggregate(
          root as unknown as CommunityRequestEntity,
          causes as unknown as CauseRequestEntity[],
          actions as unknown as ActionRequestEntity[],
        );
      }

      if (root.type === RequestType.CAUSE) {
        const actions = await this.requestModel
          .find({ type: RequestType.ACTION, causeId: String(root._id) })
          .lean()
          .exec();

        return this.requestMapper.fromPersistenceCauseAggregate(
          root as unknown as CauseRequestEntity,
          actions as unknown as ActionRequestEntity[],
        );
      }

      return this.requestMapper.fromPersistence(root as RequestEntity);
    } catch (error: unknown) {
      return left(new RepositoryException('Failed to find request.', error));
    }
  }

  async findByStatusAndType(
    status: RequestStatus,
    type: RequestType,
  ): Promise<Either<RepositoryException, Request<unknown>[]>> {
    const documents = await this.requestModel.find({ status, type }).lean().exec();

    const requestsOrError = sequence(
      documents.map(document => this.requestMapper.fromPersistence(document as RequestEntity)),
    );

    if (requestsOrError.isLeft()) {
      return left(new RepositoryException('Failed to map requests from persistence', requestsOrError.value));
    }

    return right(requestsOrError.value);
  }

  async findPendingCommunityRequests(): Promise<Either<RepositoryException, CommunityRequest[]>> {
    try {
      const communityDocs = await this.requestModel
        .aggregate<CommunityRequestEntity & { causes: CauseRequestEntity[]; actions: ActionRequestEntity[] }>([
          { $match: { status: 'pending', type: RequestType.COMMUNITY } },
          {
            $lookup: {
              from: this.requestModel.collection.name,
              let: { communityId: '$_id' },
              pipeline: [{ $match: { $expr: { $eq: ['$communityId', '$$communityId'] }, type: RequestType.CAUSE } }],
              as: 'causes',
            },
          },
          {
            $lookup: {
              from: this.requestModel.collection.name,
              let: { causeIds: { $map: { input: '$causes', as: 'cause', in: '$$cause._id' } } },
              pipeline: [{ $match: { $expr: { $in: ['$causeId', '$$causeIds'] }, type: RequestType.ACTION } }],
              as: 'actions',
            },
          },
        ])
        .exec();

      const requestsOrErrors = communityDocs.map(doc =>
        this.requestMapper.fromPersistenceAggregate(doc, doc.causes, doc.actions),
      );

      const requestsOrError = sequence(requestsOrErrors);
      if (requestsOrError.isLeft()) {
        return left(new RepositoryException('Failed to map requests.', requestsOrError.value));
      }

      return right(requestsOrError.value);
    } catch (error: unknown) {
      return left(new RepositoryException('Failed to find pending community requests.', error));
    }
  }

  async findPendingCauseRequests(): Promise<Either<RepositoryException, CauseRequest[]>> {
    try {
      const causeDocs = await this.requestModel
        .aggregate<CauseRequestEntity & { actions: ActionRequestEntity[] }>([
          {
            $match: { status: 'approved', type: RequestType.COMMUNITY },
          },
          {
            $lookup: {
              from: this.requestModel.collection.name,
              let: { communityId: '$_id' },
              pipeline: [
                {
                  $match: {
                    $expr: { $eq: ['$communityId', '$$communityId'] },
                    status: 'pending',
                    type: RequestType.CAUSE,
                  },
                },
              ],
              as: 'causes',
            },
          },
          {
            $unwind: '$causes',
          },
          {
            $replaceRoot: { newRoot: '$causes' },
          },
          {
            $lookup: {
              from: this.requestModel.collection.name,
              let: { causeId: '$_id' },
              pipeline: [
                {
                  $match: {
                    $expr: { $eq: ['$causeId', '$$causeId'] },
                    type: RequestType.ACTION,
                  },
                },
              ],
              as: 'actions',
            },
          },
        ])
        .exec();

      const requestsOrErrors = causeDocs.map(doc => this.requestMapper.fromPersistenceCauseAggregate(doc, doc.actions));

      const requestsOrError = sequence(requestsOrErrors);
      if (requestsOrError.isLeft()) {
        return left(new RepositoryException('Failed to map cause requests.', requestsOrError.value));
      }

      return right(requestsOrError.value);
    } catch (error: unknown) {
      return left(new RepositoryException('Failed to find pending cause requests.', error));
    }
  }

  async findPendingActionRequests(): Promise<Either<RepositoryException, ActionRequest[]>> {
    try {
      const actionDocs = await this.requestModel
        .aggregate<ActionRequestEntity>([
          {
            $match: { status: 'approved', type: RequestType.CAUSE },
          },
          {
            $lookup: {
              from: this.requestModel.collection.name,
              let: { causeId: '$_id' },
              pipeline: [
                {
                  $match: {
                    $expr: { $eq: ['$causeId', '$$causeId'] },
                    status: 'pending',
                    type: RequestType.ACTION,
                  },
                },
              ],
              as: 'actions',
            },
          },
          {
            $unwind: '$actions',
          },
          {
            $replaceRoot: { newRoot: '$actions' },
          },
        ])
        .exec();

      const requestsOrErrors = actionDocs.map(
        doc => this.requestMapper.fromPersistence(doc) as Either<RepositoryException, ActionRequest>,
      );

      const requestsOrError = sequence(requestsOrErrors);
      if (requestsOrError.isLeft()) {
        return left(new RepositoryException('Failed to map action requests.', requestsOrError.value));
      }

      return right(requestsOrError.value);
    } catch (error: unknown) {
      return left(new RepositoryException('Failed to find pending action requests.', error));
    }
  }
}
