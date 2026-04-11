'use client';

import {
  CREATE_ACTION_REQUEST_MUTATION,
  CreateActionRequestVariables,
} from '@/features/actions/api/graphql/actions.documents';
import { getErrorMessage } from '@/features/axios/errors.handler';
import { GraphqlClientService } from '@/features/graphql/graphql-client.service';
import { RootState } from '@/features/redux/store';
import { ROUTES } from '@/features/routes';
import { useApolloClient } from '@apollo/client/react';
import { useParams, useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
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

function buildActionRequestPayload(
  values: ActionRequestValues,
  causeId: string,
  userId: string
): CreateActionRequestVariables['createActionRequestInput'] {
  const name = validateRequiredText(values.name, 'El nombre de la acción es obligatorio.');
  const description = validateRequiredText(values.description, 'La descripción de la acción es obligatoria.');

  if (values.objectives.length === 0) {
    throw new Error('Necesitas añadir al menos un objetivo antes de enviar la solicitud.');
  }

  if (values.events.length === 0) {
    throw new Error('Necesitas añadir al menos un evento antes de enviar la solicitud.');
  }

  const objectives: CreateActionRequestVariables['createActionRequestInput']['objectives'] = [];
  for (const [, objective] of values.objectives.entries()) {
    objectives.push(objective);
  }

  const events: CreateActionRequestVariables['createActionRequestInput']['events'] = [];
  for (const [, event] of values.events.entries()) {
    events.push(event);
  }

  return { name, description, causeId, objectives, events, userId };
}

export default function useActionRequestForm() {
  const router = useRouter();
  const params = useParams<{ communityId: string; causeId: string }>();
  const graphql = new GraphqlClientService(useApolloClient());
  const userId = useSelector((state: RootState) => state.auth.currentUser?.id);

  const communityId = getRouteParam(params.communityId);
  const causeId = getRouteParam(params.causeId);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [values, setValues] = useState(createEmptyActionForm);

  const handleSubmit = useCallback(
    async (event: React.SubmitEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (isSubmitting) return;

      if (!userId) {
        toast.error('Necesitas iniciar sesión para crear una solicitud.');
        return;
      }

      try {
        setIsSubmitting(true);
        const payload = buildActionRequestPayload(values, causeId, userId);
        await graphql.mutate(CREATE_ACTION_REQUEST_MUTATION, { createActionRequestInput: payload });

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
    [causeId, communityId, isSubmitting, router, values, userId]
  );

  return { values, setValues, handleSubmit, isSubmitting };
}
