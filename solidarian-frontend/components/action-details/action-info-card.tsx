import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { IconCalendarEvent, IconInfoCircle, IconTargetArrow } from '@tabler/icons-react';

interface ActionInfoCardProps {
  description: string;
  objectiveCount: number;
  eventCount: number;
}

export default function ActionInfoCard({ description, objectiveCount, eventCount }: Readonly<ActionInfoCardProps>) {
  const actionStats = [
    { label: 'OBJETIVOS', icon: IconTargetArrow, value: `${objectiveCount} activos` },
    { label: 'EVENTOS', icon: IconCalendarEvent, value: `${eventCount} próximos` },
  ] as const;

  return (
    <Card className="gap-0 overflow-hidden rounded-3xl border-border shadow-sm transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2 font-bold text-brand-ink">
            <IconInfoCircle size={20} className="text-brand-500" />
            <CardTitle className="text-base font-bold">Sobre esta acción</CardTitle>
          </div>
        </div>

        <CardDescription className="min-h-20 text-sm leading-relaxed text-muted-foreground">
          {description}
        </CardDescription>
      </CardHeader>

      <CardContent className="px-6 pt-0 pb-6">
        <Separator className="bg-border" />

        <div className="mt-3 grid grid-cols-2 gap-3 sm:mt-4 sm:gap-4">
          {actionStats.map(({ label, icon: Icon, value }) => (
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
