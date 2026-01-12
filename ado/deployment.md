# Guía de Despliegue - SolidarianID

Esta guía describe el procedimiento para desplegar el ecosistema completo de SolidarianID en un entorno de preproducción utilizando Docker Compose. El sistema está compuesto por tres aplicaciones principales (admin, users y communities), junto con sus servicios de infraestructura necesarios (PostgreSQL, MongoDB y Apache Kafka).

## Arquitectura del Sistema

El entorno de despliegue incluye los siguientes servicios:

- **admin-app**: Aplicación de administración (puerto 3000)
- **users-app**: Servicio de gestión de usuarios (puerto 3001)
- **communities-app**: Servicio de gestión de comunidades y causas solidarias (puerto 3002)
- **postgres**: Base de datos relacional para datos transaccionales de los microservicios (puerto 5432)
- **mongo**: Base de datos documental para la app de administración (puerto 27017)
- **kafka**: Como sistema de mensajería para comunicación entre microservicios (puerto 9092)
- **kafka-ui**: Interfaz web para monitorización de Kafka (puerto 8089)

## Requisitos Previos

Antes de comenzar, asegúrate de tener instalado en tu sistema:

- Docker Engine (versión 20.10 o superior)
- Docker Compose (versión 2.0 o superior)

## Procedimiento de Despliegue

### 1. Configuración de Variables de Entorno

El primer paso consiste en crear el archivo de configuración `.env.production` a partir de la plantilla `ado/.env.example` dentro del directorio `solidarian-id`:

```bash
cp ado/.env.example solidarian-id/.env.production
```

### 2. Iniciar los Servicios

Una vez configurado el archivo `.env.production`, accede a la carpeta `solidarian-id` y levanta todos los servicios con el siguiente comando:

```bash
cd solidarian-id
npm run docker
```

Este script ejecuta internamente el comando `docker compose up -d --build` usando la configuración y los archivos de la carpeta `solidarian-id`.

### 3. Verificar el Estado de los Servicios

Para comprobar que todos los contenedores están funcionando correctamente:

```bash
docker ps
```

Deberías ver todos los servicios con estado `Up` y los servicios críticos (postgres, mongo, kafka) marcados como `healthy`.

### 4. Consultar los Logs

Si necesitas revisar los logs de algún servicio específico:

```bash
docker compose logs <container>
```

Para seguir los logs en tiempo real:

```bash
docker compose logs -f <container>
```

### 5. Detener los Servicios

Para detener y eliminar los contenedores (los datos en volúmenes persistentes se conservan), ejecuta dentro de la carpeta `solidarian-id`:

```bash
cd solidarian-id
npm run docker:down
```

Este script ejecuta internamente el comando `docker compose down` usando la configuración de la carpeta `solidarian-id`.

Si deseas eliminar completamente el sistema incluyendo volúmenes de datos y asegurarte de que no quede ningún dato persistente:

```bash
cd solidarian-id
npm run docker:down
rm -rf data
```

Esto detiene y elimina los contenedores, volúmenes y borra manualmente la carpeta `data` ubicada dentro de `solidarian-id`, asegurando que no quede ningún dato de las bases de datos en el sistema.

**Reiniciar los datos de los contenedores**

Si quieres reiniciar los datos de los contenedores e inicializarlos de nuevo (por ejemplo, para empezar desde cero), elimina la carpeta `data` que se encuentra dentro de `solidarian-id` antes de volver a levantar los servicios:

```bash
cd solidarian-id
rm -rf data
```

Luego, inicia los servicios normalmente siguiendo los pasos anteriores.

## Acceso a las Aplicaciones

Una vez desplegado el sistema, puedes acceder a:

- **Aplicación de Administración**: http://localhost:3000
- **API de Usuarios**: http://localhost:3001/api/users
- **API de Comunidades**: http://localhost:3002/api/communities
- **Kafka UI**: http://localhost:8089

## Ejecución de Scripts de Consultas de Base de Datos

Para facilitar la corrección y el análisis de las consultas, se proporcionan scripts en la carpeta `ado` que ejecutan las consultas reales más importantes utilizadas por las aplicaciones.

### Consultas MongoDB (Aplicación Admin)

El script `mongodb-queries.js` contiene todas las consultas ejecutadas por la aplicación de administración:

```bash
# Copiar el script al contenedor de MongoDB
docker cp ../ado/mongodb-queries.js solidarian_mongo_db:/tmp/

# Ejecutar el script dentro del contenedor con mongosh
docker exec solidarian_mongo_db mongosh /tmp/mongodb-queries.js
```

Este script ejecuta **15 consultas** que incluyen:

- Métricas del dashboard (causas por ODS, usuarios por país, totales)
- Solicitudes pendientes de comunidades, causas y acciones
- Reportes de usuarios con paginación
- Consultas de autenticación de administradores

Dentro del script está detallada cada consulta y su caso de uso.

**Nota:** Puedes modificar los parámetros de ejemplo al inicio del script (`PARAMS` object) para ajustarlos y probar resultados distintos.

### Consultas PostgreSQL (Aplicaciones Communities y Users)

El script `postgres-queries.sql` contiene todas las consultas ejecutadas por las aplicaciones Communities y Users en PostgreSQL:

```bash
# Copiar el script al contenedor de PostgreSQL
docker cp ../ado/postgres-queries.sql solidarian_postgres_db:/tmp/

# Ejecutar el script dentro del contenedor
docker exec solidarian_postgres_db psql -U ado_user -d solidarianid -f /tmp/postgres-queries.sql
```

Este script ejecuta **13 consultas** que incluyen:

- Listados de comunidades con miembros y causas
- Ranking de comunidades por número de usuarios
- Búsquedas de causas y acciones benéficas
- Análisis temporal de usuarios unidos por mes
- Validaciones de unicidad para autenticación

**Nota:** Puedes modificar los parámetros al inicio del script (sección `PARÁMETROS DE EJEMPLO`) usando comandos `\set` para ajustarlos y probar resultados distintos.

### Análisis de Consultas

Si necesitas revisar la documentación detallada de cada consulta, sus repositorios asociados y casos de uso:

- **MongoDB**: `mongodb-queries-analysis.md`
- **PostgreSQL**: `postgres-queries-analysis.md`

Estos documentos incluyen información sobre:

- Métodos de repositorio que ejecutan cada consulta
- Servicios y controladores que las invocan
- Endpoints de API relacionados
- Casos de uso de negocio
- Patrones arquitectónicos aplicados (CQRS, DDD, etc.)
