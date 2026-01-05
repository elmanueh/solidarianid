import { Injectable } from '@nestjs/common';
import { UserEventDto } from '@solidarianid/kafka';
import { UsersConsumerService } from '../../domain/services/users-consumer.service';
import { UserRepositoryPort } from '../../domain/ports/output/user.repository.port';
import { User } from '../../domain/models/user';
import { Either, left, right } from '@app/ddd/either';
import { RepositoryException } from '@app/ddd/repository/exceptions/repository.exception';

/**
 * Implementación del servicio de consumo de eventos de usuarios
 * Procesa eventos de Kafka relacionados con usuarios y los persiste en el sistema
 *
 * Siguiendo Clean Architecture:
 * - Application Layer: Orquesta la lógica de negocio
 * - Depende de abstracciones (ports) del dominio, no de implementaciones concretas
 */
@Injectable()
export class UsersConsumerServiceImpl extends UsersConsumerService {
  constructor(private readonly userRepository: UserRepositoryPort) {
    super();
  }

  /**
   * Guarda un nuevo usuario recibido desde un evento de Kafka
   * Convierte el DTO a entidad de dominio y lo persiste
   *
   * @param userEventDto DTO con los datos del usuario desde el evento de Kafka
   * @returns Either con RepositoryException si falla o el User guardado
   */
  async saveNewUser(userEventDto: UserEventDto): Promise<Either<RepositoryException, void>> {
    try {
      // Crear entidad User desde el DTO de Kafka
      // Los usuarios de eventos de Kafka aún no tienen comunidades asignadas
      const userOrError = User.create(
        userEventDto.id,
        userEventDto.fullName,
        userEventDto.username,
        userEventDto.mobilePhone,
        userEventDto.city,
        userEventDto.countryCode,
        [], // Sin comunidades inicialmente
      );

      // Validar que la entidad se creó correctamente
      if (userOrError.isLeft()) {
        return left(new RepositoryException(`Validation error creating user entity: ${userOrError.value.message}`));
      }

      const user = userOrError.value;

      // Persistir el usuario usando el repositorio
      const saveResult = await this.userRepository.save(user);

      if (saveResult.isLeft()) {
        return left(saveResult.value);
      }

      return right(void 0);
    } catch (error) {
      return left(new RepositoryException('Unexpected error processing user event', error));
    }
  }
}
