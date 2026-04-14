'use client';

import { GetActionResult } from '@/features/actions/api/graphql/actions.documents';
import { IconCheck, IconCircleCheck, IconMapPin } from '@tabler/icons-react';
import { useState } from 'react';
import { toast } from 'sonner';

const formatEventDate = (date: string): { month: string; day: string } => {
  const parsedDate = new Date(date);

  return {
    month: new Intl.DateTimeFormat('es-ES', { month: 'short' }).format(parsedDate),
    day: String(parsedDate.getDate()),
  };
};

const formatLocation = (city: string, direction: string, countryCode: string): string => {
  return [direction, city, countryCode].filter(Boolean).join(' · ');
};

interface ActionEventsListProps {
  events: GetActionResult['action']['events'];
}

export default function ActionEventsList({ events: initialEvents }: Readonly<ActionEventsListProps>) {
  const [events, setEvents] = useState(initialEvents.map(event => ({ ...event, isJoined: false })));

  const toggleEventJoin = (eventId: string) => {
    setEvents(previous =>
      previous.map(event => {
        if (event.id !== eventId) return event;
        const nextJoined = !event.isJoined;

        // TODO: Aquí iría la lógica real para unirse o salir del evento, con graphql

        toast(nextJoined ? '¡Te has unido al evento!' : 'Has cancelado tu asistencia', {
          description: nextJoined ? `Te esperamos en ${event.name}` : `Ya no estás inscrito en ${event.name}`,
          icon: nextJoined ? <IconCircleCheck className="text-emerald-600" /> : undefined,
        });

        return { ...event, isJoined: nextJoined };
      })
    );
  };

  return (
    <div className="grid grid-cols-1 gap-4">
      {events.map(event => {
        const eventDate = formatEventDate(event.initialDate);
        const eventLocation = formatLocation(event.place.city, event.place.direction, event.place.countryCode);

        return (
          <article
            key={event.id}
            className="group flex flex-col gap-4 rounded-3xl border border-border bg-card p-5 shadow-sm"
          >
            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-2xl border border-brand-500/20 bg-brand-500/10 text-brand-500">
                <span className="text-[10px] font-bold tracking-tighter uppercase">{eventDate.month}</span>
                <span className="text-xl leading-none font-extrabold">{eventDate.day}</span>
              </div>

              <div className="flex flex-1 flex-col gap-1">
                <h4 className="text-sm font-bold text-foreground transition-colors group-hover:text-brand-500">
                  {event.name}
                </h4>
                <p className="text-sm leading-relaxed text-muted-foreground">{event.description}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 rounded-2xl bg-muted/40 p-3 text-muted-foreground">
              <IconMapPin size={14} className="text-muted-foreground/60" />
              <span className="text-[11px] leading-tight font-medium">{eventLocation}</span>
            </div>

            <button
              type="button"
              onClick={() => toggleEventJoin(event.id)}
              className={`flex w-full items-center justify-center gap-2 rounded-2xl py-3.5 text-sm font-bold transition-all active:scale-95 ${
                event.isJoined
                  ? 'border border-brand-500/20 bg-brand-500/10 text-brand-500'
                  : 'bg-brand-500 text-white shadow-lg shadow-brand-500/20'
              }`}
            >
              {event.isJoined ? (
                <>
                  <IconCheck size={18} />
                  ¡Te has unido!
                </>
              ) : (
                'Unirme al evento'
              )}
            </button>
          </article>
        );
      })}
    </div>
  );
}
