import CommunityJoinButton from '@/components/community-page/community-join-button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui';
import { Separator } from '@base-ui/react';
import { IconInfoCircle } from '@tabler/icons-react';

interface CommunityInfoCardProps {
  communityId: string;
  description: string;
  initialIsMember: boolean;
  creatorName: string;
  isCreator: boolean;
  causesLength: number;
  membersLenght: number;
}

export function CommunityInfoCard({
  communityId,
  description,
  initialIsMember,
  isCreator,
  creatorName,
  causesLength,
  membersLenght,
}: Readonly<CommunityInfoCardProps>) {
  return (
    <Card className="gap-0 rounded-3xl border-border shadow-sm">
      <CardHeader className="pb-4">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="space-y-2">
            <CardTitle className="flex items-center gap-2 text-base font-bold text-brand-ink dark:text-foreground">
              <IconInfoCircle size={18} className="text-brand-500" />
              Sobre la comunidad
            </CardTitle>
            <CardDescription className="text-sm leading-relaxed text-muted-foreground">{description}</CardDescription>
          </div>
          {!isCreator ? <CommunityJoinButton communityId={communityId} initialIsMember={initialIsMember} /> : null}
        </div>
      </CardHeader>

      <CardContent className="pt-0 pb-6">
        <Separator />
        <div className="mt-4 grid grid-cols-1 gap-3 text-sm sm:grid-cols-3">
          <div className="rounded-2xl border border-border bg-background px-4 py-3">
            <p className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">Creador</p>
            <p className="mt-1 font-semibold text-brand-ink dark:text-foreground">{creatorName}</p>
          </div>
          <div className="rounded-2xl border border-border bg-background px-4 py-3">
            <p className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">Causas activas</p>
            <p className="mt-1 font-semibold text-brand-ink dark:text-foreground">{causesLength}</p>
          </div>
          <div className="rounded-2xl border border-border bg-background px-4 py-3">
            <p className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">Miembros</p>
            <p className="mt-1 font-semibold text-brand-ink dark:text-foreground">{membersLenght}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
