import { CauseCard } from '@/components/cause-card';
import { CommunityCard } from '@/components/community-card';
import { HeaderHome } from '@/components/home/header-home';
import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { GET_CAUSES_QUERY } from '@/features/causes/api/graphql/causes.documents';
import { GET_COMMUNITIES_QUERY } from '@/features/communities/api/graphql/communities.documents';
import { getInstanceServerApolloClient } from '@/features/graphql/apollo-client-server';
import { GraphqlClientService } from '@/features/graphql/graphql-client.service';
import { PexelsImageService } from '@/features/images/pexels-image.service';
import { ROUTES } from '@/features/routes';
import { homeStyles } from '@/styles/app/home/page.styles';
import { IconChevronRight, IconStar, IconTrendingUp } from '@tabler/icons-react';
import { unstable_noStore as noStore } from 'next/cache';
import Link from 'next/link';

type FeaturedCommunity = {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
};

type RecommendedCause = {
  id: string;
  name: string;
  description: string;
  durationDays: number;
  communityId: string;
  imageUrl: string;
};

const normalizeLimit = (limit: number): number => {
  if (!Number.isFinite(limit)) {
    return 0;
  }

  return Math.max(0, Math.floor(limit));
};

const loadHomeData = async (): Promise<{
  communities: FeaturedCommunity[];
  causes: RecommendedCause[];
  errorCommunities: string | null;
  errorCauses: string | null;
}> => {
  const client = await getInstanceServerApolloClient();
  const graphql = new GraphqlClientService(client);
  const featuredLimit = normalizeLimit(10);
  const causesLimit = normalizeLimit(10);

  const [communitiesResult, causesResult] = await Promise.allSettled([
    graphql.query(GET_COMMUNITIES_QUERY, {}, { retry: { attempts: 3, initialDelayMs: 1000 } }),
    graphql.query(GET_CAUSES_QUERY, {}, { retry: { attempts: 3, initialDelayMs: 1000 } }),
  ]);

  const communityList =
    communitiesResult.status === 'fulfilled' ? communitiesResult.value.communities.slice(0, featuredLimit) : [];
  const causesList = causesResult.status === 'fulfilled' ? causesResult.value.causes.slice(0, causesLimit) : [];

  let communities: FeaturedCommunity[] = [];
  let causes: RecommendedCause[] = [];

  if (communityList.length > 0) {
    const imageService = new PexelsImageService();
    communities = await Promise.all(
      communityList.map(async community => {
        const banner = await imageService.getDeterministicBanner({ uuid: community.id, theme: community.name });
        return { ...community, imageUrl: banner.large };
      })
    );
  }

  if (causesList.length > 0) {
    const imageService = new PexelsImageService();
    causes = await Promise.all(
      causesList.map(async cause => {
        const banner = await imageService.getDeterministicBanner({ uuid: cause.id, theme: cause.name });
        return { ...cause, imageUrl: banner.large };
      })
    );
  }

  return {
    communities,
    causes,
    errorCommunities:
      communitiesResult.status === 'rejected'
        ? toUiErrorMessage(communitiesResult.reason, 'No se pudieron cargar las comunidades destacadas.')
        : null,
    errorCauses:
      causesResult.status === 'rejected'
        ? toUiErrorMessage(causesResult.reason, 'No se pudieron cargar las causas recomendadas.')
        : null,
  };
};

const toUiErrorMessage = (error: unknown, fallback: string): string => {
  if (error instanceof Error) {
    const message = error.message.trim().toLowerCase();

    if (message === 'fetch failed' || message.includes('failed to fetch') || message.includes('network error')) {
      return fallback;
    }

    if (
      message.includes('response not successful') ||
      message.includes('status code 501') ||
      message.includes('status code 502') ||
      message.includes('status code 503') ||
      message.includes('status code 504')
    ) {
      return fallback;
    }

    return error.message;
  }

  return fallback;
};

export default async function HomePage() {
  noStore();

  const { communities, causes, errorCommunities, errorCauses } = await loadHomeData();
  const styles = homeStyles;

  return (
    <div className={styles.container}>
      {/* Header */}
      <HeaderHome />

      {/* Sección de Comunidades Destacadas */}
      <section className={styles.section.wrapper}>
        <div className={styles.section.headerWrapper}>
          <div className="flex items-center gap-3">
            <div className={styles.section.featuredIcon}>
              <IconStar size={24} className="fill-chart-1/20" />
            </div>
            <h3 className={styles.section.title}>Destacadas</h3>
          </div>
          <Button
            variant="ghost"
            size="sm"
            render={<Link href={ROUTES.app.explore} />}
            className={styles.section.viewAllButton}
          >
            Ver todas
          </Button>
        </div>

        {/* Grid de Comunidades */}
        {errorCommunities ? (
          <div className={styles.error.wrapper}>
            <p className={styles.error.title}>No hemos podido cargar las comunidades destacadas</p>
            <p className={styles.error.text}>
              {errorCommunities} Mientras tanto, puedes seguir explorando el catálogo completo.
            </p>
            <Link href={ROUTES.app.explore} className={styles.error.link}>
              Ir a explorar <IconChevronRight size={14} />
            </Link>
          </div>
        ) : communities.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">No hay comunidades destacadas por mostrar.</div>
        ) : (
          <div className={styles.communities.carousel}>
            <Carousel opts={{ align: 'start', loop: true }}>
              <CarouselContent className={styles.communities.track}>
                {communities.map((community, index) => (
                  <CarouselItem key={community.id} className={styles.communities.item}>
                    <CommunityCard community={community} index={index} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious
                size="icon-lg"
                className="hidden lg:inline-flex"
                aria-label="Desplazar comunidades destacadas a la izquierda"
              />
              <CarouselNext
                size="icon-lg"
                className="hidden lg:inline-flex"
                aria-label="Desplazar comunidades destacadas a la derecha"
              />
            </Carousel>
          </div>
        )}
      </section>

      {/* Sección de Causas Recomendadas */}
      <section className={styles.causes.wrapper}>
        <div className="flex items-center px-1 lg:px-2">
          <div className="flex items-center gap-3">
            <div className={styles.section.causesIcon}>
              <IconTrendingUp size={24} />
            </div>
            <h3 className={styles.section.title}>Causas Recomendadas</h3>
          </div>
        </div>

        {/* Carousel de Causas */}
        {errorCauses ? (
          <div className={styles.error.wrapper}>
            <p className={styles.error.title}>No hemos podido cargar las causas recomendadas</p>
            <p className={styles.error.text}>
              {errorCauses} Puedes seguir navegando por las comunidades para encontrar alternativas.
            </p>
            <Link href={ROUTES.app.explore} className={styles.error.link}>
              Explorar comunidades <IconChevronRight size={14} />
            </Link>
          </div>
        ) : causes.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">No hay causas recomendadas por mostrar.</div>
        ) : (
          <div className={styles.causes.carousel}>
            <Carousel opts={{ align: 'start', loop: true }}>
              <CarouselContent className={styles.causes.track}>
                {causes.map((cause, index) => (
                  <CarouselItem key={cause.id} className={styles.causes.item}>
                    <CauseCard cause={cause} index={index} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious
                size="icon-lg"
                className="hidden lg:inline-flex"
                aria-label="Desplazar causas recomendadas a la izquierda"
              />
              <CarouselNext
                size="icon-lg"
                className="hidden lg:inline-flex"
                aria-label="Desplazar causas recomendadas a la derecha"
              />
            </Carousel>
          </div>
        )}
      </section>
    </div>
  );
}
