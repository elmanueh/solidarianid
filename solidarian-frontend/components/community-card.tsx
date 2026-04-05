'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Users } from 'lucide-react';
import { ImageWithFallback } from './image-with-fallback';
import { communityCardStyles } from '@/styles/components/community-card.styles';
import type { Community } from '@/features/communities/model';

interface CommunityCardProps {
  community: Community;
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
          <div className={styles.image.badge}>
            <Users size={14} className={styles.image.icon} />
            <span className={styles.image.text}>{community.memberCount} Miembros</span>
          </div>
        </div>
        <div className={styles.content.wrapper}>
          <h4 className={styles.content.title}>{community.name}</h4>
          <p className={styles.content.description}>{community.description}</p>
        </div>
      </Link>
    </motion.div>
  );
}
