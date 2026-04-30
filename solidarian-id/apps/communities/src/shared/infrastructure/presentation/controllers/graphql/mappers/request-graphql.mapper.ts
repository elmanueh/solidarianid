import { Request, RequestProps } from '@app/communities/shared/domain/model/entities/request';
import { CreateActionRequestInput } from '@app/communities/shared/infrastructure/presentation/controllers/graphql/inputs/requests/create-action-request.input';
import { CreateCauseRequestInput } from '@app/communities/shared/infrastructure/presentation/controllers/graphql/inputs/requests/create-cause-request.input';
import { CreateCommunityRequestInput } from '@app/communities/shared/infrastructure/presentation/controllers/graphql/inputs/requests/create-community-request.input';
import { CreateActionRequestDto } from '@app/communities/shared/infrastructure/presentation/controllers/rest/dtos/input/create-request-action.request.dto';
import { CreateCauseRequestDto } from '@app/communities/shared/infrastructure/presentation/controllers/rest/dtos/input/create-request-cause.request.dto';
import { CreateCommunityRequestDto } from '@app/communities/shared/infrastructure/presentation/controllers/rest/dtos/input/create-request-community.request.dto';
import { Injectable } from '@nestjs/common';
import { Request as GraphqlRequest } from '../entities/request';

@Injectable()
export class RequestGraphqlMapper {
  toCreateCommunityRequestDto(input: CreateCommunityRequestInput): CreateCommunityRequestDto {
    return {
      name: input.name,
      description: input.description,
      causeCreationRequests: input.causeCreationRequests.map(cause => ({
        name: cause.name,
        description: cause.description,
        ods: cause.ods,
        initialDate: cause.initialDate.toISOString(),
        durationDays: cause.durationDays,
      })),
    };
  }

  toCreateCauseRequestDto(input: CreateCauseRequestInput): CreateCauseRequestDto {
    return {
      name: input.name,
      description: input.description,
      ods: input.ods,
      initialDate: input.initialDate.toISOString(),
      durationDays: input.durationDays,
      communityId: input.communityId,
    };
  }

  toCreateActionRequestDto(input: CreateActionRequestInput): CreateActionRequestDto {
    return {
      name: input.name,
      description: input.description,
      objectives: input.objectives.map(objective => ({
        name: objective.name,
        description: objective.description,
        quantity: objective.quantity,
        unit: objective.unit,
      })),
      events: input.events.map(event => ({
        name: event.name,
        description: event.description,
        initialDate: event.initialDate.toISOString(),
        place: {
          direction: event.place.direction,
          city: event.place.city,
          countryCode: event.place.countryCode,
        },
      })),
      causeId: input.causeId,
    };
  }

  toGraphqlRequest(request: Request<RequestProps>): GraphqlRequest {
    return {
      id: request.id.value,
      type: request.type,
      name: request.name,
      description: request.description,
      status: request.status,
      reason: request.reason,
      userId: request.user.id.value,
    };
  }
}
