'use client';

import { causeCardStyles } from '@/styles/components/cause-card.styles';
import { IconHeart } from '@tabler/icons-react';
import { useState } from 'react';

interface JoinCauseButtonProps {
  causeId: string;
}

export function JoinCauseButton({ causeId }: Readonly<JoinCauseButtonProps>) {
  const [isFavorite, setIsFavorite] = useState(false);
  const styles = causeCardStyles;

  const handleClick = () => {
    setIsFavorite(current => !current);
    console.log(`Toggling favorite for causeId: ${causeId}, new state: ${!isFavorite}`);
    // TODO: Persistir favorito en API usando communityId.
    // use mutation para actualizar el estado del favorito en el backend
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`${styles.favoriteButton.base} ${
        isFavorite ? styles.favoriteButton.active : styles.favoriteButton.inactive
      }`}
      aria-pressed={isFavorite}
      aria-label={isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
      data-cause-id={causeId}
    >
      <IconHeart size={18} className={isFavorite ? 'fill-current' : ''} />
    </button>
  );
}
