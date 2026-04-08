import { Cause } from '@/features/causes/model/causes.model';
import { causeCardStyles } from '@/styles/components/cause-card.styles';
import Link from 'next/link';
import Image from 'next/image';
import { JoinCauseButton } from './join-community-button';

type CauseCardData = Cause & {
  imageUrl: string;
};

interface CauseCardProps {
  cause: CauseCardData;
  index: number;
}

export function CauseCard({ cause, index }: Readonly<CauseCardProps>) {
  const styles = causeCardStyles;

  return (
    <div className={styles.wrapper} style={{ animationDelay: `${index * 50}ms` }}>
      <Link href={`/causes/${cause.id}`} className={styles.link}>
        <div className={styles.image.wrapper}>
          <Image
            src={cause.imageUrl}
            alt={cause.name}
            fill
            className={styles.image.img}
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
        <div className={styles.content.wrapper}>
          <h4 className={styles.content.title}>{cause.name}</h4>
          <div className={styles.content.footer}>
            <div className={styles.content.location.wrapper}>
              <span className={styles.content.location.text}>{cause.durationDays} días</span>
            </div>
          </div>
        </div>
      </Link>
      <JoinCauseButton causeId={cause.id} />
    </div>
  );
}
