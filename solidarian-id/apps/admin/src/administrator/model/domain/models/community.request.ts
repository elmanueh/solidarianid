import { RequestAlreadyResolvedError } from '@app/admin/administrator/model/domain/errors/already-resolved.request.error';
import { Request, RequestProps } from '@app/admin/administrator/model/domain/models/request';
import { Either } from '@app/ddd/either';

interface RequestCommunityProps extends RequestProps {
  // TODO
  prueba?: string;
}

export class RequestCommunity extends Request<RequestCommunityProps> {
  public approve(reason?: string): Either<RequestAlreadyResolvedError, void> {
    throw new Error('Method not implemented.' + reason);
  }
  public reject(reason: string): Either<RequestAlreadyResolvedError, void> {
    throw new Error('Method not implemented.' + reason);
  }
}
