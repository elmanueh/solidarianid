import { ExploreCauseCard } from '@/components/explore/explore-cause-card';
import { ExploreCommunityCard } from '@/components/explore/explore-community-card';
import { ExploreCauseItem, ExploreCommunityItem, ExploreMode } from '@/features/explore/model/explore.types';
import { explorePageStyles } from '@/styles/app/explore/page.styles';

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
  const styles = explorePageStyles;

  const hasNoResults = mode === 'communities' ? communities.length === 0 : causes.length === 0;

  if (hasNoResults) {
    return <div className={styles.results.empty}>{emptyMessage}</div>;
  }

  return (
    <div className={styles.results.grid}>
      {mode === 'communities'
        ? communities.map(community => <ExploreCommunityCard key={community.id} community={community} />)
        : causes.map(cause => <ExploreCauseCard key={cause.id} cause={cause} />)}
    </div>
  );
}
