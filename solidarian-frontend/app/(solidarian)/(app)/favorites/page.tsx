'use client';

import { CauseCard } from '@/components/cause-card';
import { CommunityCard } from '@/components/community-card';
import { FavoritesSection } from '@/components/favorites/favorites-section';
import { SectionHeader } from '@/components/section-header';
import { useAppSelector } from '@/features/redux/redux-hook';
import { useFavoritesData } from '@/hooks/use-favorites-data';
import { IconHeart, IconUsers } from '@tabler/icons-react';

export default function FavoritesPage() {
  const currentUserId = useAppSelector(state => state.auth.currentUser?.id);
  const { communitiesState, causesState } = useFavoritesData(currentUserId);

  const favoritesIntroLoading = !currentUserId || communitiesState.loading || causesState.loading;

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-10 overflow-x-hidden pb-12 lg:gap-14">
      <SectionHeader title="Mis Favoritos" subtitle="Comunidades y causas que sigues" />

      <FavoritesSection
        title="Mis Comunidades"
        icon={<IconUsers size={24} />}
        accentClassName="bg-chart-2/10 text-chart-2"
        items={communitiesState.items}
        loading={favoritesIntroLoading && communitiesState.items.length === 0}
        error={communitiesState.error}
        emptyMessage="Todavía no eres miembro de ninguna comunidad."
        renderCard={(community, index) => <CommunityCard community={community} index={index} />}
      />

      <FavoritesSection
        title="Mis Causas"
        icon={<IconHeart size={24} />}
        accentClassName="bg-chart-5/10 text-chart-5"
        items={causesState.items}
        loading={favoritesIntroLoading && causesState.items.length === 0}
        error={causesState.error}
        emptyMessage="Todavía no sigues ninguna causa."
        renderCard={(cause, index) => <CauseCard cause={cause} index={index} />}
      />
    </div>
  );
}
