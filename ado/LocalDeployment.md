# Guía de Despliegue - SolidarianID

Esta guía describe el procedimiento para desplegar el ecosistema completo de SolidarianID en un entorno de preproducción utilizando Docker Compose. El sistema está compuesto por tres aplicaciones principales (admin, users y communities), junto con sus servicios de infraestructura necesarios (PostgreSQL, MongoDB y Apache Kafka).

## Arquitectura del Sistema

El entorno de despliegue incluye los siguientes servicios:

- **admin-app**: Aplicación de administración (puerto 3000)
- **user-app**: Servicio de gestión de usuarios (puerto 3001)
- **community-app**: Servicio de gestión de comunidades y causas solidarias (puerto 3002)
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

El primer paso consiste en crear el archivo de configuración `.env` a partir de la plantilla de este directorio:

```bash
cd deployment
cp ado/ado.env.example .env
```

### 2. Iniciar los Servicios

Una vez configurado el archivo `.env`, puedes levantar todos los servicios con un único comando:

```bash
docker compose up -d --force-recreate --build
```

El flag `-d` (detached mode) ejecuta los contenedores en segundo plano, permitiendo que continúes trabajando en la terminal.
El flag `--force-recreate` obliga a recrear los contenedores, eliminando los existentes incluso si no han cambiado (si existen).
El flag `--build` obliga a construir las imagenes nuevamente.

### 3. Verificar el Estado de los Servicios

Para comprobar que todos los contenedores están funcionando correctamente:

```bash
docker compose ps
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

## Detener los Servicios

Para detener todos los servicios sin eliminar los datos:

```bash
docker compose stop
```

Para detener y eliminar los contenedores (los datos en volúmenes persistentes se conservan):

```bash
docker compose down
```

Para eliminar completamente el sistema incluyendo volúmenes de datos:

```bash
docker compose down -v
```

## Acceso a las Aplicaciones

Una vez desplegado el sistema, puedes acceder a:

- **Aplicación de Administración**: http://localhost:3000
- **API de Usuarios**: http://localhost:3001/api/users
- **API de Comunidades**: http://localhost:3002/api/communities
- **Kafka UI**: http://localhost:8089

## Resolución de Problemas

### Los contenedores no arrancan

Verifica que los puertos no estén siendo utilizados por otros servicios:

```bash
netstat -tulpn | grep -E '3000|3001|3002|5432|27017|9092'
```

### Problemas con Kafka

Kafka puede tardar algunos segundos en inicializarse completamente. Si ves errores relacionados con el coordinador de grupo, espera unos momentos y verifica que el healthcheck esté en estado `healthy`:

```bash
docker compose ps kafka
```

## Ejecución de Scripts de Consultas de Base de Datos

Para facilitar la correción y el análisis de las consultas, se proporcionan 2 scripts que ejecutan las consultas reales más importantes utilizadas por las aplicaciones.

### Consultas MongoDB (Aplicación Admin)

El script `admin-mongodb-queries.js` contiene todas las consultas ejecutadas por la aplicación de administración:

```bash
# Desde la raíz del proyecto
cd ado

# Copiar el script al contenedor de MongoDB
docker cp admin-mongodb-queries.js mongo:/tmp/

# Ejecutar el script dentro del contenedor con mongosh
docker exec mongo mongosh /tmp/admin-mongodb-queries.js
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
# Desde la raíz del proyecto
cd ado

# Copiar el script al contenedor de PostgreSQL
docker cp postgres-queries.sql solidarian_postgres_db:/tmp/

# Ejecutar el script dentro del contenedor
docker exec solidarian_postgres_db psql -U <.env/POSTGRES_USER> -d <.env/POSTGRES_DB> -f /tmp/postgres-queries.sql
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
