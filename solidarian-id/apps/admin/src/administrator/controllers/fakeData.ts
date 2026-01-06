import { CreateEventProps } from '@app/admin/administrator/model/domain/models/value-objects/event';
import { CreateObjectiveProps } from '@app/admin/administrator/model/domain/models/value-objects/objective';
import { SustainableDevelopmentGoal } from '@app/value-objects/model/ods';

export interface CommunityRequest {
  id: string;

  type: string;
  date: string;
  state: string;

  name: string;
  description: string;

  cause_requests: CauseRequest[];
}

export interface CauseRequest {
  id: string;

  type: string;
  date: string;
  state: string;

  name: string;
  description: string;

  startDate: Date;
  duration: number;
  ods: SustainableDevelopmentGoal[];
}

export interface ActionRequest {
  id: string;

  type: string;
  date: string;
  state: string;

  name: string;
  description: string;

  objectives: CreateObjectiveProps[];
  events: CreateEventProps[];
}

export const fakeCommunityRequests: CommunityRequest[] = [
  {
    id: '223e4567-e89b-12d3-a456-426655440000',

    type: 'COMMUNITY_REQUEST',
    date: '05/03/2024',
    state: 'PENDING',

    name: 'Comunidad 1',
    description: 'Descripcion de la comunidad 1.',

    cause_requests: [
      {
        id: '323e4568-e89b-12d3-a456-426655440000',

        type: 'CAUSE_REQUEST',
        date: '05/03/2024',
        state: 'PENDING',

        name: 'Causa 1',
        description: 'Descripcion de la causa 1.',

        startDate: new Date('2024-04-01'),
        duration: 6,
        ods: [SustainableDevelopmentGoal.AffordableAndCleanEnergy, SustainableDevelopmentGoal.CleanWaterAndSanitation],
      },
      {
        id: '323e4569-e89b-12d3-a456-426655440000',

        type: 'CAUSE_REQUEST',
        date: '05/03/2024',
        state: 'PENDING',

        name: 'Causa 3',
        description: 'Descripcion de la causa 3.',

        startDate: new Date('2024-06-10'),
        duration: 9,
        ods: [SustainableDevelopmentGoal.QualityEducation, SustainableDevelopmentGoal.GoodHealthAndWellBeing],
      },
    ],
  },

  {
    id: '123e4567-e89b-12d3-a456-426655440000',

    type: 'COMMUNITY_REQUEST',
    date: '05/03/2024',
    state: 'PENDING',

    name: 'Comunidad 2',
    description: 'Descripcion de la comunidad 2.',

    cause_requests: [
      {
        id: '123e4568-e89b-12d3-a456-426655440000',

        type: 'CAUSE_REQUEST',
        date: '05/03/2024',
        state: 'PENDING',

        name: 'Causa 2',
        description: 'Descripcion de la causa 2.',

        startDate: new Date('2024-05-15'),
        duration: 12,
        ods: [SustainableDevelopmentGoal.ReducedInequalities, SustainableDevelopmentGoal.ZeroHunger],
      },
    ],
  },
];

export const fakeCauseRequests: CauseRequest[] = [
  {
    id: '223e4567-e89b-12d3-a456-426655440000',

    type: 'CAUSE_REQUEST',
    date: '05/03/2024',
    state: 'PENDING',

    name: 'Causa 1',
    description: 'Descripcion de la causa 1.',

    startDate: new Date('2024-04-01'),
    duration: 6,
    ods: [SustainableDevelopmentGoal.AffordableAndCleanEnergy, SustainableDevelopmentGoal.CleanWaterAndSanitation],
  },

  {
    id: '123e4567-e89b-12d3-a456-426655440000',

    type: 'CAUSE_REQUEST',
    date: '05/03/2024',
    state: 'PENDING',

    name: 'Causa 2',
    description: 'Descripcion de la causa 2.',

    startDate: new Date('2024-05-15'),
    duration: 12,
    ods: [SustainableDevelopmentGoal.ReducedInequalities, SustainableDevelopmentGoal.ZeroHunger],
  },
];

export const fakeActionRequests: ActionRequest[] = [
  {
    id: '223e4567-e89b-12d3-a456-426655440000',

    type: 'ACTION_REQUEST',
    date: '05/03/2024',
    state: 'PENDING',

    name: 'Accion 1',
    description: 'Descripcion de la accion 1.',

    objectives: [
      {
        name: 'Objetivo 1',
        description: 'Descripcion del objetivo 1',
        quantity: 100,
        unit: 'Litros',
      },
      {
        name: 'Objetivo 2',
        description: 'Descripcion del objetivo 2',
        quantity: 200,
        unit: 'Kilogramos',
      },
    ],
    events: [
      {
        name: 'Evento 1',
        description: 'Descripcion del evento 1',
        initialDate: new Date('2024-06-01'),
        place: {
          direction: 'Calle Falsa 123',
          city: 'Springfield',
          countryCode: 'US',
        },
      },
      {
        name: 'Evento 2',
        description: 'Descripcion del evento 2',
        initialDate: new Date('2024-07-15'),
        place: {
          direction: 'Avenida Siempre Viva 742',
          city: 'Shelbyville',
          countryCode: 'US',
        },
      },
    ],
  },

  {
    id: '123e4567-e89b-12d3-a456-426655440000',

    type: 'ACTION_REQUEST',
    date: '05/03/2024',
    state: 'PENDING',

    name: 'Accion 2',
    description: 'Descripcion de la accion 2.',

    objectives: [
      {
        name: 'Objetivo 1',
        description: 'Descripcion del objetivo 1',
        quantity: 100,
        unit: 'Litros',
      },
      {
        name: 'Objetivo 2',
        description: 'Descripcion del objetivo 2',
        quantity: 200,
        unit: 'Kilogramos',
      },
    ],
    events: [
      {
        name: 'Evento 1',
        description: 'Descripcion del evento 1',
        initialDate: new Date('2024-06-01'),
        place: {
          direction: 'Calle Falsa 123',
          city: 'Springfield',
          countryCode: 'US',
        },
      },
      {
        name: 'Evento 2',
        description: 'Descripcion del evento 2',
        initialDate: new Date('2024-07-15'),
        place: {
          direction: 'Avenida Siempre Viva 742',
          city: 'Shelbyville',
          countryCode: 'US',
        },
      },
    ],
  },
];
