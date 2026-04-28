import { Cause } from '@app/communities/causes/infrastructure/presentation/controllers/graphql/entities/cause';
import { CausesGraphqlMapper } from '@app/communities/causes/infrastructure/presentation/controllers/graphql/mappers/causes-graphql.mapper';
import { Community } from '@app/communities/communities/infrastructure/presentation/controllers/graphql/entities/community';
import { CommunitiesGraphqlMapper } from '@app/communities/communities/infrastructure/presentation/controllers/graphql/mappers/communities-graphql.mapper';
import { CommunitiesService } from '@app/communities/shared/domain/services/communities.service';
import { User } from '@app/communities/shared/infrastructure/presentation/controllers/graphql/entities/user';
import { GraphqlLoadersService } from '@app/communities/shared/infrastructure/presentation/controllers/graphql/loaders/graphql-loaders.service';
import { UserGraphqlMapper } from '@app/communities/shared/infrastructure/presentation/controllers/graphql/mappers/user-graphql.mapper';
import { ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { Args, ID, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import {
  CommunityMembershipPolicy,
  Resource,
  Action as SecurityAction,
  UsersPolicy,
} from '@solidarianid/security/core';
import { AuthorizationGuard, Authorize, CurrentUser, JwtAuthGuard } from '@solidarianid/security/nestjs';

@Resolver(() => Community)
export class CommunitiesResolver {
  constructor(
    private readonly communitiesService: CommunitiesService,
    private readonly communitiesGraphqlMapper: CommunitiesGraphqlMapper,
    private readonly userGraphqlMapper: UserGraphqlMapper,
    private readonly causesGraphqlMapper: CausesGraphqlMapper,
    private readonly graphqlLoaders: GraphqlLoadersService,
  ) {}

  @Query(() => [Community])
  @UseGuards(JwtAuthGuard)
  async communities(): Promise<Community[]> {
    const communitiesOrError = await this.communitiesService.getCommunities();
    if (communitiesOrError.isLeft()) throw communitiesOrError.value;

    return communitiesOrError.value.map(community => this.communitiesGraphqlMapper.toCommunityBase(community));
  }

  @Query(() => Community)
  @UseGuards(JwtAuthGuard)
  async community(@Args('id', { type: () => ID }, new ParseUUIDPipe()) id: string): Promise<Community> {
    const communityOrError = await this.communitiesService.getCommunityById(id);
    if (communityOrError.isLeft()) throw communityOrError.value;

    return this.communitiesGraphqlMapper.toCommunityBase(communityOrError.value);
  }

  @Query(() => [Community])
  @UseGuards(JwtAuthGuard, AuthorizationGuard)
  @Authorize({
    action: SecurityAction.READ,
    resource: Resource.USER,
    policy: UsersPolicy.SELF_ONLY,
    entityId: 'userId',
  })
  async userMemberCommunities(
    @Args('userId', { type: () => ID }, new ParseUUIDPipe()) userId: string,
  ): Promise<Community[]> {
    const communitiesOrError = await this.communitiesService.getUserMemberCommunities(userId);

    if (communitiesOrError.isLeft()) {
      throw communitiesOrError.value;
    }

    return communitiesOrError.value.map(community => this.communitiesGraphqlMapper.toCommunityBase(community));
  }

  @ResolveField(() => User)
  async creator(@Parent() community: Community): Promise<User> {
    const membersData = await this.graphqlLoaders.communityMembersByCommunityId.load(community.id);

    return this.userGraphqlMapper.toUser(membersData.creator);
  }

  @ResolveField(() => [User])
  async admins(@Parent() community: Community): Promise<User[]> {
    const membersData = await this.graphqlLoaders.communityMembersByCommunityId.load(community.id);

    return membersData.admins.map(admin => this.userGraphqlMapper.toUser(admin));
  }

  @ResolveField(() => [User])
  async members(@Parent() community: Community): Promise<User[]> {
    const membersData = await this.graphqlLoaders.communityMembersByCommunityId.load(community.id);

    return membersData.members.map(member => this.userGraphqlMapper.toUser(member));
  }

  @ResolveField(() => [Cause])
  async causes(@Parent() community: Community): Promise<Cause[]> {
    const causes = await this.graphqlLoaders.causesByCommunityId.load(community.id);

    return causes.map(cause => this.causesGraphqlMapper.toCauseBase(cause));
  }

  @Mutation(() => Boolean)
  @UseGuards(JwtAuthGuard)
  async joinCommunity(
    @Args('communityId', { type: () => ID }, new ParseUUIDPipe()) communityId: string,
    @CurrentUser('sub') actorId: string,
  ): Promise<boolean> {
    const result = await this.communitiesService.joinCommunity(communityId, actorId);
    if (result.isLeft()) throw result.value;

    return true;
  }

  @Mutation(() => Boolean)
  @UseGuards(JwtAuthGuard, AuthorizationGuard)
  @Authorize({
    action: SecurityAction.UPDATE,
    resource: Resource.COMMUNITY,
    policy: CommunityMembershipPolicy.MEMBER_ONLY,
    entityId: 'communityId',
  })
  async leaveCommunity(
    @Args('communityId', { type: () => ID }, new ParseUUIDPipe()) communityId: string,
    @CurrentUser('sub') actorId: string,
  ): Promise<boolean> {
    const result = await this.communitiesService.leaveCommunity(communityId, actorId);
    if (result.isLeft()) throw result.value;

    return true;
  }
}
