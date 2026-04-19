'use client';

import { RequestFormLayout } from '@/components/requests/request-form-layout';
import { RequestSectionCard } from '@/components/requests/request-section-card';
import { Badge, Button, Input, Textarea } from '@/components/ui';
import useCauseRequestForm from '@/hooks/forms/use-cause-request-form';
import { IconCalendar, IconClock } from '@tabler/icons-react';

export default function CommunityCauseRequestCreatePage() {
  const { handleSubmit, isSubmitting, setValues, values, toggleOds, odsOptions } = useCauseRequestForm();

  return (
    <RequestFormLayout variant="cause">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <RequestSectionCard title="Nombre de la causa *" description="Elige un nombre concreto y facil de identificar.">
          <Input
            id="cause-request-name"
            disabled={isSubmitting}
            value={values.name}
            onChange={event => setValues(current => ({ ...current, name: event.target.value }))}
            placeholder="Ej: Comedor social de invierno"
          />
        </RequestSectionCard>

        <RequestSectionCard
          title="Descripcion *"
          description="Explica impacto, publico beneficiario y actividades principales de la causa."
        >
          <Textarea
            id="cause-request-description"
            disabled={isSubmitting}
            value={values.description}
            onChange={event => setValues(current => ({ ...current, description: event.target.value }))}
            placeholder="Describe la necesidad social y como la causa pretende cubrirla."
            className="min-h-28"
          />
        </RequestSectionCard>

        <RequestSectionCard
          title="Objetivos de Desarrollo Sostenible (ODS) *"
          description="Selecciona uno o varios ODS relacionados con la causa."
        >
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {odsOptions.map(option => {
              const isSelected = values.ods.includes(option.value);

              return (
                <button
                  key={option.value}
                  type="button"
                  disabled={isSubmitting}
                  onClick={() => toggleOds(option.value)}
                  className={`rounded-xl border px-3 py-2 text-left text-xs font-semibold transition-colors ${
                    isSelected
                      ? 'border-pink-500/40 bg-pink-500/10 text-pink-700 dark:text-pink-300'
                      : 'border-border bg-background text-muted-foreground hover:border-pink-500/30 hover:text-brand-ink'
                  }`}
                >
                  {option.label}
                </button>
              );
            })}
          </div>

          {values.ods.length > 0 ? (
            <div className="mt-3 flex flex-wrap gap-2">
              {values.ods.map(selectedOds => (
                <Badge key={selectedOds} variant="outline" className="border-pink-500/30 bg-pink-500/10 text-pink-700">
                  {selectedOds}
                </Badge>
              ))}
            </div>
          ) : null}
        </RequestSectionCard>

        <RequestSectionCard title="Planificacion inicial *" description="Indica fecha de inicio y duracion estimada.">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="grid gap-1.5">
              <label className="text-xs font-semibold text-muted-foreground" htmlFor="cause-request-initial-date">
                <span className="inline-flex items-center gap-1">
                  <IconCalendar size={14} />
                  Fecha de inicio
                </span>
              </label>
              <Input
                id="cause-request-initial-date"
                type="date"
                min={new Date().toISOString().split('T')[0]}
                disabled={isSubmitting}
                value={values.initialDate}
                onChange={event => setValues(current => ({ ...current, initialDate: event.target.value }))}
              />
            </div>

            <div className="grid gap-1.5">
              <label className="text-xs font-semibold text-muted-foreground" htmlFor="cause-request-duration-days">
                <span className="inline-flex items-center gap-1">
                  <IconClock size={14} />
                  Duracion
                </span>
              </label>
              <Input
                id="cause-request-duration-days"
                type="number"
                disabled={isSubmitting}
                value={values.durationDays}
                min={1}
                max={365}
                step={1}
                onChange={event =>
                  setValues(current => ({ ...current, durationDays: Number(event.target.value) || 0 }))
                }
              />
            </div>
          </div>
        </RequestSectionCard>

        <Button type="submit" disabled={isSubmitting} size="lg" className="w-full">
          {isSubmitting ? 'Enviando...' : 'Enviar solicitud'}
        </Button>
      </form>
    </RequestFormLayout>
  );
}
