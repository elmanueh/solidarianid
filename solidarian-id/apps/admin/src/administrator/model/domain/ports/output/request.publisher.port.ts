import { Request } from '@app/admin/administrator/model/domain/models/request';
import { Publisher } from '@solidarianid/kafka';

export abstract class RequestsPublisherPort extends Publisher<Request<any>> {}
