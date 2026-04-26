import ActionEventsList from '@/components/action-details/action-events-list';
import ActionHeader from '@/components/action-details/action-header';
import ActionInfoCard from '@/components/action-details/action-info-card';
import ActionObjectivesList from '@/components/action-details/action-objectives-list';
import { GET_ACTION_QUERY } from '@/features/actions/api/graphql/actions.documents';
import { getInstanceServerApolloClient } from '@/features/graphql/apollo-client-server';
import { GraphqlClientService } from '@/features/graphql/graphql-client.service';
import { PexelsImageService } from '@/features/images/pexels-image.service';

interface ActionPageProps {
  params: Promise<{ communityId: string; causeId: string; actionId: string }>;
}

export default async function ActionPage({ params }: Readonly<ActionPageProps>) {
  const { communityId, causeId, actionId } = await params;
  const graphql = new GraphqlClientService(await getInstanceServerApolloClient());
  const action = (await graphql.query(GET_ACTION_QUERY, { id: actionId })).action;

  const pexelsService = new PexelsImageService();
  const bannerImage = await pexelsService.getDeterministicBanner({ uuid: actionId, theme: action.name });

  return (
    <div className="flex min-h-screen flex-col pb-32">
      <ActionHeader
        communityId={communityId}
        causeId={causeId}
        actionId={actionId}
        actionName={action.name}
        imageUrl={bannerImage.large}
      />

      <div className="flex flex-col gap-8 px-0 pt-10 pb-6">
        <div className="px-6">
          <ActionInfoCard
            description={action.description}
            objectiveCount={action.objectives.length}
            eventCount={action.events.length}
          />
        </div>

        <div className="px-6">
          <section className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <div className="h-4 w-1 rounded-full bg-amber-500" />
              <h3 className="text-lg font-bold text-brand-ink">Colabora con los objetivos</h3>
            </div>
            <ActionObjectivesList actionId={actionId} objectives={action.objectives} />
          </section>
        </div>

        <div className="px-6">
          <section className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <div className="h-4 w-1 rounded-full bg-brand-500" />
              <h3 className="text-lg font-bold text-brand-ink">Participa en eventos</h3>
            </div>
            <ActionEventsList events={action.events} />
          </section>
        </div>
      </div>
    </div>
  );
}
