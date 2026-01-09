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
cp production.env.example .env
```

Una vez copiado el archivo, es fundamental revisar y modificar las siguientes variables críticas de seguridad:

- `SESSION_SECRET`: Clave secreta para las sesiones de usuario
- `POSTGRES_PASSWORD`: Contraseña de la base de datos PostgreSQL
- `MONGO_USER` y `MONGO_PASSWORD`: Credenciales de MongoDB

**Importante**: Para un entorno de preproducción, se recomienda cambiar las contraseñas de ejemplo por valores personalizados.

### 2. Iniciar los Servicios

Una vez configurado el archivo `.env`, puedes levantar todos los servicios con un único comando:

```bash
docker compose up -d
```

El flag `-d` (detached mode) ejecuta los contenedores en segundo plano, permitiendo que continúes trabajando en la terminal.

### 3. Verificar el Estado de los Servicios

Para comprobar que todos los contenedores están funcionando correctamente:

```bash
docker compose ps
```

Deberías ver todos los servicios con estado `Up` y los servicios críticos (postgres, mongo, kafka) marcados como `healthy`.

### 4. Consultar los Logs

Si necesitas revisar los logs de algún servicio específico:

```bash
docker compose logs admin-app --tail=50
docker compose logs user-app --tail=50
docker compose logs community-app --tail=50
```

Para seguir los logs en tiempo real:

```bash
docker compose logs -f admin-app
```

## Datos de Ejemplo

El sistema incluye scripts de inicialización que poblan automáticamente la base de datos MongoDB con datos de ejemplo al arrancar por primera vez. Estos scripts se encuentran en el directorio `scripts/mongodb/`.

### Script: init-mongo.js

Este script crea 5 usuarios administradores iniciales con los siguientes datos:

| Nombre                  | Email                             | Contraseña     |
| ----------------------- | --------------------------------- | -------------- |
| Sergio García Martínez  | sergio.garcia@solidarianid.org    | Admin2024!Pass |
| Fabián Rodríguez López  | fabian.rodriguez@solidarianid.org | Admin2024!Pass |
| Pablo Fernández Sánchez | pablo.fernandez@solidarianid.org  | Admin2024!Pass |
| Antonio Martín González | antonio.martin@solidarianid.org   | Admin2024!Pass |
| Manuel Pérez Ruiz       | manuel.perez@solidarianid.org     | Admin2024!Pass |

Las contraseñas están hasheadas utilizando bcrypt con 10 rondas de salt, cumpliendo con los requisitos de seguridad (mínimo 12 caracteres, mayúsculas, números y caracteres especiales).

### Script: init-mongo-users.js

Este script crea usuarios de prueba con diferentes perfiles y afiliaciones a comunidades. Los usuarios incluyen:

- Usuarios de diferentes países (España, México, Argentina, Colombia)
- Diversos roles dentro de las comunidades (administradores y miembros)
- Diferentes patrones de participación en múltiples comunidades

Estos datos son útiles para:

- Realizar pruebas de funcionalidad
- Validar la visualización de métricas y estadísticas
- Ejecutar casos de prueba de integración
- Demostrar las capacidades del sistema

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

**Advertencia**: El último comando eliminará permanentemente todos los datos almacenados.

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

### Error de conexión a la base de datos

Asegúrate de que las variables de entorno `POSTGRES_HOST` y `MONGO_HOST` apunten a los nombres de los servicios Docker (`postgres` y `mongo`) y no a `localhost`.

### Problemas con Kafka

Kafka puede tardar algunos segundos en inicializarse completamente. Si ves errores relacionados con el coordinador de grupo, espera unos momentos y verifica que el healthcheck esté en estado `healthy`:

```bash
docker compose ps kafka
```

## Siguientes Pasos

Tras el despliegue exitoso, puedes:

1. Acceder a la aplicación de administración con las credenciales proporcionadas
2. Explorar los datos de ejemplo en Kafka UI
3. Ejecutar las pruebas de integración incluidas en el directorio `ccps/requests/`
4. Revisar la documentación de la API en los archivos Swagger (`users-swagger.yaml` y `communities-swagger.yaml`)
