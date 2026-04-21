import { ROUTES } from '@/features/routes';
import { ExploreCauseItem } from '@/features/explore/model/explore.types';
import { getSortedOds } from '@/features/causes/constants/ods.constants';
import { exploreCardStyles } from '@/styles/components/explore-card.styles';
import Image from 'next/image';
import Link from 'next/link';

type ExploreCauseCardProps = {
  cause: ExploreCauseItem;
};

export function ExploreCauseCard({ cause }: Readonly<ExploreCauseCardProps>) {
  const styles = exploreCardStyles;
  const sortedOds = getSortedOds(cause.ods);

  return (
    <article className={styles.wrapper}>
      <Link href={ROUTES.communities.causeDetail(cause.communityId, cause.id)}>
        <div className={styles.image.wrapper}>
          <Image
            src={cause.imageUrl}
            alt={cause.name}
            fill
            className={styles.image.img}
            sizes="(max-width: 1024px) 100vw, 33vw"
          />
          <span className={styles.image.typeBadge}>Causa</span>
        </div>
        <div className={styles.content.wrapper}>
          <h3 className={styles.content.title}>{cause.name}</h3>
          <p className={styles.content.description}>{cause.description}</p>
          <div className={styles.content.metaRow}>
            <div className={styles.content.metaBadgesWrap}>
              {sortedOds.slice(0, 2).map(ods => (
                <span key={ods.num} className={styles.content.metaBadge}>
                  ODS {ods.num}
                </span>
              ))}
            </div>
            <span className={styles.content.actionHint}>Ver causa</span>
          </div>
        </div>
      </Link>
    </article>
  );
}
