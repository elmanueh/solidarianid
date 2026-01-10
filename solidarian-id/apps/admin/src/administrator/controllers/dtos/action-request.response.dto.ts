import { ActionRequest } from '@app/admin/administrator/model/domain/models/action-request';

export class ActionRequestResponseDto {
  static toDto(action: ActionRequest): ActionRequestResponseDto {
    return {
      id: action.id.value,
      name: action.name,
      description: action.description,

      date: action.createdAt,
      objectives: action.objectives.map(obj => ({
        name: obj.name,
        description: obj.description,
        quantity: obj.quantity,
        unit: obj.unit,
      })),
      events: action.events.map(evt => ({
        name: evt.name,
        description: evt.description,
        initialDate: evt.initialDate,
        place: evt.place,
      })),
    };
  }
}
