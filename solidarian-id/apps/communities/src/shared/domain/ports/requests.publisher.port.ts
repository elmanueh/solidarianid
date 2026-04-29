import { Publisher } from '@solidarianid/kafka';
import { ActionRequest } from '../model/entities/request-action';
import { CauseRequest } from '../model/entities/request-cause';
import { CommunityRequest } from '../model/entities/request-community';

export type AnyRequest = CommunityRequest | CauseRequest | ActionRequest;

export abstract class RequestPublisherPort extends Publisher<AnyRequest> {}
