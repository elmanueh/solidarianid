# Patrón Kafka - Documentación de Implementación

Esta documentación describe cómo se integra y usa Kafka en el proyecto SolidarianID siguiendo los principios de arquitectura del repositorio (Clean Architecture / DDD). Se usa como referencia el estilo y nivel de detalle de `repository-typeorm.md`.

**Arquitectura General**

El uso de Kafka en SolidarianID se organiza con un módulo dinámico reutilizable que registra clientes Kafka por servicio y adapta la publicación/consumo a través de publishers y consumers:

- **Módulo dinámico**: encapsula el registro de `ClientsModule` de NestJS con un token por servicio.
- **Publicadores**: adaptadores que extienden un `KafkaPublisher` genérico para publicar eventos de dominio.
- **Consumidores**: adaptadores decorados con `@MessagePattern` que procesan mensajes entrantes.
- **Tipos y eventos**: enums para topics y event types, y un formato común de mensaje.

**Estructura de carpetas (relevante)**

- `libs/kafka/`: implementación compartida del módulo Kafka y utilidades.
- `apps/<service>/src/infrastructure/messaging/producer`: adaptadores publishers por servicio.
- `apps/<service>/src/infrastructure/messaging/consumer`: adaptadores consumers por servicio.

**Módulo dinámico**

- **Propósito**: registrar un cliente Kafka por servicio con un token exportable para inyección.
- **Implementación**: ver [libs/kafka/src/kafka.module.ts](libs/kafka/src/kafka.module.ts).
- **Convención de token**: el token se construye como `${serviceName}_kafka` (p. ej. al registrar `users` el token es `users_kafka`).

**Publisher genérico y contrato**

- **Contrato**: `Publisher<T>` define `publish(eventType, entity)`; ver [libs/kafka/src/publisher/publisher.ts](libs/kafka/src/publisher/publisher.ts).
- **Implementación**: `KafkaPublisher<T>` implementa `OnModuleInit/OnModuleDestroy`, se conecta al cliente Kafka, construye `KafkaMessage` y emite por topic; ver [libs/kafka/src/publisher/kafka.publisher.ts](libs/kafka/src/publisher/kafka.publisher.ts) y la interfaz [libs/kafka/src/kafka.message.ts](libs/kafka/src/kafka.message.ts).

**Topics y Event Types**

- **Topics**: centralizados en [libs/kafka/src/topics.enum.ts](libs/kafka/src/topics.enum.ts) (por ejemplo `Topics.USERS = 'user-topic'`).
- **Event Types**: definidos en [libs/kafka/src/events.enum.ts](libs/kafka/src/events.enum.ts) (p. ej. `USER_CREATED = 'user.created'`).

**Adaptadores por servicio**

- **Publisher adapter**: ejemplo en `apps/users`: [apps/users/src/infrastructure/messaging/producer/user.publisher.ts](apps/users/src/infrastructure/messaging/producer/user.publisher.ts). Este adaptador extiende `KafkaPublisher<User>` y se registra en `UsersModule` mediante el puerto `UsersPublisherPort`.
- **Consumer adapter**: ejemplo en `apps/users`: [apps/users/src/infrastructure/messaging/consumer/user.consumer.ts](apps/users/src/infrastructure/messaging/consumer/user.consumer.ts). Usa `@MessagePattern(Topics.USERS)` y `KafkaContext` para manejar offsets y commits manuales.

**Inyección de dependencias y tokens**

- Registrar el módulo: en el módulo del servicio incluir `KafkaDynamicModule.register('serviceName')` en `imports` (p. ej. en `UsersModule` se llama `KafkaDynamicModule.register('users')`). Ver [apps/users/src/users.module.ts](apps/users/src/users.module.ts).
- Token resultante: el nombre del cliente exportado coincide con `${serviceName}_kafka`. Asegúrate de inyectar exactamente ese token en los adaptadores con `@Inject('<serviceName>_kafka')`.

**Ejemplos de uso (basado en los ficheros del proyecto)**

1. Registrar el módulo en el módulo de la aplicación (ej.: `UsersModule`)

```ts
// apps/users/src/users.module.ts (fragmento)
imports: [
	TypeOrmModule.forFeature([UserEntity]),
	KafkaDynamicModule.register('users'), // registra el cliente 'users_kafka'
],
```

2. Publisher adapter — ejemplo real del proyecto

```ts
// apps/users/src/infrastructure/messaging/producer/user.publisher.ts
import { Inject, Injectable } from "@nestjs/common";
import { ClientKafka } from "@nestjs/microservices";
import { KafkaPublisher, Topics } from "@solidarianid/kafka";

@Injectable()
export class UsersKafkaPublisherAdapter
  extends KafkaPublisher<User>
  implements UsersPublisherPort
{
  constructor(@Inject("users_kafka") publisher: ClientKafka) {
    super(publisher, Topics.USERS);
  }
}
```

3. Consumer adapter — ejemplo real del proyecto

```ts
// apps/users/src/infrastructure/messaging/consumer/user.consumer.ts
import { Controller } from "@nestjs/common";
import {
  Ctx,
  KafkaContext,
  MessagePattern,
  Payload,
} from "@nestjs/microservices";
import { Topics } from "@solidarianid/kafka";

@Controller()
export class UserConsumerAdapter {
  @MessagePattern(Topics.USERS)
  async handleUserCreated(
    @Payload() payload: any,
    @Ctx() context: KafkaContext,
  ): Promise<void> {
    // procesar payload
    // commit manual de offset si corresponde
  }
}
```

4. Publicar un evento desde la capa de aplicación (servicio)

```ts
// apps/users/src/application/services/users.service.impl.ts (fragmento)
import { EventType } from "@solidarianid/kafka";

@Injectable()
export class UsersServiceImpl implements UsersService {
  constructor(private readonly usersPublisher: UsersPublisherPort) {}

  async createUser(user: User): Promise<void> {
    // persistencia...
    await this.usersPublisher.publish(EventType.USER_CREATED, user);
  }
}
```

5. Arranque y microservice (ejecutar en `main.ts`)

```ts
app.connectMicroservice({
  transport: Transport.KAFKA,
  options: {
    client: {
      clientId: "users",
      brokers: process.env.KAFKA_BROKERS?.split(",") ?? ["localhost:9092"],
    },
    consumer: { groupId: "users-consumer-group" },
  },
});
await app.startAllMicroservices();
```

6. Ejemplo de test unitario (publisher) usando Jest

```ts
// apps/users/src/__tests__/user.publisher.spec.ts
import { UsersKafkaPublisherAdapter } from "../../src/infrastructure/messaging/producer/user.publisher";
import { ClientKafka } from "@nestjs/microservices";

describe("UsersKafkaPublisherAdapter", () => {
  it("should call emit on ClientKafka when publish", async () => {
    const mockClient = { emit: jest.fn() } as unknown as ClientKafka;
    const adapter = new UsersKafkaPublisherAdapter(mockClient);

    const fakeUser = { id: { value: "uuid" } } as any;
    const { EventType } = require("@solidarianid/kafka");
    await adapter.publish(EventType.USER_CREATED, fakeUser);

    expect(mockClient.emit).toHaveBeenCalled();
  });
});
```

7. Comandos de ejecución local

```bash
export KAFKA_BROKERS=localhost:9092
npm run start:dev users
```

**Notas finales**

- Los snippets anteriores están basados en los ficheros reales del repositorio (`apps/users/src/...` y `libs/kafka/src/...`).
- Puedo añadir ejemplos de tests de consumers (mock de `KafkaContext`) o una plantilla de GitHub Action que valide la convención de tokens (`<service>_kafka`).
