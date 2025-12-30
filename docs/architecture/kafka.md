# Implementación de Kafka en SolidarianID (NestJS) — Guía basada en tu proyecto

Esta documentación describe **cómo integrar Kafka en tu código fuente** utilizando tu librería interna `libs/kafka`, siguiendo el enfoque del monorepo: **Clean Architecture + DDD**, con **puertos** (contratos) y **adaptadores** (implementaciones).

El objetivo es que puedas:

- Configurar Kafka de forma **reutilizable** (librería `libs/kafka`)
- Publicar eventos de dominio desde cada microservicio (adaptadores _producer_)
- Consumir eventos en microservicios (adaptadores _consumer_)
- Levantar Kafka localmente con Docker (incluyendo **healthcheck** y **creación de topics**)
- Ejecutar tests de integración con **Testcontainers** inyectando brokers dinámicamente

---

## Arquitectura general

En tu solución hay **dos piezas** distintas (y complementarias):

1. **Cliente productor (ClientKafka)**

   - Se registra vía `KafkaDynamicModule.register('<serviceName>')`
   - Se inyecta con el token `'<serviceName>_kafka'`
   - Se usa desde adaptadores (ej. `UsersKafkaPublisherAdapter`) para publicar mensajes a un **topic**

2. **Servidor consumidor (Nest microservice Kafka)**
   - Se conecta en `main.ts` con `app.connectMicroservice({ transport: Transport.KAFKA, ... })`
   - Permite usar `@MessagePattern(<topic>)` en controladores consumidores (ej. `UserConsumerAdapter`)

> En resumen: **ClientsModule** (producer) + **connectMicroservice** (consumer).

---

## Estructura de carpetas relevante

```
solidarian-id/
├── docker-compose.yml
├── apps/
│   └── users/
│       └── src/
│           ├── main.ts                                  # connectMicroservice(KAFKA) (consumer side)
│           ├── app.module.ts                            # ConfigModule + KafkaBrokersModule
│           ├── users.module.ts                          # KafkaDynamicModule.register('users') + adapters
│           └── infrastructure/
│               └── messaging/
│                   ├── producer/
│                   │   └── user.publisher.ts            # UsersKafkaPublisherAdapter (producer)
│                   └── consumer/
│                       └── user.consumer.ts             # @MessagePattern(Topics.USERS) (consumer)
└── libs/
    ├── kafka/
    │   └── src/
    │       ├── index.ts
    │       ├── kafka.module.ts                          # KafkaDynamicModule (producer client)
    │       ├── kafka-config.module.ts                   # KafkaBrokersModule (token KAFKA_BROKERS)
    │       ├── tokens.ts                                # KAFKA_BROKERS
    │       ├── topics.enum.ts                           # Topics
    │       ├── events.enum.ts                           # EventType
    │       ├── kafka.message.ts                         # KafkaMessage
    │       ├── events/generic-event.ts                  # GenericEvent (DomainEvent)
    │       └── publisher/
    │           ├── publisher.ts                         # Publisher<T> (Puerto)
    │           └── kafka.publisher.ts                   # KafkaPublisher<T> (Adaptador base)
    └── test/
        └── src/
            ├── kafka.test-container.ts                  # KafkaTestContainer (Testcontainers)
            └── kafka.test-container.module.ts           # KafkaTestModule (inyecta KAFKA_BROKERS)
```

---

## Variables de entorno

Tu integración soporta brokers por variable de entorno:

- `KAFKA_BROKERS`: lista separada por comas (ej. `localhost:9092` o `kafka:9093`)

> Regla práctica en tu compose:
>
> - **Desde el host** (apps en tu máquina): `localhost:9092`
> - **Desde otros contenedores** (misma red Docker): `kafka:9093`

---

## La pieza que te faltaba: `KafkaBrokersModule`

Este módulo es la base de toda la DI de brokers en tu librería. Es **@Global**, exporta el token `KAFKA_BROKERS` y resuelve el valor desde `ConfigService`, con fallback.

**`libs/kafka/src/kafka-config.module.ts`**

```ts
import { Global, Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { KAFKA_BROKERS } from "./tokens";

const DEFAULT_BROKERS = ["localhost:9092"];

@Global()
@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: KAFKA_BROKERS,
      inject: [ConfigService],
      useFactory: (config: ConfigService) =>
        config.get<string>("KAFKA_BROKERS")?.split(",") ?? DEFAULT_BROKERS,
    },
  ],
  exports: [KAFKA_BROKERS],
})
export class KafkaBrokersModule {}
```

### ¿Por qué es importante?

- Evita leer `.env` manualmente por todos lados.
- Permite que el `KafkaDynamicModule.register()` reciba brokers **por inyección**.
- En tests, puedes sobrescribir el provider `KAFKA_BROKERS` sin tocar `.env`.

---

## Integración en tu código (paso a paso “desde cero”)

A continuación tienes un “recetario” de implementación para añadir Kafka a **cualquier microservicio** nuevo (ej. `communities`, `requests`, etc.) usando **tu librería**.

### 0) Prerrequisitos

- Tener instalada la librería en el monorepo (ya la tienes): `libs/kafka`
- Tener `@nestjs/microservices` y dependencias Kafka configuradas como en tu proyecto
- Tener Kafka levantado (Docker compose o Testcontainers)

---

### 1) Definir el topic y el tipo de evento (contrato compartido)

1. Elige el **topic** donde viajarán los eventos del bounded context.
2. Elige un **EventType** para el evento concreto.

**`libs/kafka/src/topics.enum.ts`**

```ts
export enum Topics {
  USERS = "user-topic",
  REQUESTS = "request-topic",
  COMMUNITIES = "community-topic",
  CAUSES = "cause-topic",
  EVENTS = "event-topic",
}
```

**`libs/kafka/src/events.enum.ts`**

```ts
export enum EventType {
  COMMUNITY_CREATED = "community.created",
  COMMUNITY_UPDATED = "community.updated",
  // ...
}
```

> Patrón recomendado con tu diseño: **1 topic por microservicio/bounded context**, y el `EventType` distingue el “evento” real dentro del mensaje.

---

### 2) Importar `KafkaBrokersModule` en el `AppModule` del microservicio

**`apps/<service>/src/app.module.ts`**

```ts
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { KafkaBrokersModule } from "@solidarianid/kafka";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    KafkaBrokersModule,
    // ...tu DatabaseModule y tu Module principal
  ],
})
export class AppModule {}
```

---

### 3) Registrar el Producer (ClientKafka) con `KafkaDynamicModule.register('<serviceName>')`

**`apps/<service>/src/<service>.module.ts`**

```ts
import { Module } from "@nestjs/common";
import { KafkaDynamicModule } from "@solidarianid/kafka";

@Module({
  imports: [
    KafkaDynamicModule.register("<serviceName>"),
    // ...TypeOrm/Mongoose/etc
  ],
  providers: [
    // aquí meterás tu adapter publisher y bindings
  ],
})
export class ServiceModule {}
```

Esto habilita la inyección con el token:

- `@Inject('<serviceName>_kafka') publisher: ClientKafka`

---

### 4) Crear el Puerto de salida (PublisherPort) en tu dominio

**`apps/<service>/src/domain/ports/out/<service>.publisher.port.ts`**

```ts
import { Publisher } from "@solidarianid/kafka";
import { YourAggregateRoot } from "../model/your-aggregate-root";

export abstract class ServicePublisherPort extends Publisher<YourAggregateRoot> {}
```

---

### 5) Crear el adaptador Producer (infra) usando `KafkaPublisher<T>`

Tu librería ya trae un adaptador base reutilizable:

**`libs/kafka/src/publisher/kafka.publisher.ts`** (base)

- Construye `GenericEvent`
- Emite `KafkaMessage` con `key` y `value`
- `connect()` en `onModuleInit` y `close()` en `onModuleDestroy`

Ahora, en tu microservicio, crea el adapter concreto:

**`apps/<service>/src/infrastructure/messaging/producer/<service>.publisher.ts`**

```ts
import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { KafkaPublisher, Topics } from '@solidarianid/kafka';
import { ServicePublisherPort } from '@app/<service>/domain/ports/out/<service>.publisher.port';
import { YourAggregateRoot } from '@app/<service>/domain/model/your-aggregate-root';

@Injectable()
export class ServiceKafkaPublisherAdapter
  extends KafkaPublisher<YourAggregateRoot>
  implements ServicePublisherPort
{
  constructor(@Inject('<serviceName>_kafka') publisher: ClientKafka) {
    super(publisher, Topics.<TU_TOPIC>);
  }
}
```

---

### 6) “Bind” del puerto al adapter en el módulo

**`apps/<service>/src/<service>.module.ts`**

```ts
import { ServicePublisherPort } from "@app/<service>/domain/ports/out/<service>.publisher.port";
import { ServiceKafkaPublisherAdapter } from "./infrastructure/messaging/producer/<service>.publisher";

providers: [
  {
    provide: ServicePublisherPort,
    useClass: ServiceKafkaPublisherAdapter,
  },
];
```

---

### 7) Publicar eventos desde Application Service (sin acoplarte a Kafka)

**`apps/<service>/src/application/services/<service>.service.impl.ts`**

```ts
import { EventType } from '@solidarianid/kafka';
import { ServicePublisherPort } from '@app/<service>/domain/ports/out/<service>.publisher.port';

await this.publisher.publish(EventType.<TU_EVENT_TYPE>, aggregate);
```

---

### 8) Consumidor: crear controller con `@MessagePattern(Topics.<...>)`

**`apps/<service>/src/infrastructure/messaging/consumer/<service>.consumer.ts`**

```ts
import { Controller } from '@nestjs/common';
import { Ctx, KafkaContext, MessagePattern, Payload } from '@nestjs/microservices';
import { Topics } from '@solidarianid/kafka';

@Controller()
export class ServiceConsumerAdapter {
  @MessagePattern(Topics.<TU_TOPIC>)
  async handle(@Payload() payload: any, @Ctx() context: KafkaContext) {
    // 1) parsea payload
    // 2) filtra por payload.value.eventType si quieres separar eventos en el mismo topic
    // 3) aplica lógica
    // 4) commit manual si mantienes tu estrategia
  }
}
```

Y recuerda añadirlo a `controllers: []` del módulo.

---

### 9) Activar el “Kafka server” en `main.ts` (para que funcione @MessagePattern)

**`apps/<service>/src/main.ts`**

```ts
import { NestFactory } from "@nestjs/core";
import { Transport } from "@nestjs/microservices";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: "<serviceName>",
        brokers: process.env.KAFKA_BROKERS?.split(",") ?? ["localhost:9092"],
      },
      consumer: { groupId: "<serviceName>-consumer-group" },
    },
  });

  await app.startAllMicroservices();
  await app.listen(3000);
}
bootstrap();
```

> Si quieres ir 100% por DI también aquí, puedes leer brokers desde `ConfigService` (igual que haces en otras partes). Tu proyecto ahora mismo lo resuelve en `main.ts` vía env, que es válido.

---

---

## Implementación en tu código fuente usando `libs/kafka` (pasos por archivos)

Esta sección es la “receta” para que puedas integrar Kafka en **cualquier** microservicio de tu monorepo, reutilizando **tal cual** la librería `libs/kafka` (sin copiar/pegar configuración).

> Ejemplo guía: `apps/users` (pero aplica igual a `communities`, `requests`, `administrator`, etc.)

### 0) Pre-requisitos (local y runtime)

- Añade en el `.env.<entorno>` del microservicio:
  - `KAFKA_BROKERS=localhost:9092` (si ejecutas desde tu máquina contra Kafka local)
  - o `KAFKA_BROKERS=kafka:9093` (si el microservicio está en Docker en la misma red del broker)
- Asegúrate de tener levantado Kafka (por ejemplo con tu `docker-compose.yml`) y que los **topics** existen (`kafka-init`).

---

### 1) Importa `KafkaBrokersModule` en el `AppModule` del microservicio

**Qué hace:** expone el token `KAFKA_BROKERS` como **provider global**, leyendo `KAFKA_BROKERS` desde `ConfigService` y aplicando fallback (`localhost:9092`) si no existe.

**Archivo:** `apps/<ms>/src/app.module.ts`

```ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database.module';
import { KafkaBrokersModule } from '@solidarianid/kafka'; // recomendado: importar desde la lib
import { <Service>Module } from './<service>.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    DatabaseModule,
    KafkaBrokersModule,
    <Service>Module,
  ],
})
export class AppModule {}
```

✅ En tu proyecto ya lo haces así (ej. `apps/users/src/app.module.ts`).

---

### 2) Entiende `KafkaBrokersModule` (la pieza que faltaba explicar)

**Archivo:** `libs/kafka/src/kafka-config.module.ts`

```ts
import { Global, Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { KAFKA_BROKERS } from "./tokens";

const DEFAULT_BROKERS = ["localhost:9092"];

@Global()
@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: KAFKA_BROKERS,
      inject: [ConfigService],
      useFactory: (config: ConfigService) =>
        config.get<string>("KAFKA_BROKERS")?.split(",") ?? DEFAULT_BROKERS,
    },
  ],
  exports: [KAFKA_BROKERS],
})
export class KafkaBrokersModule {}
```

**Cómo se usa:** cualquier módulo que registre Kafka (ej. `KafkaDynamicModule.register(...)`) puede inyectar este token y obtener la lista de brokers sin depender de `process.env` directamente.

---

### 3) Registra el **producer client** con `KafkaDynamicModule.register('<serviceName>')`

**Qué hace:** crea un `ClientKafka` con el nombre `'<serviceName>_kafka'` y lo deja listo para inyectar (producer).

**Archivo:** `apps/<ms>/src/<service>.module.ts`

```ts
import { Module } from '@nestjs/common';
import { KafkaDynamicModule } from '@solidarianid/kafka';

@Module({
  imports: [
    // ...otros imports (TypeOrm/Mongoose/etc.)
    KafkaDynamicModule.register('<serviceName>'),
  ],
})
export class <Service>Module {}
```

📌 Ejemplo real en tu repo: `KafkaDynamicModule.register('users')` → token de inyección: `'users_kafka'`.

---

### 4) Define el **puerto** de publicación para tu agregado

Mantienes Clean Architecture: aplicación → depende del **puerto**, no de Kafka.

**Archivo recomendado:** `apps/<ms>/src/domain/ports/out/<service>.publisher.port.ts`

```ts
import { Publisher } from '@solidarianid/kafka';
import { <AggregateRoot> } from '../../model/<aggregate-root>';

export abstract class <Service>PublisherPort extends Publisher<<AggregateRoot>> {}
```

---

### 5) Implementa el **adaptador producer** extendiendo `KafkaPublisher<T>`

**Qué hace:** adapta `ClientKafka` a tu puerto de publicación (`PublisherPort`) y fija el **topic**.

**Archivo recomendado:** `apps/<ms>/src/infrastructure/messaging/producer/<service>.publisher.ts`

```ts
import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { KafkaPublisher, Topics } from '@solidarianid/kafka';
import { <Service>PublisherPort } from '../../../domain/ports/out/<service>.publisher.port';
import { <AggregateRoot> } from '../../../domain/model/<aggregate-root>';

@Injectable()
export class <Service>KafkaPublisherAdapter
  extends KafkaPublisher<<AggregateRoot>>
  implements <Service>PublisherPort
{
  constructor(@Inject('<serviceName>_kafka') publisher: ClientKafka) {
    super(publisher, Topics.<TOPIC_ENUM>);
  }
}
```

---

### 6) Enlaza el puerto → adaptador en el módulo

**Archivo:** `apps/<ms>/src/<service>.module.ts`

```ts
providers: [
  {
    provide: <Service>PublisherPort,
    useClass: <Service>KafkaPublisherAdapter,
  },
],
```

---

### 7) Publica eventos desde la capa de aplicación (use cases)

**Archivo:** `apps/<ms>/src/application/services/...`

```ts
await this.publisher.publish(EventType.<EVENT>, aggregate);
```

Recomendación de naming:

- `Topics` por **bounded context / agregado principal** (ej. `USERS`, `COMMUNITIES`)
- `EventType` por **evento de dominio** (ej. `user.created`, `community.joined`)

---

### 8) Activa el **consumer side** en `main.ts` (si ese microservicio consume)

**Archivo:** `apps/<ms>/src/main.ts`

```ts
import { Transport } from "@nestjs/microservices";

app.connectMicroservice({
  transport: Transport.KAFKA,
  options: {
    client: {
      clientId: "<serviceName>",
      brokers: process.env.KAFKA_BROKERS?.split(",") ?? ["localhost:9092"],
    },
    consumer: { groupId: "<serviceName>-consumer-group" },
  },
});

await app.startAllMicroservices();
```

📌 Nota: aquí podrías también **inyectar** `KAFKA_BROKERS` vía módulo y evitar `process.env`, pero tu implementación actual es válida y clara.

---

### 9) Crea el adaptador consumer con `@MessagePattern(Topics.<...>)`

**Archivo:** `apps/<ms>/src/infrastructure/messaging/consumer/...`

```ts
import { Controller } from '@nestjs/common';
import { Ctx, KafkaContext, MessagePattern, Payload } from '@nestjs/microservices';
import { Topics } from '@solidarianid/kafka';

@Controller()
export class <Service>ConsumerAdapter {
  @MessagePattern(Topics.<TOPIC_ENUM>)
  async handle(@Payload() payload: any, @Ctx() context: KafkaContext): Promise<void> {
    // Procesa payload
  }
}
```

---

### 10) (Opcional) Añade el topic a Docker init (local)

Si introduces un nuevo `Topics.<X>`, añade su creación en `kafka-init`:

```yml
/opt/kafka/bin/kafka-topics.sh --bootstrap-server $$BOOTSTRAP --create --if-not-exists --topic <topic> --partitions 1 --replication-factor 1;
```

---

### 11) (Opcional) Tests e2e con brokers reales (Testcontainers)

Si quieres tests sin depender de tu Kafka local:

- Usa `KafkaTestModule.forRoot()` para inyectar `KAFKA_BROKERS`
- Así `KafkaDynamicModule.register('<serviceName>')` funciona con el broker dinámico del contenedor

---

## Paso a paso (tal y como lo has implementado) — explicación interna de la librería

### Paso 1: Definir el _contrato_ de publicación (Puerto)

**`libs/kafka/src/publisher/publisher.ts`**

```ts
import { Entity } from "@app/ddd/entity";
import { EventType } from "../events.enum";

export abstract class Publisher<T extends Entity<any>> {
  abstract publish(eventType: EventType, entity: T): Promise<void>;
}
```

---

### Paso 2: Definir el payload (mensaje) y el evento genérico

**`libs/kafka/src/kafka.message.ts`**

```ts
export interface KafkaMessage {
  key: string;
  value: any;
  headers?: Record<string, string>;
}
```

**`libs/kafka/src/events/generic-event.ts`**

```ts
export class GenericEvent implements DomainEvent {
  occurredOn: Date;
  private readonly eventType: EventType;
  private readonly entity: Entity<any>;
  // ...
}
```

---

### Paso 3: Adaptador base `KafkaPublisher<T>` (infra compartida)

**`libs/kafka/src/publisher/kafka.publisher.ts`**

```ts
export class KafkaPublisher<T extends Entity<any>>
  extends Publisher<T>
  implements OnModuleDestroy, OnModuleInit
{
  constructor(
    private readonly publisher: ClientKafka,
    private readonly topic: Topics,
  ) {
    super();
  }

  publish(eventType: EventType, entity: T): Promise<void> {
    const genericEvent = GenericEvent.create(eventType, entity);

    const message: KafkaMessage = {
      key: entity.id.value,
      value: genericEvent,
    };

    this.publisher.emit<KafkaMessage>(this.topic, message);
    return Promise.resolve();
  }

  onModuleInit() {
    return this.publisher.connect();
  }
  onModuleDestroy() {
    return this.publisher.close();
  }
}
```

---

### Paso 4: `KafkaDynamicModule.register(serviceName)` (producer client)

**`libs/kafka/src/kafka.module.ts`** crea un `ClientKafka` por microservicio y lo exporta para DI.

- Token: `'<serviceName>_kafka'`
- consumer group: `'<serviceName>-consumer-group'`

---

## Docker Compose (Kafka local) — tu configuración

Tu `docker-compose.yml` levanta Kafka con:

- Listener **HOST** (host → contenedor): `localhost:9092`
- Listener **DOCKER** (contenedores en red): `kafka:9093`
- Listener **CONTROLLER**: `localhost:9091` (Raft controller)

### Healthcheck (robusto para apache/kafka)

```yml
healthcheck:
  test:
    [
      "CMD-SHELL",
      "/opt/kafka/bin/kafka-broker-api-versions.sh --bootstrap-server localhost:9092 >/dev/null 2>&1 || exit 1",
    ]
  interval: 10s
  timeout: 5s
  retries: 30
  start_period: 30s
```

### Creación automática de topics (kafka-init)

```yml
kafka-init:
  depends_on:
    kafka:
      condition: service_healthy
  command: >
    "
    set -e;
    BOOTSTRAP=kafka:9093;

    /opt/kafka/bin/kafka-topics.sh --bootstrap-server $$BOOTSTRAP --create --if-not-exists --topic user-topic      --partitions 1 --replication-factor 1;
    ...
    echo 'Topics ready';
    "
```

---

## Testing con Testcontainers (Kafka real en integración)

Tu librería `libs/test` incluye:

- `KafkaTestContainer`: arranca Kafka real y expone broker dinámico
- `KafkaTestModule.forRoot()`: **inyecta** `KAFKA_BROKERS` para que `KafkaDynamicModule.register()` funcione sin `.env`

Patrón de uso recomendado en e2e:

- Importar `await KafkaTestModule.forRoot()` en el `TestingModule` **antes** de inicializar la app.

---

## Checklist rápido para añadir Kafka a otro microservicio

1. `AppModule`: `ConfigModule.forRoot({ isGlobal: true })` + `KafkaBrokersModule`
2. `<Service>Module`: `KafkaDynamicModule.register('<serviceName>')`
3. Puerto: `abstract class <Service>PublisherPort extends Publisher<Aggregate> {}`
4. Producer adapter: `extends KafkaPublisher<Aggregate>` + `@Inject('<serviceName>_kafka')`
5. Bind DI: `provide: <Service>PublisherPort, useClass: <Service>KafkaPublisherAdapter`
6. `main.ts`: `app.connectMicroservice({ transport: Transport.KAFKA, ... })` + `startAllMicroservices()`
7. Consumer: `@MessagePattern(Topics.<...>)` + manejo/commit

---

## Notas prácticas (para que no te explote en producción)

- **Topic vs EventType**: normalmente mantienes **un topic por microservicio** y multiplexas eventos con `eventType`. En el consumer, filtra por `payload.value.eventType` (según cómo llegue serializado).
- **Serialización**: estás enviando instancias (`Entity` + `GenericEvent`). Si te da problemas con JSON/DTO, alternativa limpia:
  - `value: { eventType, occurredOn, data: <plain object> }`
- **Idempotencia**: si haces commit manual + reintentos, tus handlers deben ser idempotentes cuando aplique.

---

## Referencias internas (archivos exactos)

- `libs/kafka/src/kafka.module.ts` — `KafkaDynamicModule`
- `libs/kafka/src/kafka-config.module.ts` — `KafkaBrokersModule`
- `libs/kafka/src/publisher/kafka.publisher.ts` — `KafkaPublisher<T>`
- `apps/users/src/main.ts` — `connectMicroservice(Transport.KAFKA)`
- `apps/users/src/infrastructure/messaging/producer/user.publisher.ts`
- `apps/users/src/infrastructure/messaging/consumer/user.consumer.ts`
- `docker-compose.yml` — `kafka`, `kafka-init`, `kafka-ui`
- `libs/test/src/kafka.test-container.ts` — Testcontainers
