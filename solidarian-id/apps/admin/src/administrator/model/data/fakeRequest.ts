export interface CommunityRequest {
  id: string;

  type: string;
  date: string;
  state: string;

  name: string;
  description: string;

  cause_request: CauseRequest;
}

export interface CauseRequest {
  id: string;

  type: string;
  date: string;
  state: string;

  name: string;
  description: string;
}

export interface ActionRequest {
  id: string;

  type: string;
  date: string;
  state: string;

  name: string;
  description: string;
}

export const fakeCommunityRequests: CommunityRequest[] = [
  {
    id: '223e4567-e89b-12d3-a456-426655440000',

    type: 'COMMUNITY_REQUEST',
    date: '05/03/2024',
    state: 'PENDING',

    name: 'Comunidad 1',
    description: 'Descripcion de la comunidad 1.',

    cause_request: {
      id: '323e4568-e89b-12d3-a456-426655440000',

      type: 'CAUSE_REQUEST',
      date: '05/03/2024',
      state: 'PENDING',

      name: 'Causa 1',
      description: 'Descripcion de la causa 1.',
    },
  },

  {
    id: '123e4567-e89b-12d3-a456-426655440000',

    type: 'COMMUNITY_REQUEST',
    date: '05/03/2024',
    state: 'PENDING',

    name: 'Comunidad 2',
    description: 'Descripcion de la comunidad 2.',

    cause_request: {
      id: '123e4568-e89b-12d3-a456-426655440000',

      type: 'CAUSE_REQUEST',
      date: '05/03/2024',
      state: 'PENDING',

      name: 'Causa 2',
      description: 'Descripcion de la causa 2.',
    },
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
  },

  {
    id: '123e4567-e89b-12d3-a456-426655440000',

    type: 'CAUSE_REQUEST',
    date: '05/03/2024',
    state: 'PENDING',

    name: 'Causa 2',
    description: 'Descripcion de la causa 2.',
  },
  {
    id: '323e4567-e89b-12d3-a456-426655440000',

    type: 'CAUSE_REQUEST',
    date: '06/03/2024',
    state: 'PENDING',

    name: 'Causa 3',
    description: 'Descripcion de la causa 3.',
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
  },

  {
    id: '123e4567-e89b-12d3-a456-426655440000',

    type: 'ACTION_REQUEST',
    date: '05/03/2024',
    state: 'PENDING',

    name: 'Accion 2',
    description: 'Descripcion de la accion 2.',
  },
];
