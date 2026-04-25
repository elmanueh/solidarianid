import BackButton from '@/components/back-button';
import ShareButton from '@/components/share-button';
import { Badge } from '@/components/ui/badge';
import { ROUTES } from '@/features/routes';
import { IconUsers } from '@tabler/icons-react';
import Image from 'next/image';

interface CommunityHeaderProps {
  communityId: string;
  communityName: string;
  communityDescription: string;
  membersCount: number;
  causesCount: number;
  imageUrl: string;
}

export default function CommunityHeader({
  communityId,
  communityName,
  communityDescription,
  membersCount,
  causesCount,
  imageUrl,
}: Readonly<CommunityHeaderProps>) {
  const membersLabel = `${membersCount} ${membersCount === 1 ? 'miembro' : 'miembros'}`;

  return (
    <div className="relative h-64 shrink-0 overflow-hidden rounded-3xl border border-border bg-card shadow-sm">
      <Image
        src={imageUrl}
        alt={communityName}
        fill
        sizes="100vw"
        className="absolute inset-0 h-full w-full object-cover opacity-25"
        loading="eager"
      />
      <div className="absolute inset-0 bg-linear-to-b from-background/0 via-background/10 to-background/92" />

      <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between px-4 pt-4 sm:px-6 sm:pt-6">
        <BackButton url={ROUTES.app.home} />
        <ShareButton
          title={communityName}
          text={`Mira esta comunidad: ${communityName}`}
          url={ROUTES.communities.detail(communityId)}
        />
      </div>

      <div className="absolute right-4 bottom-4 left-4 z-10 flex items-end gap-4 sm:right-6 sm:bottom-6 sm:left-6 sm:gap-5">
        <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-3xl border border-border bg-background shadow-md sm:h-28 sm:w-28">
          <Image
            src={imageUrl}
            alt={communityName}
            fill
            sizes="112px"
            className="h-full w-full object-cover"
            loading="eager"
          />
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-2 pb-1 sm:pb-2">
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            <Badge
              variant="outline"
              className="h-auto border-border bg-background/80 px-2.5 py-1 text-[10px] font-bold tracking-widest whitespace-nowrap text-muted-foreground uppercase"
            >
              Comunidad
            </Badge>
            <Badge
              variant="outline"
              className="h-auto gap-1 border-border bg-background/80 px-2.5 py-1 text-[10px] font-bold tracking-widest whitespace-nowrap text-muted-foreground uppercase"
            >
              <IconUsers size={12} className="text-brand-500" />
              {membersLabel}
            </Badge>
            <Badge
              variant="outline"
              className="h-auto border-border bg-background/80 px-2.5 py-1 text-[10px] font-bold tracking-widest whitespace-nowrap text-muted-foreground uppercase"
            >
              {causesCount} causas
            </Badge>
          </div>

          <h1 className="max-w-[18rem] text-xl leading-tight font-extrabold text-brand-ink sm:max-w-none">
            {communityName}
          </h1>
          <p className="line-clamp-2 text-xs text-muted-foreground sm:text-sm">{communityDescription}</p>
        </div>
      </div>
    </div>
  );
}
