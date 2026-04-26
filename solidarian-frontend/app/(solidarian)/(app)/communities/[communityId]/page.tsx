import CommunityHeader from '@/components/community-page/community-header';
import CommunityTabs from '@/components/community-page/community-tabs';
import CommunityFloatingActionButton from '@/components/community-page/floating-action-button';
import { authServiceServer } from '@/features/auth/services/auth.service.server';
import {
  GET_COMMUNITY_BY_ID_QUERY,
  type GetCommunityByIdResult,
} from '@/features/communities/api/graphql/communities.documents';
import { getInstanceServerApolloClient } from '@/features/graphql/apollo-client-server';
import { GraphqlClientService } from '@/features/graphql/graphql-client.service';
import { PexelsImageService } from '@/features/images/pexels-image.service';
import { ROUTES } from '@/features/routes';
import { unstable_noStore as noStore } from 'next/cache';
import Link from 'next/link';

type CommunityPageProps = {
  params: Promise<{ communityId: string }>;
};
type CommunityMember = {
  id: string;
  fullName: string;
  role: CommunityMemberRole;
};

type CommunityMemberRole = 'creator' | 'admin' | 'member';

export default async function CommunityPage({ params }: Readonly<CommunityPageProps>) {
  noStore();

  const { communityId } = await params;
  const graphqlClient = new GraphqlClientService(await getInstanceServerApolloClient());
  const community = (await graphqlClient.query(GET_COMMUNITY_BY_ID_QUERY, { id: communityId })).community;

  if (!community) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="max-w-md space-y-4 rounded-2xl border border-dashed p-8 text-center">
          <p className="font-semibold text-[#1A2D54]">Comunidad no encontrada</p>
          <Link href={ROUTES.app.home} className="inline-block text-sm text-[#40A9FF] underline">
            Volver al inicio
          </Link>
        </div>
      </div>
    );
  }

  const currentUser = await authServiceServer.getCurrentUser();
  const membersMap = processUsers(community);

  const members = Array.from(membersMap.values());
  const memberIds = members.map(member => member.id);
  const initialIsMember = Boolean(currentUser && memberIds.includes(currentUser.id));
  const currentUserRole = currentUser ? membersMap.get(currentUser.id)?.role : undefined;
  const isCurrentUserCreator = currentUserRole === 'creator';
  const isCurrentUserAdminOrCreator = currentUserRole === 'admin' || currentUserRole === 'creator';
  const imageService = new PexelsImageService();
  const imageUrl = (await imageService.getDeterministicBanner({ uuid: community.id, theme: community.name })).large;
  const causes = await Promise.all(
    community.causes.map(async cause => ({
      ...cause,
      imageUrl: (await imageService.getDeterministicBanner({ uuid: cause.id, theme: cause.name })).large,
    }))
  );
  return (
    <div className="flex min-h-screen flex-col pb-32">
      <CommunityHeader
        communityId={communityId}
        communityName={community.name}
        communityDescription={community.description}
        membersCount={members.length}
        causesCount={community.causes.length}
        imageUrl={imageUrl}
      />

      <div className="flex flex-col gap-8 px-6 pt-10 pb-6">
        <CommunityTabs
          communityId={communityId}
          description={community.description}
          initialIsMember={initialIsMember}
          isCurrentUserCreator={isCurrentUserCreator}
          creatorName={community.creator.fullName}
          causes={causes}
          members={members}
        />
      </div>

      {isCurrentUserAdminOrCreator ? <CommunityFloatingActionButton communityId={communityId} /> : null}
    </div>
  );
}

function processUsers(community: GetCommunityByIdResult['community']) {
  const membersMap = new Map<string, CommunityMember>();

  membersMap.set(community.creator.id, {
    id: community.creator.id,
    fullName: community.creator.fullName,
    role: 'creator',
  });

  community.admins.forEach(admin => {
    if (!membersMap.has(admin.id)) {
      membersMap.set(admin.id, {
        id: admin.id,
        fullName: admin.fullName,
        role: 'admin',
      });
    }
  });

  community.members.forEach(member => {
    if (!membersMap.has(member.id)) {
      membersMap.set(member.id, {
        id: member.id,
        fullName: member.fullName,
        role: 'member',
      });
    }
  });

  return membersMap;
}
