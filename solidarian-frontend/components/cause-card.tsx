'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Heart, MapPin } from 'lucide-react';
import { ImageWithFallback } from './image-with-fallback';
import { causeCardStyles } from '@/styles/components/cause-card.styles';
import type { Cause } from '@/features/causes/model';

interface CauseCardProps {
  cause: Cause;
  index: number;
}

export function CauseCard({ cause, index }: CauseCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const styles = causeCardStyles;

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
    // TODO: Llamar a API para guardar favorito
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className={styles.wrapper}
    >
      <Link href={`/causes/${cause.id}`} className={styles.link}>
        <div className={styles.image.wrapper}>
          <ImageWithFallback
            src={cause.imageUrl}
            alt={cause.name}
            fill
            className={styles.image.img}
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <div className={styles.image.badgeWrapper}>
            <span className={styles.image.badge}>{cause.category}</span>
          </div>
        </div>
        <div className={styles.content.wrapper}>
          <h4 className={styles.content.title}>{cause.name}</h4>
          <div className={styles.content.footer}>
            <div className={styles.content.location.wrapper}>
              <MapPin size={12} className={styles.content.location.icon} />
              <span className={styles.content.location.text}>{cause.distance || 'A 2km de ti'}</span>
            </div>
            <button
              onClick={handleFavoriteClick}
              className={`${styles.favoriteButton.base} ${
                isFavorite ? styles.favoriteButton.active : styles.favoriteButton.inactive
              }`}
            >
              <Heart size={18} className={isFavorite ? 'fill-current' : ''} />
            </button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
