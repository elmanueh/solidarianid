import { ExploreCauseCard } from '@/components/explore/explore-cause-card';
import { ExploreCommunityCard } from '@/components/explore/explore-community-card';
import { ExploreCauseItem, ExploreCommunityItem, ExploreMode } from '@/features/explore/model/explore.types';

type ExploreResultsGridProps = {
  mode: ExploreMode;
  communities: ExploreCommunityItem[];
  causes: ExploreCauseItem[];
  emptyMessage?: string;
};

export function ExploreResultsGrid({
  mode,
  communities,
  causes,
  emptyMessage = 'No hay resultados para los criterios seleccionados.',
}: Readonly<ExploreResultsGridProps>) {
  const hasNoResults = mode === 'communities' ? communities.length === 0 : causes.length === 0;

  if (hasNoResults) {
    return (
      <div className="flex min-h-60 items-center justify-center rounded-3xl border border-dashed border-border bg-card px-6 text-center text-sm font-bold text-muted-foreground">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 px-1 md:grid-cols-2 lg:grid-cols-3 lg:px-0">
      {mode === 'communities'
        ? communities.map(community => <ExploreCommunityCard key={community.id} community={community} />)
        : causes.map(cause => <ExploreCauseCard key={cause.id} cause={cause} />)}
    </div>
  );
}
