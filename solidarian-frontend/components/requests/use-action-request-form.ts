'use client';

import { getErrorMessage } from '@/features/axios/errors.handler';
import { ROUTES } from '@/features/routes';
import { useParams, useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import { toast } from 'sonner';

interface ActionRequestValues {
  name: string;
  description: string;
  objectives: { name: string; description: string; quantity: number; unit: string }[];
  events: {
    name: string;
    description: string;
    initialDate: string;
    place: { direction: string; city: string; countryCode: string };
  }[];
}

interface CreateActionRequestPayload {
  name: string;
  description: string;
  objectives: Array<{
    name: string;
    description: string;
    quantity: number;
    unit: string;
  }>;
  events: Array<{
    name: string;
    description: string;
    initialDate: string;
    place: {
      direction: string;
      city: string;
      countryCode: string;
    };
  }>;
  causeId: string;
  userId?: string;
}

function createEmptyActionForm(): ActionRequestValues {
  return {
    name: '',
    description: '',
    objectives: [],
    events: [],
  };
}

function getRouteParam(param: string | string[] | undefined): string {
  return typeof param === 'string' ? param : '';
}

function validateRequiredText(value: string, errorMessage: string): string {
  const normalizedValue = value.trim();

  if (!normalizedValue) throw new Error(errorMessage);

  return normalizedValue;
}

function buildActionRequestPayload(values: ActionRequestValues, causeId: string): CreateActionRequestPayload {
  const name = validateRequiredText(values.name, 'El nombre de la acción es obligatorio.');
  const description = validateRequiredText(values.description, 'La descripción de la acción es obligatoria.');

  if (values.objectives.length === 0) {
    throw new Error('Necesitas añadir al menos un objetivo antes de enviar la solicitud.');
  }

  if (values.events.length === 0) {
    throw new Error('Necesitas añadir al menos un evento antes de enviar la solicitud.');
  }

  const objectives: CreateActionRequestPayload['objectives'] = [];
  for (const [, objective] of values.objectives.entries()) {
    objectives.push(objective);
  }

  const events: CreateActionRequestPayload['events'] = [];
  for (const [, event] of values.events.entries()) {
    events.push(event);
  }

  return { name, description, causeId, objectives, events };
}

export default function useActionRequestForm() {
  const router = useRouter();
  const params = useParams<{ communityId: string; causeId: string }>();

  const communityId = getRouteParam(params.communityId);
  const causeId = getRouteParam(params.causeId);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [values, setValues] = useState(createEmptyActionForm);

  const handleSubmit = useCallback(
    async (event: React.SubmitEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (isSubmitting) return;

      try {
        setIsSubmitting(true);
        const payload = buildActionRequestPayload(values, causeId);
        // TODO: usar grapghql cuando esté disponible

        toast.success('Solicitud enviada correctamente', {
          description: 'Te avisaremos cuando se revise.',
        });

        router.push(ROUTES.communities.causeDetail(communityId, causeId));
      } catch (error) {
        toast.error(getErrorMessage(error));
      } finally {
        setIsSubmitting(false);
      }
    },
    [causeId, communityId, isSubmitting, router, values]
  );

  return { values, setValues, handleSubmit, isSubmitting };
}
