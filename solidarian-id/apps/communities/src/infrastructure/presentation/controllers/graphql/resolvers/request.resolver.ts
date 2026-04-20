import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { RequestsService } from '@app/communities/domain/services/request.service';
import { CreateCommunityRequestInput } from '../inputs/request/create-community-request.input';
import { CreateCauseRequestInput } from '../inputs/request/create-cause-request.input';
import { CreateActionRequestInput } from '../inputs/request/create-action-request.input';
import { Request } from '../entities/request';
import { RequestGraphqlMapper } from '../mappers/request-graphql.mapper';

@Resolver(() => Request)
export class RequestResolver {
  constructor(
    private readonly requestsService: RequestsService,
    private readonly requestGraphqlMapper: RequestGraphqlMapper,
  ) {}

  @Mutation(() => String)
  async createCommunityRequest(
    @Args('createCommunityRequestInput') createCommunityRequestInput: CreateCommunityRequestInput,
  ): Promise<string> {
    const dto = this.requestGraphqlMapper.toCreateCommunityRequestDto(createCommunityRequestInput);
    const uniqueId = await this.requestsService.createCommunityRequest(dto);

    if (uniqueId.isLeft()) {
      throw uniqueId.value;
    }

    return uniqueId.value.value;
  }

  @Mutation(() => String)
  async createCauseRequest(
    @Args('createCauseRequestInput') createCauseRequestInput: CreateCauseRequestInput,
  ): Promise<string> {
    const dto = this.requestGraphqlMapper.toCreateCauseRequestDto(createCauseRequestInput);
    const uniqueId = await this.requestsService.createCauseRequest(dto);

    if (uniqueId.isLeft()) {
      throw uniqueId.value;
    }

    return uniqueId.value.value;
  }

  @Mutation(() => String)
  async createActionRequest(
    @Args('createActionRequestInput') createActionRequestInput: CreateActionRequestInput,
  ): Promise<string> {
    const dto = this.requestGraphqlMapper.toCreateActionRequestDto(createActionRequestInput);
    const uniqueId = await this.requestsService.createActionRequest(dto);

    if (uniqueId.isLeft()) {
      throw uniqueId.value;
    }

    return uniqueId.value.value;
  }

  @Query(() => Request)
  async request(@Args('id', { type: () => ID }) id: string): Promise<Request> {
    const requestOrError = await this.requestsService.getRequestById(id);

    if (requestOrError.isLeft()) {
      throw requestOrError.value;
    }

    return this.requestGraphqlMapper.toGraphqlRequest(requestOrError.value);
  }

  @Query(() => [Request])
  async getRequestsByUserId(@Args('userId', { type: () => ID }) userId: string): Promise<Request[]> {
    const requestsOrError = await this.requestsService.getRequestsByUserId(userId);

    if (requestsOrError.isLeft()) {
      throw requestsOrError.value;
    }

    return requestsOrError.value.map(request => this.requestGraphqlMapper.toGraphqlRequest(request));
  }
}
