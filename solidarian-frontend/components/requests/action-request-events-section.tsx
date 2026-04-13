'use client';

import { RequestSectionCard } from '@/components/requests/request-section-card';
import { Button, Input, Textarea } from '@/components/ui';
import { IconCalendarEvent, IconPlus, IconX } from '@tabler/icons-react';
import { useState } from 'react';

export interface ActionRequestEventForm {
  name: string;
  description: string;
  initialDate: string;
  place: {
    direction: string;
    city: string;
    countryCode: string;
  };
}

function createEmptyEvent(): ActionRequestEventForm {
  return {
    name: '',
    description: '',
    initialDate: '',
    place: {
      direction: '',
      city: '',
      countryCode: '',
    },
  };
}

interface ActionRequestEventsSectionProps {
  events: ActionRequestEventForm[];
  onChange: (events: ActionRequestEventForm[]) => void;
  isSubmitting?: boolean;
}

export default function ActionRequestEventsSection({
  events,
  onChange,
  isSubmitting = false,
}: Readonly<ActionRequestEventsSectionProps>) {
  const [newEvent, setNewEvent] = useState(createEmptyEvent);

  const addEvent = () => {
    const event = {
      name: newEvent.name.trim(),
      description: newEvent.description.trim(),
      initialDate: newEvent.initialDate,
      place: {
        direction: newEvent.place.direction.trim(),
        city: newEvent.place.city.trim(),
        countryCode: newEvent.place.countryCode.trim().toUpperCase(),
      },
    };

    if (
      !event.name ||
      !event.description ||
      !event.initialDate ||
      !event.place.direction ||
      !event.place.city ||
      !event.place.countryCode
    ) {
      return;
    }

    onChange([...events, event]);
    setNewEvent(createEmptyEvent());
  };

  const removeEvent = (index: number) => {
    onChange(events.filter((_, eventIndex) => eventIndex !== index));
  };

  return (
    <RequestSectionCard
      title={`Eventos programados (${events.length} añadidos) *`}
      description="Necesitas al menos un evento. Añade cuándo ocurrirá, qué pasará y en qué lugar se llevará a cabo."
    >
      <div className="flex flex-col gap-1">
        {events.map((event, index) => (
          <div
            key={`${event.name || 'event'}-${index}`}
            className="mb-4 flex items-start gap-3 rounded-2xl border border-border bg-background p-4 shadow-sm"
          >
            <IconCalendarEvent className="mt-1 shrink-0 text-emerald-600" size={20} />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-foreground">{event.name}</p>
              <p className="text-xs text-muted-foreground">{event.description}</p>
              <p className="mt-1 text-xs text-muted-foreground">
                {new Date(event.initialDate).toLocaleString('es-ES')}
              </p>
              <p className="text-xs text-muted-foreground">
                {event.place.direction}
                {', '}
                {event.place.city} ({event.place.countryCode})
              </p>
            </div>
            <Button
              type="button"
              variant="destructive"
              size="icon-xs"
              disabled={isSubmitting}
              onClick={() => removeEvent(index)}
              aria-label={`Eliminar evento ${index + 1}`}
              className={`cursor-pointer`}
            >
              <IconX />
            </Button>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-3 rounded-2xl border border-dashed border-border bg-muted/30 p-4">
        <Input
          value={newEvent.name}
          onChange={event => setNewEvent(current => ({ ...current, name: event.target.value }))}
          disabled={isSubmitting}
          placeholder="Ej. Reparto de alimentos en el barrio"
        />
        <Textarea
          value={newEvent.description}
          onChange={event => setNewEvent(current => ({ ...current, description: event.target.value }))}
          disabled={isSubmitting}
          placeholder="Describe qué ocurrirá en este evento."
          className="min-h-24"
        />
        <Input
          type="datetime-local"
          value={newEvent.initialDate}
          onChange={event => setNewEvent(current => ({ ...current, initialDate: event.target.value }))}
          disabled={isSubmitting}
        />

        <div className="grid gap-3 rounded-2xl border border-border bg-background p-4">
          <p className="text-sm font-medium text-foreground">Lugar del evento</p>
          <div className="grid gap-3 md:grid-cols-2">
            <Input
              value={newEvent.place.direction}
              onChange={event =>
                setNewEvent(current => ({
                  ...current,
                  place: {
                    ...current.place,
                    direction: event.target.value,
                  },
                }))
              }
              disabled={isSubmitting}
              placeholder="Dirección"
            />
            <Input
              value={newEvent.place.city}
              onChange={event =>
                setNewEvent(current => ({
                  ...current,
                  place: {
                    ...current.place,
                    city: event.target.value,
                  },
                }))
              }
              disabled={isSubmitting}
              placeholder="Ciudad"
            />
          </div>
          <Input
            value={newEvent.place.countryCode}
            onChange={event =>
              setNewEvent(current => ({
                ...current,
                place: {
                  ...current.place,
                  countryCode: event.target.value.toUpperCase(),
                },
              }))
            }
            disabled={isSubmitting}
            maxLength={2}
            placeholder="Código de país (Ej. ES)"
          />
        </div>

        <Button
          type="button"
          variant="secondary"
          disabled={isSubmitting}
          onClick={addEvent}
          className="mx-auto cursor-pointer gap-2 px-3 text-emerald-600"
        >
          <IconPlus />
          Agregar evento
        </Button>
      </div>
    </RequestSectionCard>
  );
}
