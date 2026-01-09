import { RequestStatus } from '@app/admin/administrator/model/domain/enums/request-status';
import { ActionRequest } from '@app/admin/administrator/model/domain/models/action-request';
import { CauseRequest } from '@app/admin/administrator/model/domain/models/cause-request';
import { CommunityRequest } from '@app/admin/administrator/model/domain/models/community-request';
import { Request } from '@app/admin/administrator/model/domain/models/request';
import { Either } from '@app/ddd/either';
import { RepositoryException } from '@app/ddd/repository/exceptions/repository.exception';
import { ValidationError } from '@app/value-objects/errors/validation/validation-error';
import { RequestEventDto } from '@solidarianid/kafka';
import { CauseGroupByOdsData } from '../../application/data/cause-group-by-ods.data';
import { RequestType } from '../enums/request-type';

export abstract class RequestsService {
  abstract createRequest(props: RequestEventDto): Promise<Either<RepositoryException | ValidationError, Request<any>>>;

  abstract updateStatus(
    id: string,
    status: RequestStatus,
    reason?: string,
  ): Promise<Either<RepositoryException | ValidationError, void>>;

  abstract getCountByStatusAndType(
    status: RequestStatus,
    type: RequestType,
  ): Promise<Either<RepositoryException, number>>;

  abstract getCommunityRequestsPending(): Promise<Either<ValidationError, CommunityRequest[]>>;

  abstract getCauseRequestsPending(): Promise<Either<ValidationError, CauseRequest[]>>;

  abstract getActionRequestsPending(): Promise<Either<ValidationError, ActionRequest[]>>;

  abstract getCausesGroupByOds(): Promise<Either<RepositoryException, CauseGroupByOdsData[]>>;
}
