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

El primer paso consiste en crear el archivo de configuración `.env` a partir de la plantilla de producción:

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
