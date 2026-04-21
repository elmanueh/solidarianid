import { ROUTES } from '@/features/routes';
import { ExploreCommunityItem } from '@/features/explore/model/explore.types';
import { exploreCardStyles } from '@/styles/components/explore-card.styles';
import Image from 'next/image';
import Link from 'next/link';

type ExploreCommunityCardProps = {
  community: ExploreCommunityItem;
};

export function ExploreCommunityCard({ community }: Readonly<ExploreCommunityCardProps>) {
  const styles = exploreCardStyles;

  return (
    <article className={styles.wrapper}>
      <Link href={ROUTES.communities.detail(community.id)}>
        <div className={styles.image.wrapper}>
          <Image
            src={community.imageUrl}
            alt={community.name}
            fill
            className={styles.image.img}
            sizes="(max-width: 1024px) 100vw, 33vw"
          />
          <span className={styles.image.typeBadge}>Comunidad</span>
        </div>
        <div className={styles.content.wrapper}>
          <h3 className={styles.content.title}>{community.name}</h3>
          <p className={styles.content.description}>{community.description}</p>
          <div className={styles.content.metaRow}>
            <span className={styles.content.actionHint}>Ver comunidad</span>
          </div>
        </div>
      </Link>
    </article>
  );
}
