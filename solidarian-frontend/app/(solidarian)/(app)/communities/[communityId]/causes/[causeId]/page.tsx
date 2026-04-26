import ActionsList from '@/components/cause-page/actions-list';
import CauseHeader from '@/components/cause-page/cause-header';
import CauseInfoCard from '@/components/cause-page/cause-info-card';
import FloatingActionButton from '@/components/cause-page/floating-action-button';
import { authServiceServer } from '@/features/auth/services/auth.service.server';
import {
  GET_CAUSE_BY_COMMUNITY_ID_AND_CAUSE_ID_QUERY,
  type GetCauseByCommunityIdAndCauseIdResult,
} from '@/features/causes/api/graphql/causes.documents';
import {
  GET_COMMUNITY_BY_ID_QUERY,
  type GetCommunityByIdResult,
} from '@/features/communities/api/graphql/communities.documents';
import { getInstanceServerApolloClient } from '@/features/graphql/apollo-client-server';
import { GraphqlClientService } from '@/features/graphql/graphql-client.service';
import { isEntityNotFoundGraphQLError } from '@/features/graphql/graphql-error.utils';
import { PexelsImageService } from '@/features/images/pexels-image.service';
import { notFound } from 'next/navigation';

interface CausePageProps {
  params: Promise<{ communityId: string; causeId: string }>;
}

export default async function CausePage({ params }: Readonly<CausePageProps>) {
  const { communityId, causeId } = await params;
  const graphqlCliente = new GraphqlClientService(await getInstanceServerApolloClient());
  let cause: GetCauseByCommunityIdAndCauseIdResult['causeByCommunity'] | undefined;

  try {
    cause = (
      await graphqlCliente.query(GET_CAUSE_BY_COMMUNITY_ID_AND_CAUSE_ID_QUERY, {
        communityId,
        causeId,
      })
    ).causeByCommunity;
  } catch (error) {
    if (isEntityNotFoundGraphQLError(error)) {
      notFound();
    }

    throw error;
  }

  if (!cause) {
    notFound();
  }

  const currentUser = await authServiceServer.getCurrentUser();
  let community: GetCommunityByIdResult['community'] | undefined;

  try {
    community = (await graphqlCliente.query(GET_COMMUNITY_BY_ID_QUERY, { id: communityId })).community;
  } catch (error) {
    if (isEntityNotFoundGraphQLError(error)) {
      notFound();
    }

    throw error;
  }

  if (!community) {
    notFound();
  }

  const canSeeFloatingActionButton = community.creator.id === currentUser?.id;
  const canShowFollowButton = community.creator.id !== currentUser?.id;
  const pexelsService = new PexelsImageService();
  const bannerImage = await pexelsService.getDeterministicBanner({ uuid: causeId, theme: cause.name });

  return (
    <div className="flex min-h-screen flex-col pb-32">
      <CauseHeader
        communityId={communityId}
        causeId={causeId}
        causeName={cause.name}
        causeOds={cause.ods}
        followersCount={cause.userIds.length}
        imageUrl={bannerImage.large}
      />

      <div className="flex flex-col gap-8 px-0 pt-10 pb-6">
        <div className="px-6">
          <CauseInfoCard
            causeId={causeId}
            initialIsFollowing={Boolean(currentUser && cause.userIds.includes(currentUser.id))}
            showFollowButton={canShowFollowButton}
            description={cause.description}
            initialDate={cause.initialDate}
            durationDays={cause.durationDays}
            objectiveCount={cause.actions.reduce((sum, action) => sum + action.objectives.length, 0)}
            eventCount={cause.actions.reduce((sum, action) => sum + action.events.length, 0)}
          />
        </div>

        <div className="px-6">
          <ActionsList communityId={communityId} causeId={causeId} actions={cause.actions} />
        </div>
      </div>

      {canSeeFloatingActionButton && <FloatingActionButton communityId={communityId} causeId={causeId} />}
    </div>
  );
}
