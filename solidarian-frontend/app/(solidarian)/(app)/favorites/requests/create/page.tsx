'use client';

import CommunityRequestCausesSection from '@/components/requests/community-request-causes-section';
import { RequestFormLayout } from '@/components/requests/request-form-layout';
import { RequestSectionCard } from '@/components/requests/request-section-card';
import { Button, Input, Textarea } from '@/components/ui';
import useCommunityRequestForm from '@/hooks/forms/use-community-request-form';
export default function FavoritesRequestCreatePage() {
  const { handleSubmit, isSubmitting, setValues, values, odsOptions, addCause, removeCause, updateCause } =
    useCommunityRequestForm();

  return (
    <RequestFormLayout variant="community">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <RequestSectionCard
          title="Nombre de la comunidad *"
          description="Elige un nombre claro y representativo para la comunidad."
        >
          <Input
            id="community-request-name"
            disabled={isSubmitting}
            value={values.name}
            onChange={event => setValues(current => ({ ...current, name: event.target.value }))}
            placeholder="Ej: Voluntarios por la Educacion"
          />
        </RequestSectionCard>

        <RequestSectionCard
          title="Descripcion de la comunidad *"
          description="Explica la mision y el impacto que esperas lograr con esta comunidad."
        >
          <Textarea
            id="community-request-description"
            disabled={isSubmitting}
            value={values.description}
            onChange={event => setValues(current => ({ ...current, description: event.target.value }))}
            placeholder="Describe el proposito, a quien ayuda y como se organizara la comunidad."
            className="min-h-24"
          />
        </RequestSectionCard>

        <CommunityRequestCausesSection
          causes={values.causes}
          odsOptions={odsOptions}
          isSubmitting={isSubmitting}
          addCause={addCause}
          removeCause={removeCause}
          updateCause={updateCause}
        />

        <Button
          type="submit"
          disabled={isSubmitting}
          size="lg"
          className="w-full cursor-pointer bg-blue-700 hover:bg-blue-500"
        >
          {isSubmitting ? 'Enviando...' : 'Enviar solicitud'}
        </Button>
      </form>
    </RequestFormLayout>
  );
}
