import { ValueObject } from '@app/ddd/value-object';
import { Either, right } from '@app/ddd/either';
import { InvalidFullNameError } from '@app/value-objects/errors/validation/full-name-validation-error';

export interface FullNameProps {
  nombre: string;
  apellido1: string;
  apellido2?: string;
}

export class FullName extends ValueObject<FullNameProps> {
  private constructor(nombre: string, apellido1: string, apellido2?: string) {
    super({ nombre, apellido1, apellido2 });
  }

  get nombre(): string {
    return this.props.nombre;
  }

  get apellido1(): string {
    return this.props.apellido1;
  }

  get apellido2(): string | undefined {
    return this.props.apellido2;
  }

  get fullName(): string {
    const parts = [this.nombre, this.apellido1];
    if (this.apellido2) {
      parts.push(this.apellido2);
    }
    return parts.join(' ');
  }

  public equals(other: FullName): boolean {
    return (
      this.nombre === other.nombre &&
      this.apellido1 === other.apellido1 &&
      this.apellido2 === other.apellido2
    );
  }

  public static create(
    nombre: string,
    apellido1: string,
    apellido2?: string,
  ): Either<InvalidFullNameError, FullName> {
    return right(new FullName(nombre, apellido1, apellido2));
  }
}
