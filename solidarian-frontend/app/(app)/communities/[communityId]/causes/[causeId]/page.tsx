import CauseHeader from '@/app/(app)/communities/[communityId]/causes/[causeId]/components/cause-header';
import { getErrorMessage } from '@/features/axios/errors.handler';
import { getCauseByCommunityIdAndCauseId } from '@/features/communities/services/communities.server';
import { ROUTES } from '@/infrastructure/navigation/routes';
import Link from 'next/link';
import { ActionsList } from './components/actions-list';
import CauseInfoCard from './components/cause-info-card';
import { FloatingActionButton } from './components/floating-action-button';

interface CausePageProps {
  params: Promise<{ communityId: string; causeId: string }>;
}

export default async function CausePage({ params }: Readonly<CausePageProps>) {
  const { communityId, causeId } = await params;

  let cause: Awaited<ReturnType<typeof getCauseByCommunityIdAndCauseId>> | null = null;
  let causeLoadError: string | null = null;

  try {
    cause = await getCauseByCommunityIdAndCauseId(communityId, causeId);
  } catch (error) {
    causeLoadError = getErrorMessage(error);
  }

  if (!cause) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="max-w-md space-y-4 rounded-2xl border border-dashed p-8 text-center">
          <p className="font-semibold text-[#1A2D54]">Causa no encontrada</p>
          {causeLoadError ? <p className="text-sm text-neutral-500">{causeLoadError}</p> : null}
          <Link href={ROUTES.communities.detail(communityId)} className="inline-block text-sm text-[#40A9FF] underline">
            Volver a la comunidad
          </Link>
        </div>
      </div>
    );
  }

  const imageUrl = '/solidarian-logo.png';
  const totalObjectives = cause.actions.reduce((sum, action) => sum + action.objectives.length, 0);
  const totalEvents = cause.actions.reduce((sum, action) => sum + action.events.length, 0);
  const followersCount = cause.userIds.length;

  return (
    <div className="flex min-h-screen flex-col pb-32">
      <CauseHeader
        communityId={communityId}
        causeId={causeId}
        causeName={cause.name}
        causeOds={cause.ods}
        followersCount={followersCount}
        imageUrl={imageUrl}
      />

      <div className="flex flex-col gap-8 px-0 pt-10 pb-6">
        <div className="px-6">
          <CauseInfoCard
            causeId={causeId}
            causeUserIds={cause.userIds}
            description={cause.description}
            initialDate={cause.initialDate}
            durationDays={cause.durationDays}
            objectiveCount={totalObjectives}
            eventCount={totalEvents}
          />
        </div>

        <div className="px-6">
          <ActionsList communityId={communityId} causeId={causeId} actions={cause.actions} imageUrl={imageUrl} />
        </div>
      </div>

      <FloatingActionButton communityId={communityId} causeId={causeId} />
    </div>
  );
}
