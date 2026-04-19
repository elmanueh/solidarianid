'use client';

import { getErrorMessage } from '@/features/axios/errors.handler';
import { SUSTAINABLE_DEVELOPMENT_GOAL } from '@/features/causes/constants/ods.constants';
import {
  CREATE_COMMUNITY_REQUEST_MUTATION,
  CreateCommunityRequestVariables,
} from '@/features/communities/api/graphql/communities.documents';
import { GraphqlClientService } from '@/features/graphql/graphql-client.service';
import { RootState } from '@/features/redux/store';
import { ROUTES } from '@/features/routes';
import { useApolloClient } from '@apollo/client/react';
import { useRouter } from 'next/navigation';
import { useCallback, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';

type CommunityOdsValue = keyof typeof SUSTAINABLE_DEVELOPMENT_GOAL;

interface CommunityCauseValues {
  name: string;
  description: string;
  ods: CommunityOdsValue[];
  initialDate: string;
  durationDays: number;
}

interface CommunityRequestValues {
  name: string;
  description: string;
  causes: CommunityCauseValues[];
}

const createEmptyCause = (): CommunityCauseValues => ({
  name: '',
  description: '',
  ods: ['SustainableCitiesAndCommunities'],
  initialDate: '',
  durationDays: 30,
});

function createEmptyCommunityRequestForm(): CommunityRequestValues {
  return {
    name: '',
    description: '',
    causes: [createEmptyCause()],
  };
}

function isCauseReadyForNextStep(cause: CommunityCauseValues): boolean {
  return Boolean(
    cause.name.trim() &&
    cause.description.trim() &&
    cause.initialDate &&
    cause.ods.length > 0 &&
    Number.isFinite(cause.durationDays) &&
    cause.durationDays > 0
  );
}

function validateRequiredText(value: string, errorMessage: string): string {
  const normalizedValue = value.trim();

  if (!normalizedValue) {
    throw new Error(errorMessage);
  }

  return normalizedValue;
}

function normalizeDurationDays(value: number): number {
  if (!Number.isFinite(value) || value <= 0) {
    throw new Error('La duracion debe ser un numero mayor que 0.');
  }

  return Math.floor(value);
}

function normalizeInitialDate(value: string): string {
  if (!value) {
    throw new Error('La fecha de inicio de la causa inicial es obligatoria.');
  }

  const isoDate = new Date(value);

  if (Number.isNaN(isoDate.getTime())) {
    throw new Error('La fecha de inicio no es valida.');
  }

  return isoDate.toISOString();
}

function buildCommunityRequestPayload(
  values: CommunityRequestValues,
  userId: string
): CreateCommunityRequestVariables['createCommunityRequestInput'] {
  if (values.causes.length === 0) {
    throw new Error('Debes añadir al menos una causa para crear la comunidad.');
  }

  return {
    name: validateRequiredText(values.name, 'El nombre de la comunidad es obligatorio.'),
    description: validateRequiredText(values.description, 'La descripcion de la comunidad es obligatoria.'),
    causeCreationRequests: values.causes.map((cause, index) => {
      if (cause.ods.length === 0) {
        throw new Error(`Debes seleccionar al menos un ODS en la causa #${index + 1}.`);
      }

      return {
        name: validateRequiredText(cause.name, `El nombre de la causa #${index + 1} es obligatorio.`),
        description: validateRequiredText(
          cause.description,
          `La descripcion de la causa #${index + 1} es obligatoria.`
        ),
        ods: cause.ods,
        initialDate: normalizeInitialDate(cause.initialDate),
        durationDays: normalizeDurationDays(cause.durationDays),
      };
    }),
    userId,
  };
}

export default function useCommunityRequestForm() {
  const router = useRouter();
  const apolloClient = useApolloClient();
  const graphql = useMemo(() => new GraphqlClientService(apolloClient), [apolloClient]);
  const userId = useSelector((state: RootState) => state.auth.currentUser?.id);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [values, setValues] = useState(createEmptyCommunityRequestForm);

  const addCause = useCallback(() => {
    setValues(current => ({
      ...current,
      causes: isCauseReadyForNextStep(current.causes[current.causes.length - 1])
        ? [...current.causes, createEmptyCause()]
        : current.causes,
    }));
  }, []);

  const removeCause = useCallback((index: number) => {
    setValues(current => {
      if (current.causes.length <= 1) {
        return current;
      }

      return {
        ...current,
        causes: current.causes.filter((_, currentIndex) => currentIndex !== index),
      };
    });
  }, []);

  const updateCause = useCallback((index: number, updatedCause: CommunityCauseValues) => {
    setValues(current => ({
      ...current,
      causes: current.causes.map((cause, currentIndex) => (currentIndex === index ? updatedCause : cause)),
    }));
  }, []);

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      if (isSubmitting) {
        return;
      }

      if (!userId) {
        toast.error('Necesitas iniciar sesion para crear una solicitud.');
        return;
      }

      try {
        setIsSubmitting(true);
        const payload = buildCommunityRequestPayload(values, userId);

        await graphql.mutate(CREATE_COMMUNITY_REQUEST_MUTATION, {
          createCommunityRequestInput: payload,
        });

        toast.success('Solicitud de comunidad enviada correctamente', {
          description: 'Te avisaremos cuando se revise.',
        });

        router.push(ROUTES.app.favorites);
      } catch (error) {
        toast.error(getErrorMessage(error));
      } finally {
        setIsSubmitting(false);
      }
    },
    [graphql, isSubmitting, router, userId, values]
  );

  return {
    values,
    setValues,
    addCause,
    removeCause,
    updateCause,
    isSubmitting,
    handleSubmit,
    odsOptions: Object.entries(SUSTAINABLE_DEVELOPMENT_GOAL).map(([key, label]) => ({
      value: key as CommunityOdsValue,
      label: `${key} - ${label}`,
    })),
  };
}
