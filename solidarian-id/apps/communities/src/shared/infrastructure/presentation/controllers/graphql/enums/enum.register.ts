import { RequestStatus } from '@app/communities/shared/domain/model/enums/request-status';
import { RequestType } from '@app/communities/shared/domain/model/enums/request-type';
import { SustainableDevelopmentGoal } from '@app/value-objects/model/ods';
import { registerEnumType } from '@nestjs/graphql';

registerEnumType(RequestStatus, {
  name: 'RequestStatus',
});

registerEnumType(RequestType, {
  name: 'RequestType',
});

registerEnumType(SustainableDevelopmentGoal, {
  name: 'SustainableDevelopmentGoal',
});
