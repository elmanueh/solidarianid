import CauseFollowButton from '@/components/cause-page/cause-follow-button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { formatDateToSpanish } from '@/lib/utils';
import { IconCalendarEvent, IconClock, IconInfoCircle, IconTargetArrow } from '@tabler/icons-react';

interface CauseInfoCardProps {
  causeId: string;
  initialIsFollowing: boolean;
  showFollowButton: boolean;
  description: string;
  initialDate: string;
  durationDays: number;
  objectiveCount: number;
  eventCount: number;
}

export default function CauseInfoCard({
  causeId,
  initialIsFollowing,
  showFollowButton,
  description,
  initialDate,
  durationDays,
  objectiveCount,
  eventCount,
}: Readonly<CauseInfoCardProps>) {
  const formattedInitialDate = formatDateToSpanish(initialDate);
  const causeStats = [
    { label: 'OBJETIVOS', icon: IconTargetArrow, value: `${objectiveCount} activos` },
    { label: 'DURACIÓN', icon: IconClock, value: `${durationDays} días` },
    { label: 'PRÓX. EVENTOS', icon: IconCalendarEvent, value: `${eventCount} próximos` },
  ] as const;

  return (
    <Card className="gap-0 overflow-hidden rounded-3xl border-border shadow-sm transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2 font-bold text-brand-ink">
            <IconInfoCircle size={20} className="text-brand-500" />
            <CardTitle className="text-base font-bold">Información de la Causa</CardTitle>
            <Badge
              variant="outline"
              className="h-auto gap-1.5 border-border bg-background px-3 py-1 text-xs font-medium text-muted-foreground"
            >
              <IconCalendarEvent size={14} className="shrink-0 text-brand-500" />
              Inicio {formattedInitialDate}
            </Badge>
          </div>

          {showFollowButton && <CauseFollowButton causeId={causeId} following={initialIsFollowing} />}
        </div>

        <CardDescription className="min-h-20 text-sm leading-relaxed text-muted-foreground">
          {description}
        </CardDescription>
      </CardHeader>

      <CardContent className="px-6 pt-0 pb-6">
        <Separator className="bg-border" />

        <div className="mt-3 grid grid-cols-2 gap-3 sm:mt-4 sm:grid-cols-3 sm:gap-4">
          {causeStats.map(({ label, icon: Icon, value }) => (
            <div key={label} className="flex flex-col gap-1.5 sm:min-h-20 sm:justify-center">
              <span className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">{label}</span>
              <div className="flex items-center gap-1.5 font-bold text-brand-ink">
                <Icon size={14} className="text-brand-500" />
                <span className="text-sm">{value}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
