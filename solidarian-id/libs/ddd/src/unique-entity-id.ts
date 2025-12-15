import { v4 as uuidv4, validate } from 'uuid';

export class UniqueEntityID {
  readonly value: string;

  private constructor(plainId?: string) {
    if (plainId) this.value = plainId;
    else this.value = uuidv4();
  }

  equals(other: UniqueEntityID) {
    return this.value === other.value;
  }

  static create(plainId?: string): UniqueEntityID {
    if (plainId && !validate(plainId))
      throw new Error('Invalid UUID v4: ' + plainId);
    return new UniqueEntityID(plainId);
  }
}
