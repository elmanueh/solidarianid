export interface DomainEvent {
  readonly occurredOn: Date;
  readonly id: string;
  readonly type: string;
}
