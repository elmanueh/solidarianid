import { RankingCommunitiesByUsersData } from "@app/communities/application/services/community-ranking.data";
import { Community } from "@app/communities/domain/model/aggregates/community";
import { CommunitiesService } from "@app/communities/domain/services/communities.service";
import { CommunityDomainMapper } from "@app/communities/infrastructure/presentation/mappers/community.mapper";
import { BadRequestException, Controller } from "@nestjs/common";
import {
  CommunitiesServiceController,
  CommunitiesServiceControllerMethods,
  CommunityCriteria,
  GetCommunitiesRequest,
  GetCommunitiesResponse,
  GetCommunityUsersRequest,
  GetCommunityUsersResponse,
} from "@solidarianid/grpc";


@Controller()
@CommunitiesServiceControllerMethods()
export class CommunitiesControllerGrpc implements CommunitiesServiceController {

  constructor(private readonly communitiesService: CommunitiesService) { }

  async getCommunities(request: GetCommunitiesRequest): Promise<GetCommunitiesResponse> {
    const { criteria, limit } = request;

    if (limit !== undefined && limit <= 0) {
      throw new BadRequestException("limit must be greater than 0");
    }

    if (criteria === CommunityCriteria.COMMUNITY_CRITERIA_MOST_USERS) {
      return await this.getCommunitiesOrderByMostUsers(limit);
    }

    const communities = await this.communitiesService.getCommunities();

    if (communities.isLeft()) {
      throw communities.value;
    }

    const communityDtos = communities.value.map((community: Community) =>
      CommunityDomainMapper.toCommunitySummaryDto(community),
    );

    return {
      result: {
        $case: "summaries",
        summaries: {
          items: communityDtos,
        },
      },
    };
  }

  private async getCommunitiesOrderByMostUsers(limit?: number): Promise<GetCommunitiesResponse> {
    const communities = await this.communitiesService.getOrderByMostUsers(limit);

    if (communities.isLeft()) {
      throw communities.value;
    }

    const communityDtos = communities.value.map((community: RankingCommunitiesByUsersData) =>
      CommunityDomainMapper.toRankingCommunitiesByUsersDto(community),
    );

    return {
      result: {
        $case: "ranking",
        ranking: {
          items: communityDtos,
        },
      },
    };
  }

  async getCommunityUsers(request: GetCommunityUsersRequest): Promise<GetCommunityUsersResponse> {
    const { communityId, months } = request;

    if (!this.isValidUuid(communityId)) {
      throw new BadRequestException("communityId must be a valid UUID");
    }

    if (months !== undefined && months <= 0) {
      throw new BadRequestException("months must be greater than 0");
    }

    const joinedUsersData = await this.communitiesService.getJoinedUsersLastMonths(communityId, months);

    if (joinedUsersData.isLeft()) {
      throw joinedUsersData.value;
    }

    return CommunityDomainMapper.toCommunityLastUsersJoinedSummaryResponseDto(joinedUsersData.value);
  }

  private isValidUuid(value: string): boolean {
    const uuidV4Pattern =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

    return typeof value === "string" && uuidV4Pattern.test(value);
  }
}