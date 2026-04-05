export type IsoDateString = string;

export interface EventPlace {
  direction: string;
  city: string;
  countryCode: string;
}

export interface Event {
  id: string;
  name: string;
  description: string;
  initialDate: IsoDateString;
  place: EventPlace;
}

export interface Objective {
  name: string;
  description: string;
  unit: string;
  quantity: number;
  currentAmount: number;
}

export interface Action {
  id: string;
  name: string;
  description: string;
  objectives: Objective[];
  events: Event[];
  causeId: string;
}

export interface ActionObjectiveInput {
  name: string;
  description: string;
  quantity: number;
  unit: string;
}

export interface EventPlaceInput {
  direction: string;
  city: string;
  countryCode: string;
}

export interface ActionEventInput {
  name: string;
  description: string;
  initialDate: IsoDateString;
  place: EventPlaceInput;
}

export interface CreateActionRequestInput {
  name: string;
  description: string;
  objectives: ActionObjectiveInput[];
  events: ActionEventInput[];
  userId: string;
  causeId: string;
}
