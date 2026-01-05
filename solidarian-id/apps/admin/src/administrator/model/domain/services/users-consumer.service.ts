import { UserEventDto } from '@solidarianid/kafka';
import { Either } from '@app/ddd/either';
import { RepositoryException } from '@app/ddd/repository/exceptions/repository.exception';

/**
 * Port (interfaz) del servicio de consumo de eventos de usuarios
 * Define las operaciones de negocio para procesar eventos de Kafka relacionados con usuarios
 * Siguiendo Clean Architecture: esta interfaz pertenece al dominio y no tiene dependencias de infraestructura
 */
export abstract class UsersConsumerService {
  /**
   * Guarda un nuevo usuario recibido desde un evento de Kafka
   * @param userEventDto DTO con los datos del usuario desde el evento de Kafka
   * @returns Either con RepositoryException si falla o el User guardado
   */
  abstract saveNewUser(userEventDto: UserEventDto): Promise<Either<RepositoryException, void>>;
}
