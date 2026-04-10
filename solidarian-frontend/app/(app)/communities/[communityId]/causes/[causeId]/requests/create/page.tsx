'use client';

import ActionRequestEventsSection from '@/components/requests/action-request-events-section';
import ActionRequestObjectivesSection from '@/components/requests/action-request-objectives-section';
import { RequestFormLayout } from '@/components/requests/request-form-layout';
import { RequestSectionCard } from '@/components/requests/request-section-card';
import useActionRequestForm from '@/components/requests/use-action-request-form';
import { Button, Input, Textarea } from '@/components/ui';

export default function CauseActionRequestCreatePage() {
  const { handleSubmit, isSubmitting, setValues, values } = useActionRequestForm();

  return (
    <RequestFormLayout variant="action">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <RequestSectionCard
          title="Nombre de la acción *"
          description="Elige un nombre corto y reconocible para la acción."
        >
          <Input
            id="action-request-name"
            disabled={isSubmitting}
            value={values.name}
            onChange={event => setValues(current => ({ ...current, name: event.target.value }))}
            placeholder="Ej: Recogida de alimentos de invierno"
          />
        </RequestSectionCard>

        <RequestSectionCard
          title="Descripción *"
          description="Cuéntanos con algo de detalle qué quieres impulsar y qué impacto buscas."
        >
          <Textarea
            id="action-request-description"
            disabled={isSubmitting}
            value={values.description}
            onChange={event => setValues(current => ({ ...current, description: event.target.value }))}
            placeholder="Describe la idea, el alcance y el impacto esperado."
            className="min-h-24"
          />
        </RequestSectionCard>

        <ActionRequestObjectivesSection
          objectives={values.objectives}
          onChange={objectives => setValues(current => ({ ...current, objectives }))}
          isSubmitting={isSubmitting}
        />

        <ActionRequestEventsSection
          events={values.events}
          onChange={events => setValues(current => ({ ...current, events }))}
          isSubmitting={isSubmitting}
        />

        <Button type="submit" disabled={isSubmitting} size="lg" className="w-full">
          {isSubmitting ? 'Enviando...' : 'Enviar solicitud'}
        </Button>
      </form>
    </RequestFormLayout>
  );
}
