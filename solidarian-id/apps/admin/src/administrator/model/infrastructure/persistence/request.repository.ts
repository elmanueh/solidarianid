import { Request } from '@app/admin/administrator/model/domain/models/request';
import { Repository } from '@app/ddd/repository/repository';

export abstract class RequestsRepository extends Repository<Request<any>> {}
