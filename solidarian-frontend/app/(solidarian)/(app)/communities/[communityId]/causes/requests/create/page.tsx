'use client';

import { RequestFormLayout } from '@/components/requests/request-form-layout';
import { RequestSectionCard } from '@/components/requests/request-section-card';
import { Badge, Button, Input, Textarea } from '@/components/ui';
import useCauseRequestForm from '@/hooks/use-cause-request-form';
import { IconAlertCircle, IconCalendar, IconClock } from '@tabler/icons-react';

const DURATION_OPTIONS = [
  { label: '1 mes', value: 30 },
  { label: '3 meses', value: 90 },
  { label: '6 meses', value: 180 },
  { label: '1 ano', value: 365 },
] as const;

export default function CommunityCauseRequestCreatePage() {
  const { handleSubmit, isSubmitting, setValues, values, toggleOds, odsOptions } = useCauseRequestForm();

  return (
    <RequestFormLayout variant="cause">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <RequestSectionCard
          title="Contexto"
          description="Solo administradores y creadores de comunidad pueden solicitar causas nuevas."
        >
          <div className="rounded-2xl border border-pink-500/20 bg-pink-500/5 p-4">
            <div className="flex items-start gap-3">
              <IconAlertCircle className="mt-0.5 shrink-0 text-pink-500" size={18} />
              <p className="text-sm leading-relaxed text-brand-ink">
                Define claramente el objetivo de la causa y su relacion con los ODS para facilitar la revision.
              </p>
            </div>
          </div>
        </RequestSectionCard>

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
              <select
                id="cause-request-duration-days"
                disabled={isSubmitting}
                className="h-10 rounded-md border border-input bg-background px-3 text-sm"
                value={values.durationDays}
                onChange={event =>
                  setValues(current => ({ ...current, durationDays: Number(event.target.value) || 0 }))
                }
              >
                {DURATION_OPTIONS.map(duration => (
                  <option key={duration.value} value={duration.value}>
                    {duration.label}
                  </option>
                ))}
              </select>
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
