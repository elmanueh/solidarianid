import ActionsList from '@/components/cause-page/actions-list';
import CauseHeader from '@/components/cause-page/cause-header';
import CauseInfoCard from '@/components/cause-page/cause-info-card';
import FloatingActionButton from '@/components/cause-page/floating-action-button';
import { authService } from '@/features/auth/services/auth.service';
import { GET_CAUSE_BY_COMMUNITY_ID_AND_CAUSE_ID_QUERY } from '@/features/causes/api/graphql/causes.documents';
import { getInstanceServerApolloClient } from '@/features/graphql/apollo-client';
import { GraphqlClientService } from '@/features/graphql/graphql-client.service';
import { PexelsImageService } from '@/features/images/pexels-image.service';
import { ROUTES } from '@/features/routes';
import Link from 'next/link';

interface CausePageProps {
  params: Promise<{ communityId: string; causeId: string }>;
}

export default async function CausePage({ params }: Readonly<CausePageProps>) {
  const { communityId, causeId } = await params;
  const graphqlCliente = new GraphqlClientService(getInstanceServerApolloClient());
  const cause = (
    await graphqlCliente.query(GET_CAUSE_BY_COMMUNITY_ID_AND_CAUSE_ID_QUERY, {
      communityId,
      causeId,
    })
  ).causeByCommunity;

  if (!cause) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="max-w-md space-y-4 rounded-2xl border border-dashed p-8 text-center">
          <p className="font-semibold text-[#1A2D54]">Causa no encontrada</p>
          <Link href={ROUTES.communities.detail(communityId)} className="inline-block text-sm text-[#40A9FF] underline">
            Volver a la comunidad
          </Link>
        </div>
      </div>
    );
  }

  const currentUser = await authService.getCurrentUser();
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

      <FloatingActionButton communityId={communityId} causeId={causeId} />
    </div>
  );
}
