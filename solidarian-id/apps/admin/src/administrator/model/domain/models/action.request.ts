import { RequestAlreadyResolvedError } from '@app/admin/administrator/model/domain/errors/already-resolved.request.error';
import {
  Request,
  RequestProps,
} from '@app/admin/administrator/model/domain/models/request';
import { Either } from '@app/ddd/either';

interface RequestActionProps extends RequestProps {
  // TODO
}

export class RequestAction extends Request<RequestActionProps> {
  public approve(reason?: string): Either<RequestAlreadyResolvedError, void> {
    throw new Error('Method not implemented.');
  }
  public reject(reason: string): Either<RequestAlreadyResolvedError, void> {
    throw new Error('Method not implemented.');
  }
}
