'use client';

import { getErrorMessage } from '@/features/axios/errors.handler';
import {
  CREATE_CAUSE_REQUEST_MUTATION,
  CreateCauseRequestVariables,
} from '@/features/causes/api/graphql/causes.documents';
import { SUSTAINABLE_DEVELOPMENT_GOAL } from '@/features/causes/constants/ods.constants';
import { GraphqlClientService } from '@/features/graphql/graphql-client.service';
import { RootState } from '@/features/redux/store';
import { ROUTES } from '@/features/routes';
import { useApolloClient } from '@apollo/client/react';
import { useParams, useRouter } from 'next/navigation';
import type { SyntheticEvent } from 'react';
import { useCallback, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';

type OdsValue = (typeof SUSTAINABLE_DEVELOPMENT_GOAL)[number][number];

interface CauseRequestValues {
  name: string;
  description: string;
  ods: OdsValue[];
  initialDate: string;
  durationDays: number;
}

function createEmptyCauseRequestForm(): CauseRequestValues {
  return {
    name: '',
    description: '',
    ods: [],
    initialDate: '',
    durationDays: 90,
  };
}

function getRouteParam(param: string | string[] | undefined): string {
  return typeof param === 'string' ? param : '';
}

function validateRequiredText(value: string, errorMessage: string): string {
  const normalizedValue = value.trim();

  if (!normalizedValue) {
    throw new Error(errorMessage);
  }

  return normalizedValue;
}

function normalizeInitialDate(value: string): string {
  if (!value) {
    throw new Error('La fecha de inicio es obligatoria.');
  }

  const parsedDate = new Date(value);

  if (Number.isNaN(parsedDate.getTime())) {
    throw new Error('La fecha de inicio no es valida.');
  }

  return parsedDate.toISOString();
}

function normalizeDurationDays(value: number): number {
  if (!Number.isFinite(value) || value <= 0) {
    throw new Error('La duracion debe ser un numero mayor que 0.');
  }

  if (value > 365) {
    throw new Error('La duracion no puede exceder 365 dias.');
  }

  return Math.floor(value);
}

function buildCauseRequestPayload(
  values: CauseRequestValues,
  communityId: string,
  userId: string
): CreateCauseRequestVariables['createCauseRequestInput'] {
  if (values.ods.length === 0) {
    throw new Error('Debes seleccionar al menos un ODS.');
  }

  return {
    name: validateRequiredText(values.name, 'El nombre de la causa es obligatorio.'),
    description: validateRequiredText(values.description, 'La descripcion de la causa es obligatoria.'),
    ods: values.ods,
    initialDate: normalizeInitialDate(values.initialDate),
    durationDays: normalizeDurationDays(values.durationDays),
    userId,
    communityId,
  };
}

export default function useCauseRequestForm() {
  const router = useRouter();
  const params = useParams<{ communityId: string }>();
  const apolloClient = useApolloClient();
  const graphql = useMemo(() => new GraphqlClientService(apolloClient), [apolloClient]);
  const userId = useSelector((state: RootState) => state.auth.currentUser?.id);

  const communityId = getRouteParam(params.communityId);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [values, setValues] = useState(createEmptyCauseRequestForm);
  const odsOptions = useMemo(
    () =>
      Object.entries(SUSTAINABLE_DEVELOPMENT_GOAL).map(([value, label], index) => ({
        value,
        label: `${index + 1}. ${label}`,
      })),
    []
  );

  const toggleOds = useCallback((ods: OdsValue) => {
    setValues(current => {
      if (current.ods.includes(ods)) {
        return { ...current, ods: current.ods.filter(currentOds => currentOds !== ods) };
      }

      return { ...current, ods: [...current.ods, ods] };
    });
  }, []);

  const handleSubmit = useCallback(
    async (event: SyntheticEvent<HTMLFormElement>) => {
      event.preventDefault();

      if (isSubmitting) {
        return;
      }

      if (!userId) {
        toast.error('Necesitas iniciar sesion para crear una solicitud.');
        return;
      }

      if (!communityId) {
        toast.error('No se ha encontrado la comunidad para esta solicitud.');
        return;
      }

      try {
        setIsSubmitting(true);
        const payload = buildCauseRequestPayload(values, communityId, userId);

        await graphql.mutate(CREATE_CAUSE_REQUEST_MUTATION, {
          createCauseRequestInput: payload,
        });

        toast.success('Solicitud enviada correctamente', {
          description: 'Te avisaremos cuando se revise.',
        });

        router.push(ROUTES.communities.causes(communityId));
      } catch (error) {
        toast.error(getErrorMessage(error));
      } finally {
        setIsSubmitting(false);
      }
    },
    [communityId, graphql, isSubmitting, router, userId, values]
  );

  return {
    values,
    setValues,
    isSubmitting,
    handleSubmit,
    toggleOds,
    odsOptions,
  };
}
