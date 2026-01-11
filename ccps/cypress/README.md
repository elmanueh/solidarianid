# Cypress E2E Test Scripts

Scripts para ejecutar el entorno completo de tests E2E con Cypress para SolidarianID. Todos los resultados obtenidos durante las pruebas se almacenan en la carpeta `solidarian-id/apps/admin/test/cypress/`.

## Requisitos

- Docker y Docker Compose
- npm

## Cómo ejecutar los tests E2E con Cypress

### Paso 0: Define la carpeta .env.test

Crea un fichero `.env.test` en la carpeta `solidarian-id/` con los siguientes datos:

```env
NODE_ENV=test
POSTGRES_USER=solidarian_user
POSTGRES_PASSWORD=solidarian_test_password
POSTGRES_DB=solidarian_id_db_test
MONGO_INITDB_ROOT_USERNAME=test
MONGO_INITDB_ROOT_PASSWORD=test
MONGO_INITDB_DATABASE=solidarianid_test
KAFKA_NODE_ID=1
KAFKA_PROCESS_ROLES=broker,controller
KAFKA_LISTENERS=CONTROLLER://localhost:9091,HOST://0.0.0.0:9092,DOCKER://0.0.0.0:9093
KAFKA_ADVERTISED_LISTENERS=HOST://localhost:9092,DOCKER://kafka:9093
KAFKA_LISTENER_SECURITY_PROTOCOL_MAP=CONTROLLER:PLAINTEXT,DOCKER:PLAINTEXT,HOST:PLAINTEXT
KAFKA_CONTROLLER_LISTENER_NAMES=CONTROLLER
KAFKA_CONTROLLER_QUORUM_VOTERS=1@localhost:9091
KAFKA_INTER_BROKER_LISTENER_NAME=DOCKER
KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR=1
MONGO_HOST=localhost
MONGO_PORT=27018
MONGO_USER=test
MONGO_PASSWORD=test
MONGO_DB=solidarianid_test
KAFKA_DOCKER_BROKERS=localhost:9093
KAFKA_BROKERS=localhost:9093
POSTGRES_HOST=localhost
POSTGRES_PORT=5433
KAFKA_PORT=9093
ADMIN_PORT=3000
USERS_PORT=3001
COMMUNITIES_PORT=3002
SESSION_SECRET=test_session_secret_key
KAFKA_ADMIN_CLIENT_ID=admin
KAFKA_USERS_CLIENT_ID=users
KAFKA_USERS_CONSUMER_GROUP_ID=users-consumer-group-test
KAFKA_COMMUNITIES_CLIENT_ID=communities
KAFKA_COMMUNITIES_CONSUMER_GROUP_ID=communities-consumer-group-test
KAFKA_ADMIN_CONSUMER_GROUP_ID=admin-consumer-group-test
```

### Paso 1: Levantar Docker

Desde la carpeta `solidarian-id/`:

```bash
npm run docker:test
```

Espera a que todos los contenedores estén healthy (MongoDB, PostgreSQL, Kafka).

### Paso 2: Iniciar microservicios

Abre **3 terminales separadas** en `solidarian-id/` y ejecuta en cada una:

**Terminal 1 - Admin:**

```bash
npm run start:test:admin
```

**Terminal 2 - Users:**

```bash
npm run start:test:users
```

**Terminal 3 - Communities:**

```bash
npm run start:test:communities
```

Espera a que todos los servicios estén listos (verás "Nest application successfully started").

### Paso 3: Ejecutar Cypress

En una **4ª terminal** en `solidarian-id/`:

**Modo interactivo (UI):**

```bash
npm run cypress:open
```

**Modo headless (terminal):**

```bash
npm run cypress:run
```

### Paso 4: Limpieza

Cuando termines los tests:

1. Cierra Cypress (si está abierto)
2. Presiona `Ctrl+C` en las 3 terminales de los microservicios
3. Detén los contenedores Docker:

```bash
npm run docker:test:down
```

## Comandos npm disponibles

Desde `solidarian-id/package.json`:

| Comando                          | Descripción                                   |
| -------------------------------- | --------------------------------------------- |
| `npm run docker:test`            | Levanta contenedores Docker de test           |
| `npm run docker:test:down`       | Detiene contenedores Docker de test           |
| `npm run start:test:admin`       | Inicia microservicio Admin en modo test       |
| `npm run start:test:users`       | Inicia microservicio Users en modo test       |
| `npm run start:test:communities` | Inicia microservicio Communities en modo test |
| `npm run cypress:open`           | Abre Cypress en modo interactivo (UI)         |
| `npm run cypress:run`            | Ejecuta Cypress en modo headless (terminal)   |

## Puertos utilizados

| Servicio    | Desarrollo | Testing |
| ----------- | ---------- | ------- |
| PostgreSQL  | 5432       | 5433    |
| MongoDB     | 27017      | 27018   |
| Kafka       | 9092       | 9093    |
| Admin       | 3000       | 3000    |
| Users       | 3001       | 3001    |
| Communities | 3002       | 3002    |

## Verificación de servicios

Antes de ejecutar Cypress, verifica que todos los servicios estén listos:

**Docker:**

```bash
docker ps
**Nota:** Al usar el método manual (Opción 2), los logs se ven directamente en las terminales donde ejecutaste cada microservicio.

# Debes ver: mongo_test, solidarian_postgres_db_test, kafka_test (healthy)
```

**Microservicios:**

- Admin: http://localhost:3000
- Users: http://localhost:3001 (no tiene UI, solo API)
- Communities: http://localhost:3002 (no tiene UI, solo API)
