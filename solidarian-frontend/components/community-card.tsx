'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ImageWithFallback } from './image-with-fallback';
import { communityCardStyles } from '@/styles/components/community-card.styles';
import type { Community } from '@/features/communities/model';

type CommunityCardData = Community & {
  imageUrl: string;
};

interface CommunityCardProps {
  community: CommunityCardData;
  index: number;
}

export function CommunityCard({ community, index }: CommunityCardProps) {
  const styles = communityCardStyles;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1, type: 'spring', stiffness: 100 }}
      className={styles.wrapper}
    >
      <Link href={`/communities/${community.id}`}>
        <div className={styles.image.wrapper}>
          <ImageWithFallback
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
    </motion.div>
  );
}
