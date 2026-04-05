import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { IconCalendarEvent, IconClock, IconInfoCircle, IconTargetArrow } from '@tabler/icons-react';

interface CauseInfoCardProps {
  description: string;
  initialDate: string;
  durationDays: number;
  objectiveCount: number;
  eventCount: number;
}

export default function CauseInfoCard({
  description,
  initialDate,
  durationDays,
  objectiveCount,
  eventCount,
}: Readonly<CauseInfoCardProps>) {
  const formattedInitialDate = (() => {
    const parsedDate = new Date(initialDate);

    if (Number.isNaN(parsedDate.getTime())) {
      return 'Fecha no disponible';
    }

    return new Intl.DateTimeFormat('es-ES', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      timeZone: 'UTC',
    }).format(parsedDate);
  })();

  return (
    <Card className="gap-0 overflow-hidden rounded-4xl border border-neutral-100 bg-white shadow-sm transition-all dark:border-neutral-700 dark:bg-neutral-900">
      <CardHeader>
        <div className="flex flex-wrap items-center gap-2 font-bold text-neutral-800 dark:text-neutral-200">
          <IconInfoCircle size={20} className="text-[#40A9FF]" />
          <CardTitle className="text-base font-bold">Información de la Causa</CardTitle>
          <Badge
            variant="outline"
            className="h-auto gap-1.5 border-neutral-200 bg-neutral-50 px-3 py-1 text-xs font-medium text-neutral-600 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300"
          >
            <IconCalendarEvent size={14} className="shrink-0 text-[#7CC342]" />
            Inicio {formattedInitialDate}
          </Badge>
        </div>

        <CardDescription className="min-h-20 text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
          {description}
        </CardDescription>

        {/* TODO: añadir un boton para unirse/salirse de la causa */}
      </CardHeader>

      <CardContent className="px-6 pt-0 pb-6">
        <Separator className="bg-neutral-50 dark:bg-neutral-800" />

        <div className="mt-3 grid grid-cols-2 gap-3 sm:mt-4 sm:grid-cols-3 sm:gap-4">
          <div className="flex flex-col gap-1.5 sm:min-h-20 sm:justify-center">
            <span className="text-[10px] font-bold tracking-widest text-neutral-400 uppercase dark:text-neutral-500">
              OBJETIVOS
            </span>
            <div className="flex items-center gap-1.5 font-bold text-[#1A2D54] dark:text-white">
              <IconTargetArrow size={14} className="text-[#F7941D]" />
              <span className="text-sm">{objectiveCount} activos</span>
            </div>
          </div>

          <div className="flex flex-col gap-1.5 sm:min-h-20 sm:justify-center">
            <span className="text-[10px] font-bold tracking-widest text-neutral-400 uppercase dark:text-neutral-500">
              DURACIÓN
            </span>
            <div className="flex items-center gap-1.5 font-bold text-[#1A2D54] dark:text-white">
              <IconClock size={14} className="text-[#40A9FF]" />
              <span className="text-sm">{durationDays} días</span>
            </div>
          </div>

          <div className="flex flex-col gap-1.5 sm:min-h-20 sm:justify-center">
            <span className="text-[10px] font-bold tracking-widest text-neutral-400 uppercase dark:text-neutral-500">
              PRÓX. EVENTOS
            </span>
            <div className="flex items-center gap-1.5 font-bold text-[#1A2D54] dark:text-white">
              <IconCalendarEvent size={14} className="text-[#7CC342]" />
              <span className="text-sm">{eventCount} próximos</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
