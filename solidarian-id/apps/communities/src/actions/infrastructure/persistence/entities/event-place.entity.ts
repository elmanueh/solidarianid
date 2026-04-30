import { Column } from 'typeorm';

export class EventPlaceEntity {
  @Column()
  direction: string;

  @Column()
  city: string;

  @Column()
  countryCode: string;
}
