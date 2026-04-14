import BackButton from '@/components/back-button';
import ShareButton from '@/components/share-button';
import { Badge } from '@/components/ui/badge';
import { getSortedOds } from '@/features/causes/constants/ods.constants';
import { ROUTES } from '@/features/routes';
import { IconUsers } from '@tabler/icons-react';
import Image from 'next/image';

interface CauseHeaderProps {
  communityId: string;
  causeId: string;
  causeName: string;
  causeOds: string[];
  followersCount: number;
  imageUrl: string;
}

export default function CauseHeader({
  communityId,
  causeId,
  causeName,
  causeOds,
  followersCount,
  imageUrl,
}: Readonly<CauseHeaderProps>) {
  const sortedOds = getSortedOds(causeOds);
  const followersLabel = `${followersCount} ${followersCount === 1 ? 'seguidor' : 'seguidores'}`;

  return (
    <div className="relative h-64 shrink-0 overflow-hidden rounded-3xl border border-border bg-card shadow-sm">
      <Image
        src={imageUrl}
        alt={causeName}
        fill
        sizes="100vw"
        className="absolute inset-0 h-full w-full object-cover opacity-20"
        priority
      />
      <div className="absolute inset-0 bg-linear-to-b from-background/0 via-background/10 to-background/90" />

      <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between px-4 pt-4 sm:px-6 sm:pt-6">
        <BackButton url={ROUTES.communities.detail(communityId)} />
        <ShareButton
          title={causeName}
          text={`Mira esta causa: ${causeName}`}
          url={ROUTES.communities.causeDetail(communityId, causeId)}
        />
      </div>

      <div className="absolute right-4 bottom-4 left-4 z-10 flex items-end gap-4 sm:right-6 sm:bottom-6 sm:left-6 sm:gap-5">
        <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-3xl border border-border bg-background shadow-md sm:h-28 sm:w-28">
          <Image src={imageUrl} alt={causeName} fill sizes="112px" className="h-full w-full object-cover" />
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-2 pb-1 sm:pb-2">
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            {sortedOds.map(ods => (
              <Badge
                key={ods.num}
                variant="outline"
                className="h-auto border-border bg-background/80 px-2.5 py-1 text-[10px] font-bold tracking-widest whitespace-nowrap text-muted-foreground uppercase"
              >
                {ods.num}. {ods.name}
              </Badge>
            ))}
            <Badge
              variant="outline"
              className="h-auto border-border bg-background/80 px-2.5 py-1 text-[10px] font-bold tracking-widest whitespace-nowrap text-muted-foreground uppercase"
            >
              <IconUsers size={12} className="text-brand-500" />
              {followersLabel}
            </Badge>
          </div>
          <h1 className="max-w-[18rem] text-xl leading-tight font-extrabold text-brand-ink sm:max-w-none">
            {causeName}
          </h1>
        </div>
      </div>
    </div>
  );
}
