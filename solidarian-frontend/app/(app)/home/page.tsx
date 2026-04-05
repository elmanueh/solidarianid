'use client';

import Link from 'next/link';
import { Star, TrendingUp, ChevronRight } from 'lucide-react';
import { useFeaturedCommunities } from '@/hooks/useCommunities';
import { useRecommendedCauses } from '@/hooks/useCauses';
import { CommunityCard } from '@/components/community-card';
import { CauseCard } from '@/components/cause-card';
import { Skeleton } from '@/components/ui/skeleton';
import { homeStyles } from '@/styles/app/home/page.styles';

export default function HomePage() {
  const { communities, loading: loadingCommunities, error: errorCommunities } = useFeaturedCommunities(3);
  const { causes, loading: loadingCauses, error: errorCauses } = useRecommendedCauses(6);
  const user = { name: 'Traer usuario del contexto' }; // TODO: Obtener usuario real desde contexto
  const styles = homeStyles;

  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header.wrapper}>
        <div className={styles.header.titleWrapper}>
          <h2 className={styles.header.title}>Hola, {user.name}</h2>
          <p className={styles.header.subtitle}>Explora comunidades y causas</p>
        </div>
      </header>

      {/* Sección de Comunidades Destacadas */}
      <section className={styles.section.wrapper}>
        <div className={styles.section.headerWrapper}>
          <div className="flex items-center gap-3">
            <div className={styles.section.featuredIcon}>
              <Star size={24} className="fill-chart-1/20" />
            </div>
            <h3 className={styles.section.title}>Destacadas</h3>
          </div>
          <Link href="/explore" className={styles.section.viewAllButton}>
            Ver todas <ChevronRight size={14} />
          </Link>
        </div>

        {/* Grid de Comunidades */}
        {errorCommunities ? (
          <div className={styles.error}>{errorCommunities}</div>
        ) : loadingCommunities ? (
          <div className="-mx-4 flex gap-6 overflow-x-auto px-4 pb-8 lg:mx-0 lg:grid lg:grid-cols-3 lg:px-0">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className={styles.communities.skeleton} />
            ))}
          </div>
        ) : (
          <div className={styles.communities.grid}>
            {communities.map((community, index) => (
              <div key={community.id} className={styles.communities.item}>
                <CommunityCard community={community} index={index} />
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Sección de Causas Recomendadas */}
      <section className={styles.causes.wrapper}>
        <div className="flex items-center px-1 lg:px-2">
          <div className="flex items-center gap-3">
            <div className={styles.section.causesIcon}>
              <TrendingUp size={24} />
            </div>
            <h3 className={styles.section.title}>Causas Recomendadas</h3>
          </div>
        </div>

        {/* Grid de Causas */}
        {errorCauses ? (
          <div className={styles.error}>{errorCauses}</div>
        ) : loadingCauses ? (
          <div className={styles.causes.grid}>
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className={styles.causes.skeleton} />
            ))}
          </div>
        ) : (
          <div className={styles.causes.grid}>
            {causes.map((cause, index) => (
              <CauseCard key={cause.id} cause={cause} index={index} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
