'use client';

import { getErrorMessage } from '@/features/axios/errors.handler';
import {
  CREATE_CAUSE_REQUEST_MUTATION,
  CreateCauseRequestVariables,
} from '@/features/causes/api/graphql/causes.documents';
import { GraphqlClientService } from '@/features/graphql/graphql-client.service';
import { RootState } from '@/features/redux/store';
import { ROUTES } from '@/features/routes';
import { useApolloClient } from '@apollo/client/react';
import { useParams, useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';

const ODS_OPTIONS = [
  { value: 'NoPoverty', label: '1. Fin de la pobreza' },
  { value: 'ZeroHunger', label: '2. Hambre cero' },
  { value: 'GoodHealthAndWellBeing', label: '3. Salud y bienestar' },
  { value: 'QualityEducation', label: '4. Educacion de calidad' },
  { value: 'GenderEquality', label: '5. Igualdad de genero' },
  { value: 'CleanWaterAndSanitation', label: '6. Agua limpia y saneamiento' },
  { value: 'AffordableAndCleanEnergy', label: '7. Energia asequible y no contaminante' },
  { value: 'DecentWorkAndEconomicGrowth', label: '8. Trabajo decente y crecimiento economico' },
  { value: 'IndustryInnovationAndInfrastructure', label: '9. Industria, innovacion e infraestructura' },
  { value: 'ReducedInequalities', label: '10. Reduccion de las desigualdades' },
  { value: 'SustainableCitiesAndCommunities', label: '11. Ciudades y comunidades sostenibles' },
  { value: 'ResponsibleConsumptionAndProduction', label: '12. Produccion y consumo responsables' },
  { value: 'ClimateAction', label: '13. Accion por el clima' },
  { value: 'LifeBelowWater', label: '14. Vida submarina' },
  { value: 'LifeOnLand', label: '15. Vida de ecosistemas terrestres' },
  { value: 'PeaceJusticeAndStrongInstitutions', label: '16. Paz, justicia e instituciones solidas' },
  { value: 'PartnershipsForTheGoals', label: '17. Alianzas para lograr los objetivos' },
] as const;

type OdsValue = (typeof ODS_OPTIONS)[number]['value'];

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
  const graphql = new GraphqlClientService(useApolloClient());
  const userId = useSelector((state: RootState) => state.auth.currentUser?.id);

  const communityId = getRouteParam(params.communityId);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [values, setValues] = useState(createEmptyCauseRequestForm);

  const toggleOds = useCallback((ods: OdsValue) => {
    setValues(current => {
      if (current.ods.includes(ods)) {
        return { ...current, ods: current.ods.filter(currentOds => currentOds !== ods) };
      }

      return { ...current, ods: [...current.ods, ods] };
    });
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
    odsOptions: ODS_OPTIONS,
  };
}
