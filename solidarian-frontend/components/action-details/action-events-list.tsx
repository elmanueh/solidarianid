import EventJoinButton from '@/components/action-details/event-join-button';
import { Badge } from '@/components/ui/badge';
import { Card, CardDescription, CardTitle } from '@/components/ui/card';
import { GetActionResult } from '@/features/actions/api/graphql/actions.documents';
import { IconClock, IconMapPin } from '@tabler/icons-react';

type EventDate = GetActionResult['action']['events'][number]['initialDate'];

const getTimestamp = (date: EventDate): number => {
  const timestamp = new Date(date).getTime();
  return Number.isNaN(timestamp) ? Number.POSITIVE_INFINITY : timestamp;
};

const formatEventDate = (date: EventDate): { month: string; day: string } => {
  const parsedDate = new Date(date);
  return {
    month: new Intl.DateTimeFormat('es-ES', { month: 'short' }).format(parsedDate),
    day: String(parsedDate.getDate()),
  };
};

const formatEventTime = (date: EventDate): string => {
  const parsedDate = new Date(date);
  if (Number.isNaN(parsedDate.getTime())) return '--:--';
  return new Intl.DateTimeFormat('es-ES', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(parsedDate);
};

const formatLocation = (city: string, direction: string, countryCode: string): string => {
  return [direction, city, countryCode].filter(Boolean).join(' · ');
};

const sortEventsByDateAsc = (events: GetActionResult['action']['events']) => {
  return [...events].sort((leftEvent, rightEvent) => {
    const leftTimestamp = getTimestamp(leftEvent.initialDate);
    const rightTimestamp = getTimestamp(rightEvent.initialDate);

    if (leftTimestamp === rightTimestamp) {
      return leftEvent.id.localeCompare(rightEvent.id);
    }

    return leftTimestamp - rightTimestamp;
  });
};

interface ActionEventsListProps {
  events: GetActionResult['action']['events'];
}

export default function ActionEventsList({ events }: Readonly<ActionEventsListProps>) {
  const sortedEvents = sortEventsByDateAsc(events);

  return (
    <div className="grid grid-cols-1 gap-4">
      {sortedEvents.map(event => {
        const eventDate = formatEventDate(event.initialDate);
        const eventTime = formatEventTime(event.initialDate);
        const eventLocation = formatLocation(event.place.city, event.place.direction, event.place.countryCode);

        return (
          <article key={event.id}>
            <Card className="group gap-4 rounded-3xl p-5 shadow-sm transition-colors duration-200 hover:border-brand-500/35">
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-2xl border border-brand-500/20 bg-brand-500/10 text-brand-500">
                  <span className="text-[10px] font-bold tracking-tighter uppercase">{eventDate.month}</span>
                  <span className="text-xl leading-none font-extrabold">{eventDate.day}</span>
                </div>

                <div className="flex flex-1 flex-col gap-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <CardTitle className="text-sm font-bold text-foreground transition-colors group-hover:text-brand-500">
                      {event.name}
                    </CardTitle>
                    <Badge
                      variant="outline"
                      className="h-auto shrink-0 border-brand-500/20 bg-brand-500/10 px-2 py-0.5 text-[10px] leading-none font-semibold text-brand-500"
                    >
                      <IconClock size={12} />
                      {eventTime}
                    </Badge>
                  </div>
                  <CardDescription className="text-sm leading-relaxed">{event.description}</CardDescription>
                </div>
              </div>

              <div className="flex items-center gap-2 rounded-2xl bg-muted/40 p-3 text-muted-foreground">
                <IconMapPin size={14} className="text-muted-foreground/60" />
                <span className="text-[11px] leading-tight font-medium">{eventLocation}</span>
              </div>

              <EventJoinButton
                eventId={event.id}
                eventName={event.name}
                initialDate={event.initialDate}
                assistantIds={event.assistantIds}
              />
            </Card>
          </article>
        );
      })}
    </div>
  );
}
