import { CommunitiesService } from '@app/communities/domain/services/communities.service';
import { ParseUUIDPipe } from '@nestjs/common';
import { Args, ID, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Cause } from '../entities/cause';
import { Community } from '../entities/community';
import { User } from '../entities/user';
import { GraphqlLoadersService } from '../loaders/graphql-loaders.service';
import { CausesGraphqlMapper } from '../mappers/causes-graphql.mapper';
import { CommunitiesGraphqlMapper } from '../mappers/communities-graphql.mapper';
import { UserGraphqlMapper } from '../mappers/user-graphql.mapper';

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
  async communities(): Promise<Community[]> {
    const communitiesOrError = await this.communitiesService.getCommunities();
    if (communitiesOrError.isLeft()) throw communitiesOrError.value;

    return communitiesOrError.value.map(community => this.communitiesGraphqlMapper.toCommunityBase(community));
  }

  @Query(() => Community)
  async community(@Args('id', { type: () => ID }, new ParseUUIDPipe()) id: string): Promise<Community> {
    const communityOrError = await this.communitiesService.getCommunityById(id);
    if (communityOrError.isLeft()) throw communityOrError.value;

    return this.communitiesGraphqlMapper.toCommunityBase(communityOrError.value);
  }

  @Query(() => [Community])
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
  async joinCommunity(
    @Args('communityId', { type: () => ID }, new ParseUUIDPipe()) communityId: string,
    @Args('userId', { type: () => ID }, new ParseUUIDPipe()) userId: string,
  ): Promise<boolean> {
    const result = await this.communitiesService.joinCommunity(communityId, userId);
    if (result.isLeft()) throw result.value;

    return true;
  }

  @Mutation(() => Boolean)
  async leaveCommunity(
    @Args('communityId', { type: () => ID }, new ParseUUIDPipe()) communityId: string,
    @Args('userId', { type: () => ID }, new ParseUUIDPipe()) userId: string,
  ): Promise<boolean> {
    const result = await this.communitiesService.leaveCommunity(communityId, userId);
    if (result.isLeft()) throw result.value;

    return true;
  }
}
