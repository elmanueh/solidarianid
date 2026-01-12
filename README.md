<p align="center">
  <img src="solidarian-id/apps/admin/public/icons/solidarian-128x128.png" alt="SolidarianID Logo" width="128" height="128"/>
</p>

<h1 align="center">SolidarianID</h1>

<p align="center">
  <strong>Plataforma de gestión de voluntariado y causas solidarias del grupo 3</strong>
</p>

<p align="center">
  <a href="https://github.com/solidarianid/solidarianid/graphs/contributors">
    <img src="https://img.shields.io/badge/contributors-2-blue?style=for-the-badge" alt="Contributors"/>
  </a>
  <a href="https://github.com/solidarianid/solidarianid/issues">
    <img src="https://img.shields.io/badge/issues-open-green?style=for-the-badge" alt="Issues"/>
  </a>
  <a href="https://github.com/solidarianid/solidarianid/stargazers">
    <img src="https://img.shields.io/github/stars/solidarianid/solidarianid?style=for-the-badge" alt="Stars"/>
  </a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/NestJS-11.0-E0234E?style=for-the-badge&logo=nestjs&logoColor=white" alt="NestJS"/>
  <img src="https://img.shields.io/badge/TypeScript-5.9-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript"/>
  <img src="https://img.shields.io/badge/MongoDB-9.0-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB"/>
  <img src="https://img.shields.io/badge/PostgreSQL-16-336791?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL"/>
  <img src="https://img.shields.io/badge/Kafka-Latest-231F20?style=for-the-badge&logo=apachekafka&logoColor=white" alt="Kafka"/>
  <img src="https://img.shields.io/badge/Docker-Latest-2496ED?style=for-the-badge&logo=docker&logoColor=white" alt="Docker"/>
</p>

---

## Tabla de Contenidos

- [Tabla de Contenidos](#tabla-de-contenidos)
- [Descripción](#descripción)
- [Arquitectura](#arquitectura)
- [Despliegue en cloud](#despliegue-en-cloud)
- [Despliegue en local](#despliegue-en-local)
  - [Requisitos previos](#requisitos-previos)
  - [Clona el repositorio](#clona-el-repositorio)
  - [Modo Desarrollo](#modo-desarrollo)
    - [1. Configurar variables de entorno](#1-configurar-variables-de-entorno)
    - [2. Iniciar infraestructura con Docker](#2-iniciar-infraestructura-con-docker)
    - [3. Instalar dependencias](#3-instalar-dependencias)
    - [4. Iniciar los microservicios](#4-iniciar-los-microservicios)
    - [5. Acceder a la aplicación](#5-acceder-a-la-aplicación)
  - [Modo Producción](#modo-producción)
    - [1. Configurar variables de entorno](#1-configurar-variables-de-entorno-1)
    - [2. Desplegar con Docker](#2-desplegar-con-docker)
    - [3. Verificar el despliegue](#3-verificar-el-despliegue)
    - [4. Detener el entorno](#4-detener-el-entorno)
- [Variables de Entorno](#variables-de-entorno)
- [Uso](#uso)
  - [Credenciales de prueba](#credenciales-de-prueba)
  - [Endpoints principales](#endpoints-principales)
- [Testing](#testing)
- [Stack Tecnológico](#stack-tecnológico)
  - [Tecnologías Principales](#tecnologías-principales)
  - [Librerías destacadas](#librerías-destacadas)
- [Créditos y Licencia](#créditos-y-licencia)
  - [Autores](#autores)
  - [Licencia](#licencia)

---

## Descripción

**SolidarianID** es una plataforma integral para la gestión de voluntariado y causas solidarias, desarrollada para la organización "Voluntarios Sin Fronteras". El sistema permite:

- **Identidad Digital Única**: Cada voluntario cuenta con un ID único y un historial de participación.
- **Gestión de Comunidades**: Creación y administración de grupos con intereses comunes.
- **Causas Solidarias**: Vinculadas a los Objetivos de Desarrollo Sostenible (ODS) de la ONU.
- **Acciones Benéficas**: Proyectos concretos con objetivos cuantificables.
- **Eventos**: Actividades presenciales para dar visibilidad a las causas.
- **Panel de Administración**: Interfaz web para la gestión y validación de solicitudes.

El proyecto sigue los principios de **Clean Architecture**, **Hexagonal Architecture** y **Domain-Driven Design (DDD)** y comunicación por eventos mediante **Apache Kafka**.

---

## Arquitectura

El sistema está compuesto por tres microservicios:

| Servicio        | Puerto | Base de Datos | Descripción                                  |
| --------------- | ------ | ------------- | -------------------------------------------- |
| **Admin**       | 3000   | MongoDB       | Panel de administración (MVC con Handlebars) |
| **Users**       | 3001   | PostgreSQL    | Gestión de usuarios y voluntarios            |
| **Communities** | 3002   | PostgreSQL    | Gestión de comunidades, causas y acciones    |

```
┌─────────────────────────────────────────────────────────────────┐
│                        SOLIDARIANID                             │
├─────────────────┬─────────────────┬─────────────────────────────┤
│   Admin App     │   Users App     │     Communities App         │
│   (Port 3000)   │   (Port 3001)   │     (Port 3002)             │
│   MongoDB       │   PostgreSQL    │     PostgreSQL              │
└────────┬────────┴────────┬────────┴────────────┬────────────────┘
         │                 │                     │
         └─────────────────┼─────────────────────┘
                           │
                    ┌──────▼──────┐
                    │    KAFKA    │
                    │  (Events)   │
                    └─────────────┘
```

---

## Despliegue en cloud

Para observar la aplicación ya desplegada en un entorno cloud, puedes acceder a través del siguiente enlace:

- **URL de la aplicación de administración**: [https://admin.solidarianid.com](https://admin.solidarianid.com)
- **URL de las APIs en Cloud**: [https://api.solidarianid.com](https://api.solidarianid.com)

## Despliegue en local

### Requisitos previos

- **Node.js** >= 20.x
- **npm** >= 10.x
- **Docker** y **Docker Compose**
- **Git**

> [!WARNING]
>
> **¡Importante!** Antes de iniciar la aplicación, se recomienda eliminar todos los volúmenes de Docker utilizados si es la segunda vez que se despliega el sistema en tu ordenador
>
> ```bash
> docker compose down -v
> docker volume prune -f
> ```

### Clona el repositorio

```bash
git clone https://github.com/solidarianid/solidarianid.git
cd solidarianid
```

---

### Modo Desarrollo

El modo desarrollo permite ejecutar los servicios con hot-reload para facilitar el desarrollo.

#### 1. Configurar variables de entorno

Crea el archivo `.env.development` en la carpeta `solidarian-id/`:

<details>
<summary>📄 Contenido de <code>.env.development</code></summary>

```env
# ======================================================
# ENVIRONMENT
# ======================================================
NODE_ENV=development
SESSION_SECRET=your_session_secret_key


# ======================================================
# APPLICATION PORTS
# ======================================================
ADMIN_PORT=3000
USERS_PORT=3001
COMMUNITIES_PORT=3002


# ======================================================
# BASE URLS
# ======================================================
API_BASE_ADMIN_URL=http://localhost:3000
API_BASE_USERS_URL=http://localhost:3001
API_BASE_COMMUNITIES_URL=http://localhost:3002

API_BASE_ADMIN_INTERNAL_URL=http://localhost:3000
API_BASE_USERS_INTERNAL_URL=http://localhost:3001
API_BASE_COMMUNITIES_INTERNAL_URL=http://localhost:3002


# ======================================================
# POSTGRESQL DATABASE
# ======================================================
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USER=solidarian_user
POSTGRES_PASSWORD=solidarian_dev_password

POSTGRES_DB=solidarian_id_db
USERS_DB=solidarianid
COMMUNITIES_DB=solidarianid


# ======================================================
# MONGODB DATABASE
# ======================================================
MONGO_HOST=localhost
MONGO_PORT=27017
MONGO_USER=solidarian_user
MONGO_PASSWORD=solidarian_password

MONGO_INITDB_ROOT_USERNAME=solidarian_user
MONGO_INITDB_ROOT_PASSWORD=solidarian_password
MONGO_INITDB_DATABASE=solidarianid

MONGO_DB=solidarianid
MONGODB_URI=mongodb://solidarian_user:solidarian_password@localhost:27017/solidarianid?authSource=admin


# ======================================================
# KAFKA (CLIENT CONFIG)
# ======================================================
KAFKA_BROKERS=localhost:9092
KAFKA_DOCKER_BROKERS=kafka:9093

KAFKA_ADMIN_CLIENT_ID=admin
KAFKA_ADMIN_CONSUMER_GROUP_ID=admin-consumer-group

KAFKA_USERS_CLIENT_ID=users
KAFKA_USERS_CONSUMER_GROUP_ID=users-consumer-group

KAFKA_COMMUNITIES_CLIENT_ID=communities
KAFKA_COMMUNITIES_CONSUMER_GROUP_ID=communities-consumer-group


# ======================================================
# KAFKA (BROKER / CONTROLLER CONFIG)
# ======================================================
KAFKA_NODE_ID=1
KAFKA_PROCESS_ROLES=broker,controller

KAFKA_LISTENERS=CONTROLLER://localhost:9091,HOST://0.0.0.0:9092,DOCKER://0.0.0.0:9093
KAFKA_ADVERTISED_LISTENERS=HOST://localhost:9092,DOCKER://kafka:9093

KAFKA_LISTENER_SECURITY_PROTOCOL_MAP=CONTROLLER:PLAINTEXT,HOST:PLAINTEXT,DOCKER:PLAINTEXT
KAFKA_CONTROLLER_LISTENER_NAMES=CONTROLLER
KAFKA_CONTROLLER_QUORUM_VOTERS=1@localhost:9091

KAFKA_INTER_BROKER_LISTENER_NAME=DOCKER
KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR=1


# ======================================================
# SEED / INITIAL DATA
# ======================================================
ADMIN_SERVICE_URL=http://localhost:3000
USERS_SERVICE_URL=http://localhost:3001/api
COMMUNITIES_SERVICE_URL=http://localhost:3002/api

ADMIN_EMAIL=manuel.perez@solidarianid.org
ADMIN_PASSWORD=Admin2024!Pass
```

</details>

#### 2. Iniciar infraestructura con Docker

```bash
cd solidarian-id
npm run docker:dev
```

Este comando levanta los contenedores de **MongoDB**, **PostgreSQL** y **Kafka**.

#### 3. Instalar dependencias

```bash
npm install
```

#### 4. Iniciar los microservicios

Abre **tres terminales** distintas y ejecuta cada servicio en modo desarrollo:

**Terminal 1 - Admin Service:**

```bash
npm run start:dev admin
```

**Terminal 2 - Users Service:**

```bash
npm run start:dev users
```

**Terminal 3 - Communities Service:**

```bash
npm run start:dev communities
```

#### 5. Acceder a la aplicación

| Servicio                | URL                                   |
| ----------------------- | ------------------------------------- |
| Panel de Administración | http://localhost:3000                 |
| API de Usuarios         | http://localhost:3001/api/users       |
| API de Comunidades      | http://localhost:3002/api/communities |

---

### Modo Producción

El modo producción despliega todos los servicios como contenedores Docker.

#### 1. Configurar variables de entorno

Crea el archivo `.env.production` en la carpeta `solidarian-id/`:

<details>
<summary>📄 Contenido de <code>.env.production</code></summary>

```env
# ======================================================
# ENVIRONMENT
# ======================================================
NODE_ENV=production
SESSION_SECRET=secret_key


# ======================================================
# APPLICATION PORTS
# ======================================================
ADMIN_PORT=3000
USERS_PORT=3001
COMMUNITIES_PORT=3002


# ======================================================
# BASE URLS
# ======================================================
API_BASE_ADMIN_URL=http://localhost:3000
API_BASE_USERS_URL=http://localhost:3001
API_BASE_COMMUNITIES_URL=http://localhost:3002

API_BASE_ADMIN_INTERNAL_URL=http://admin-app:3000/
API_BASE_USERS_INTERNAL_URL=http://users-app:3001/
API_BASE_COMMUNITIES_INTERNAL_URL=http://communities-app:3002/


# ======================================================
# POSTGRESQL DATABASE
# ======================================================
POSTGRES_HOST=postgres
POSTGRES_PORT=5432
POSTGRES_USER=postgres_user
POSTGRES_PASSWORD=postgres_password
POSTGRES_DB=solidarianid


# ======================================================
# MONGODB DATABASE
# ======================================================
MONGO_HOST=mongo
MONGO_PORT=27017
MONGO_USER=mongo_user
MONGO_PASSWORD=mongo_password
MONGO_DB=solidarianid

MONGODB_URI=mongodb://mongo_user:mongo_password@mongo:27017/solidarianid?authSource=admin


# ======================================================
# KAFKA (CLIENT CONFIG)
# ======================================================
KAFKA_PORT=9092
KAFKA_BROKERS=kafka:9093

KAFKA_ADMIN_CLIENT_ID=admin
KAFKA_ADMIN_CONSUMER_GROUP_ID=admin-consumer-group

KAFKA_USERS_CLIENT_ID=users
KAFKA_USERS_CONSUMER_GROUP_ID=users-consumer-group

KAFKA_COMMUNITIES_CLIENT_ID=communities
KAFKA_COMMUNITIES_CONSUMER_GROUP_ID=communities-consumer-group


# ======================================================
# KAFKA (BROKER / CONTROLLER CONFIG)
# ======================================================
KAFKA_NODE_ID=1
KAFKA_PROCESS_ROLES=broker,controller

KAFKA_LISTENERS=CONTROLLER://localhost:9091,HOST://0.0.0.0:9092,DOCKER://0.0.0.0:9093
KAFKA_ADVERTISED_LISTENERS=HOST://localhost:9092,DOCKER://kafka:9093

KAFKA_LISTENER_SECURITY_PROTOCOL_MAP=CONTROLLER:PLAINTEXT,HOST:PLAINTEXT,DOCKER:PLAINTEXT
KAFKA_CONTROLLER_LISTENER_NAMES=CONTROLLER
KAFKA_CONTROLLER_QUORUM_VOTERS=1@localhost:9091

KAFKA_INTER_BROKER_LISTENER_NAME=DOCKER
KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR=1
```

</details>

#### 2. Desplegar con Docker

> [!NOTE]
> Asegúrate de tener **Docker Desktop** activo o el servicio de Docker ejecutándose.

```bash
cd solidarian-id
npm run docker
```

Este comando construye y levanta todos los contenedores (aplicaciones + infraestructura).

#### 3. Verificar el despliegue

```bash
docker ps
```

Deberías ver los siguientes contenedores en ejecución:

- `solidarian_admin_app`
- `solidarian_users_app`
- `solidarian_communities_app`
- `mongo`
- `postgres`
- `kafka`

#### 4. Detener el entorno

```bash
npm run docker:down
```

---

## Variables de Entorno

| Variable           | Descripción                                                  |
| ------------------ | ------------------------------------------------------------ |
| `NODE_ENV`         | Entorno de ejecución (`development` / `production` / `test`) |
| `SESSION_SECRET`   | Clave secreta para las sesiones HTTP                         |
| `ADMIN_PORT`       | Puerto del servicio de administración                        |
| `USERS_PORT`       | Puerto del servicio de usuarios                              |
| `COMMUNITIES_PORT` | Puerto del servicio de comunidades                           |
| `POSTGRES_*`       | Configuración de PostgreSQL                                  |
| `MONGO_*`          | Configuración de MongoDB                                     |
| `KAFKA_*`          | Configuración de Apache Kafka                                |

---

## Uso

### Credenciales de prueba

Una vez inicializado el sistema, puedes acceder con las siguientes credenciales de administrador:

| Email                               | Contraseña       |
| ----------------------------------- | ---------------- |
| `manuel.perez@solidarianid.org`     | `Admin2024!Pass` |
| `sergio.garcia@solidarianid.org`    | `Admin2024!Pass` |
| `fabian.rodriguez@solidarianid.org` | `Admin2024!Pass` |

### Endpoints principales

- **Panel Admin**: `http://localhost:3000/login`
- **API Users**: `http://localhost:3001/api`
- **API Communities**: `http://localhost:3002/api`
- **Swagger Documentation**: `http://localhost:300X/api/docs` (cuando esté habilitado)

---

## Testing

El proyecto incluye una estrategia de testing completa:

```bash
# Tests unitarios
npm run test

# Tests unitarios por servicio
npm run test:admin
npm run test:users
npm run test:communities

# Tests E2E
npm run test:e2e

# Tests de integración
npm run test:integration

# Tests de mutación (Stryker)
npm run test:mutation

# Cobertura completa
npm run test:all:coverage
```

---

## Stack Tecnológico

### Tecnologías Principales

| Tecnología       | Versión | Descripción                                            |
| ---------------- | ------- | ------------------------------------------------------ |
| **NestJS**       | 11.0    | Framework backend modular para Node.js                 |
| **TypeScript**   | 5.9     | Lenguaje de programación tipado                        |
| **MongoDB**      | 9.0     | Base de datos NoSQL para documentos flexibles          |
| **PostgreSQL**   | 16      | Base de datos relacional para datos transaccionales    |
| **Apache Kafka** | Latest  | Broker de mensajería para eventos entre microservicios |
| **Docker**       | Latest  | Contenedorización de servicios                         |
| **Handlebars**   | 8.0     | Motor de plantillas para el panel admin                |
| **TailwindCSS**  | 4.1     | Framework CSS utility-first                            |
| **Jest**         | 30.0    | Framework de testing                                   |
| **Cypress**      | 15.8    | Testing E2E                                            |

### Librerías destacadas

- **class-validator** / **class-transformer**: Validación de DTOs
- **Mongoose**: ODM para MongoDB
- **TypeORM**: ORM para PostgreSQL
- **KafkaJS**: Cliente de Kafka para Node.js
- **bcrypt**: Hashing de contraseñas
- **express-session**: Gestión de sesiones HTTP
- **Chart.js**: Visualización de métricas
- **PDFKit**: Generación de informes PDF

---

## Créditos y Licencia

**SolidarianID** ha sido desarrollado como parte de un Trabajo conjunto entre varias asignaturas en el contexto del Máster de Ingeniería del Software de la Universidad de Murcia.

### Autores

- **Fabián Sola**
- **Sergio Ros**
- **Pablo Peris**
- **Manuel Bernabé**
- **Antonio Pérez**

### Licencia

Este proyecto está bajo la licencia especificada en el archivo [LICENSE](./LICENSE).

---

<p align="center">
  <strong>🌍 Voluntarios Sin Fronteras - SolidarianID Grupo 3© 2025</strong>
</p>
