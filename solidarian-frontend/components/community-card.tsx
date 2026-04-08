import { Community } from '@/features/communities/model/communities.model';
import { ROUTES } from '@/features/routes';
import { communityCardStyles } from '@/styles/components/community-card.styles';
import Link from 'next/link';
import Image from 'next/image';

type CommunityCardData = Community & {
  imageUrl: string;
};

interface CommunityCardProps {
  community: CommunityCardData;
  index: number;
}

export function CommunityCard({ community, index }: Readonly<CommunityCardProps>) {
  const styles = communityCardStyles;

  return (
    <div className={styles.wrapper} style={{ animationDelay: `${index * 100}ms` }}>
      <Link href={ROUTES.communities.detail(community.id)}>
        <div className={styles.image.wrapper}>
          <Image
            src={community.imageUrl}
            alt={community.name}
            fill
            className={styles.image.img}
            sizes="(max-width: 768px) 280px, (max-width: 1024px) 33vw, 384px"
          />
        </div>
        <div className={styles.content.wrapper}>
          <h4 className={styles.content.title}>{community.name}</h4>
          <p className={styles.content.description}>{community.description}</p>
        </div>
      </Link>
    </div>
  );
}
