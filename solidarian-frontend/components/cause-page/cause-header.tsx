import BackButton from '@/components/back-button';
import ShareButton from '@/components/share-button';
import { Badge } from '@/components/ui/badge';
import { getSortedOds } from '@/features/causes/constants/ods.constants';
import { ROUTES } from '@/infrastructure/navigation/routes';
import { IconUsers } from '@tabler/icons-react';
import Image from 'next/image';

interface CauseHeaderProps {
  communityId: string;
  causeId: string;
  causeName: string;
  causeOds: number[];
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
    <div className="relative h-64 shrink-0 overflow-hidden rounded-3xl bg-neutral-50 dark:bg-neutral-800">
      <Image
        src={imageUrl}
        alt={causeName}
        fill
        sizes="100vw"
        className="absolute inset-0 h-full w-full scale-110 object-cover opacity-40 blur-[2px]"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-neutral-50 dark:from-neutral-900/10 dark:to-neutral-800" />

      <div className="absolute top-6 right-6 left-6 z-10 flex items-center justify-between">
        <BackButton url={ROUTES.communities.detail(communityId)} />
        <ShareButton
          title={causeName}
          text={`Mira esta causa: ${causeName}`}
          url={ROUTES.communities.causeDetail(communityId, causeId)}
        />
      </div>

      <div className="absolute right-4 bottom-4 left-4 z-10 flex items-end gap-4 sm:right-6 sm:bottom-6 sm:left-6 sm:gap-5">
        <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-3xl border-4 border-white shadow-2xl sm:h-28 sm:w-28 dark:border-neutral-700">
          <Image src={imageUrl} alt={causeName} fill sizes="112px" className="h-full w-full object-cover" />
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-2 pb-1 sm:pb-2">
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            {sortedOds.map(ods => (
              <Badge
                key={ods.num}
                variant="outline"
                className="h-auto border-[#7CC342]/20 bg-[#7CC342]/10 px-2.5 py-1 text-[10px] font-bold tracking-widest whitespace-nowrap text-[#7CC342] uppercase"
              >
                {ods.num}. {ods.name}
              </Badge>
            ))}
            <Badge
              variant="outline"
              className="h-auto border-[#40A9FF]/20 bg-[#40A9FF]/10 px-2.5 py-1 text-[10px] font-bold tracking-widest whitespace-nowrap text-[#40A9FF] uppercase"
            >
              <IconUsers size={12} />
              {followersLabel}
            </Badge>
          </div>
          <h1 className="max-w-[18rem] text-xl leading-tight font-extrabold text-[#1A2D54] drop-shadow-sm sm:max-w-none dark:text-white">
            {causeName}
          </h1>
        </div>
      </div>
    </div>
  );
}
