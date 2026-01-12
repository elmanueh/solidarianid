# Análisis de Consultas PostgreSQL - Communities & Users Apps

**IMPORTANTE**: Se observará un cambio de nomenclatura en las tablas deL microservicio de usuarios (uso de prefijo tbl\_ y PascalCase como MobilePhone vs mobilePhone). Esto es intencional y responde a la separación de Bounded Contexts (Contextos Delimitados) del DDD. Aunque no sea la convención en PostgreSQL y JS/TS, sino más bien en SQLServer/C#, se ha hecho así para poder dividir claramente el contexto de una y otra base de datos, ya que a nivel de deployment son la misma por simplicidad de arquitectura.

## **1. COMMUNITIES - Listado y Detalle (3 consultas)**

### 1.1 Listar todas las comunidades con miembros

#### Caso de Uso

Mostrar el listado público de todas las comunidades registradas en la plataforma, incluyendo información de sus miembros y los datos básicos de cada usuario miembro.

#### Flujo de Ejecución

Controller `GET /api/communities` → `CommunitiesServiceImpl.getCommunities()` → `CommunitiesRepositoryTypeOrmAdapter.findAll(['members', 'members.user'])`

#### Query Generada por TypeORM

```sql
SELECT
  c.id AS community_id,
  c.name AS community_name,
  c.description AS community_description,
  c."createdAt" AS created_at,
  c."updatedAt" AS updated_at,
  cm."communityId" AS member_community_id,
  cm."userId" AS member_user_id,
  cm.role AS member_role,
  cm."joinedAt" AS member_joined_at,
  u.id AS user_id,
  u."fullName" AS user_fullname,
  u."mobilePhone" AS user_mobile,
  u.email AS user_email
FROM community c
LEFT JOIN community_user cm ON cm."communityId" = c.id
LEFT JOIN "user" u ON u.id = cm."userId"
ORDER BY c.id, cm."userId";
```

#### Código del Repositorio

```typescript
// communities-typeorm.repository.ts
async findAll(relations?: string[]): Promise<Either<RepositoryException, Community[]>> {
  try {
    const communities = await this.communityRepository.find({
      relations: relations || [],
    });

    const communitiesOrErrors = communities.map(entity =>
      this.communityMapper.fromPersistence(entity)
    );

    const result = sequence(communitiesOrErrors);
    if (result.isLeft()) {
      return left(new RepositoryException('Failed to map communities', result.value));
    }

    return right(result.value);
  } catch (error) {
    return left(new RepositoryException('Failed to find communities', error));
  }
}
```

#### Análisis de Conversión del ORM (TypeORM Query Builder)

1. **`find({ relations: ['members', 'members.user'] })`**: TypeORM interpreta el array de relaciones y genera automáticamente los LEFT JOINs necesarios. La notación punto (`members.user`) indica una relación anidada (miembros → usuario).

2. **Generación de JOINs**: TypeORM genera aliases automáticos para cada tabla:

   - `community` → tabla principal
   - `community_user` → primera relación (members)
   - `user` → relación anidada (members.user)

3. **LEFT JOIN vs INNER JOIN**: Usa LEFT JOIN porque las relaciones son opcionales. Una comunidad puede existir sin miembros. Si usara INNER JOIN, solo retornaría comunidades con al menos un miembro.

4. **Eager Loading**: Trae TODOS los miembros y sus datos de usuario en una sola query. Con 100 comunidades y promedio de 10 miembros cada una, retorna 1000+ filas que TypeORM agrupa en memoria por `community.id`.

5. **Mapper Pattern**: `communityMapper.fromPersistence()` convierte las entidades TypeORM (con decoradores `@Entity`, `@OneToMany`) a objetos de dominio puros.

#### Qué Busca Esta Consulta

Busca **todas las comunidades** con sus miembros asociados y los datos completos de cada usuario miembro. El resultado incluye comunidades sin miembros (gracias al LEFT JOIN).

Vista: `GET /api/communities` → Listado público de comunidades

---

### 1.2 Obtener comunidad por ID con causas y miembros

#### Caso de Uso

Mostrar el detalle completo de una comunidad específica, incluyendo todas sus causas benéficas asociadas y sus miembros con información de usuario.

#### Flujo de Ejecución

Controller `GET /api/communities/:id` → `CommunitiesServiceImpl.getCommunityById(id)` → `CommunitiesRepositoryTypeOrmAdapter.findById(id, ['causes', 'members', 'members.user'])`

#### Query Generada por TypeORM

```sql
SELECT
  c.id AS community_id,
  c.name AS community_name,
  c.description AS community_description,
  c."createdAt" AS created_at,
  c."updatedAt" AS updated_at,
  ca.id AS cause_id,
  ca.name AS cause_name,
  ca.description AS cause_description,
  ca."initialDate" AS cause_initial_date,
  ca."durationDays" AS cause_duration_days,
  ca.ods AS cause_ods,
  cm."userId" AS member_user_id,
  cm.role AS member_role,
  cm."joinedAt" AS member_joined_at,
  u.id AS user_id,
  u."fullName" AS user_fullname
FROM community c
LEFT JOIN cause ca ON ca."communityId" = c.id
LEFT JOIN community_user cm ON cm."communityId" = c.id
LEFT JOIN "user" u ON u.id = cm."userId"
WHERE c.id = :community_id;
```

#### Código del Repositorio

```typescript
// communities-typeorm.repository.ts
async findById(
  id: string,
  relations?: string[]
): Promise<Either<RepositoryException, Community>> {
  try {
    const community = await this.communityRepository.findOne({
      where: { id },
      relations: relations || [],
    });

    if (!community) {
      return left(new EntityNotFoundException(`Community with id ${id} not found`, id));
    }

    return this.communityMapper.fromPersistence(community);
  } catch (error) {
    return left(new RepositoryException('Failed to find community', error));
  }
}
```

#### Análisis de Conversión del ORM (TypeORM FindOptions)

1. **`findOne({ where: { id }, relations: [...] })`**: Combina filtro WHERE con carga de relaciones. TypeORM ejecuta una query si hay relaciones, dos si hay relaciones complejas con múltiples niveles.

2. **Triple LEFT JOIN**: TypeORM genera 3 LEFT JOINs:

   - `cause` → obtiene todas las causas de la comunidad
   - `community_user` → obtiene todos los miembros
   - `user` → obtiene datos completos de cada miembro

3. **Multiplicación Cartesiana**: Si una comunidad tiene 5 causas y 10 miembros, la query retorna 50 filas (5 × 10). TypeORM las agrupa en memoria por `community.id` para reconstruir el objeto con arrays anidados.

4. **LIMIT 1 implícito**: Aunque no aparece en la query generada, TypeORM sabe que `findOne()` debe retornar un solo objeto, así que agrupa todas las filas por el ID de la comunidad.

5. **Not Found Handling**: Si no encuentra la comunidad, retorna `EntityNotFoundException` en lugar de `null`, siguiendo el patrón Either para manejo funcional de errores.

#### Qué Busca Esta Consulta

Busca **una comunidad específica por su ID** con toda la información relacionada: causas benéficas asociadas y miembros con sus datos de usuario.

Vista: `GET /api/communities/:id` → Página de detalle de comunidad

---

### 1.3 Ranking de comunidades por número de usuarios

#### Caso de Uso

Mostrar un ranking de las comunidades más populares ordenadas por número de miembros. Se usa en dashboards para identificar las comunidades con mayor participación.

#### Flujo de Ejecución

Controller `GET /api/communities/ranking/most-users` → `CommunitiesServiceImpl.getOrderByMostUsers()` → `CommunitiesQueryTypeOrmRepositoryAdapter.findOrderByMostUsers(limit)`

#### Query Generada por TypeORM

```sql
SELECT
  c.id AS "communityId",
  c.name AS "communityName",
  COUNT(cm."userId")::int AS "userCount"
FROM community c
INNER JOIN community_user cm ON cm."communityId" = c.id
GROUP BY c.id
ORDER BY COUNT(cm."userId")::int DESC
LIMIT :ranking_limit;
```

#### Código del Repositorio

```typescript
// communities-query-typeorm.repository.ts
async findOrderByMostUsers(limit: number = 10): Promise<Either<RepositoryException, CommunityUserCount[]>> {
  try {
    const query = this.communityRepository
      .createQueryBuilder('c')
      .innerJoin('c.members', 'cm')
      .select('c.id', 'communityId')
      .addSelect('c.name', 'communityName')
      .addSelect('COUNT(cm.userId)', 'userCount')
      .groupBy('c.id')
      .orderBy('COUNT(cm.userId)', 'DESC')
      .limit(limit);

    const result = await query.getRawMany();

    return right(result.map(row => ({
      communityId: row.communityId,
      communityName: row.communityName,
      userCount: parseInt(row.userCount)
    })));
  } catch (error) {
    return left(new RepositoryException('Failed to get communities ranking', error));
  }
}
```

#### Análisis de Conversión del ORM (TypeORM QueryBuilder)

1. **`createQueryBuilder('c')`**: Crea un constructor de queries SQL con alias `c` para la entidad Community. A diferencia de `.find()`, permite SQL avanzado (agregaciones, subconsultas, funciones).

2. **`.innerJoin('c.members', 'cm')`**: Genera INNER JOIN porque solo queremos comunidades con al menos un miembro. Si usara `.leftJoin()`, incluiría comunidades vacías con count=0.

3. **`.select()` y `.addSelect()`**: Especifica columnas explícitas. `select()` reemplaza la selección, `addSelect()` añade más columnas.

4. **`COUNT(cm.userId)`**: Función de agregación PostgreSQL. TypeORM no la interpreta, la pasa directamente al SQL. El `::int` es un cast explícito de PostgreSQL para garantizar tipo integer.

5. **`.groupBy('c.id')`**: Agrupa por ID de comunidad. Sin esto, COUNT contaría todas las filas. El GROUP BY es obligatorio cuando usas funciones de agregación.

6. **`.orderBy('COUNT(cm.userId)', 'DESC')`**: Ordena por el conteo de mayor a menor. Las comunidades con más miembros aparecen primero.

7. **`.getRawMany()`**: Retorna objetos planos (POJOs) en lugar de entidades TypeORM. Usado para queries con agregaciones donde no necesitas las instancias completas de la entidad.

#### Qué Busca Esta Consulta

Busca **un ranking de comunidades** ordenadas por número de miembros, limitado a las top N (típicamente 10). Solo incluye comunidades con al menos un miembro (INNER JOIN).

Vista: `GET /api/communities/ranking/most-users` → Dashboard de métricas

---

## **2. CAUSES - Listado y Búsqueda (4 consultas)**

### 2.1 Listar todas las causas

```sql
SELECT "CauseEntity"."id" AS "CauseEntity_id",
       "CauseEntity"."name" AS "CauseEntity_name",
       "CauseEntity"."description" AS "CauseEntity_description",
       "CauseEntity"."initialDate" AS "CauseEntity_initialDate",
       "CauseEntity"."durationDays" AS "CauseEntity_durationDays",
       "CauseEntity"."ods" AS "CauseEntity_ods",
       "CauseEntity"."communityId" AS "CauseEntity_communityId"
FROM "cause" "CauseEntity"
```

**Repositorio:** `CausesRepositoryTypeOrmAdapter`  
**Servicio:** `CausesService`  
**Endpoint:** `GET /communities/:communityId/causes`

#### Caso de Uso

Proporcionar una lista completa de todas las causas solidarias disponibles en el sistema para mostrar en interfaces de administración o listados generales. Esta consulta base no incluye relaciones (sin actions) y es útil para vistas que solo necesitan datos básicos de las causas.

#### Flujo de Ejecución

1. **Controller** (`CausesController`) → Recibe petición GET sin parámetros de relaciones
2. **Service** (`CausesService.findAll()`) → Procesa lógica de negocio
3. **Repository** (`CausesRepositoryTypeOrmAdapter.findAll()`) → Hereda método `findAll()` de clase base `RepositoryTypeORM`
4. **TypeORM** → Genera SELECT simple sin JOINs
5. **PostgreSQL** → Ejecuta consulta en tabla `causes`

#### Query Generada por TypeORM

```sql
SELECT "CauseEntity"."id" AS "CauseEntity_id",
       "CauseEntity"."name" AS "CauseEntity_name",
       "CauseEntity"."description" AS "CauseEntity_description",
       "CauseEntity"."communityId" AS "CauseEntity_communityId",
       "CauseEntity"."status" AS "CauseEntity_status"
FROM "causes" "CauseEntity";
```

#### Código del Repositorio

```typescript
// Método heredado de RepositoryTypeORM<Cause, CauseEntity>
// En CausesRepositoryTypeOrmAdapter
async findAll(): Promise<Either<ValidationError | RepositoryException, Cause[]>> {
  // Heredado de clase base RepositoryTypeORM
  return super.findAll();
}

// Implementación en clase base RepositoryTypeORM:
async findAll(): Promise<Either<ValidationError | RepositoryException, Entity[]>> {
  const entities = await this.repository.find(); // Sin parámetros = sin relaciones
  const domainEntities = sequence(entities.map(e => this.mapper.fromPersistence(e)));
  return domainEntities.isLeft() ? left(domainEntities.value) : right(domainEntities.value);
}
```

#### Análisis de Conversión del ORM

- **`repository.find()`**: Método sin argumentos que genera un SELECT básico de todos los registros
- **Sin parámetros `relations`**: TypeORM no genera ningún JOIN, solo consulta la tabla principal
- **Mapeo automático**: TypeORM convierte automáticamente nombres de columnas snake_case (`community_id`) a propiedades camelCase (`communityId`) del Entity
- **Carga completa**: Sin paginación ni límites, carga todos los registros en memoria
- **Transformación a dominio**: Cada `CauseEntity` (persistencia) se convierte en objeto `Cause` (dominio) mediante `CauseEntityMapper`

#### Qué Busca Esta Consulta

Recupera todas las filas de la tabla `causes` con sus columnas básicas:

- `id`: Identificador UUID de la causa
- `name`: Nombre de la causa
- `description`: Descripción detallada
- `communityId`: Foreign key a la comunidad propietaria
- `status`: Estado de la causa (PENDING, APPROVED, REJECTED)

**Ejemplo de resultado:**

```json
[
  {
    "id": "cause-uuid-1",
    "name": "Reforestación Amazonia",
    "description": "Plantar 10000 árboles",
    "communityId": "community-uuid-1",
    "status": "APPROVED"
  },
  {
    "id": "cause-uuid-2",
    "name": "Educación Rural",
    "description": "Construir escuelas",
    "communityId": "community-uuid-2",
    "status": "PENDING"
  }
]
```

### 2.2 Causas por ID de comunidad

```sql
SELECT "CauseEntity"."id" AS "CauseEntity_id",
       "CauseEntity"."name" AS "CauseEntity_name",
       "CauseEntity"."description" AS "CauseEntity_description",
       "CauseEntity"."initialDate" AS "CauseEntity_initialDate",
       "CauseEntity"."durationDays" AS "CauseEntity_durationDays",
       "CauseEntity"."ods" AS "CauseEntity_ods",
       "CauseEntity"."communityId" AS "CauseEntity_communityId"
FROM "cause" "CauseEntity"
WHERE (("CauseEntity"."communityId" = $1))
```

**Repositorio:** `CausesRepositoryTypeOrmAdapter`  
**Servicio:** `CausesService`  
**Endpoint:** `GET /communities/:communityId/causes`

#### Caso de Uso

Obtener todas las causas solidarias asociadas a una comunidad específica. Se utiliza cuando un usuario navega a una comunidad y quiere ver solo las causas de esa comunidad, sin cargar las acciones relacionadas (modo ligero).

#### Flujo de Ejecución

1. **Controller** (`CausesController`) → Recibe `communityId` como path param
2. **Service** (`CausesService.findAllByCommunityId(communityId, false)`) → Procesa con `actions = false`
3. **Repository** (`CausesRepositoryTypeOrmAdapter.findAllByCommunityId()`) → Método custom del repositorio
4. **TypeORM** → Genera SELECT con cláusula WHERE
5. **PostgreSQL** → Ejecuta query filtrada por FK

#### Query Generada por TypeORM

```sql
SELECT "CauseEntity"."id" AS "CauseEntity_id",
       "CauseEntity"."name" AS "CauseEntity_name",
       "CauseEntity"."description" AS "CauseEntity_description",
       "CauseEntity"."communityId" AS "CauseEntity_communityId",
       "CauseEntity"."status" AS "CauseEntity_status"
FROM "causes" "CauseEntity"
WHERE "CauseEntity"."communityId" = $1;
```

**Parámetro:** `$1 = communityId` (ej: "community-uuid-123")

#### Código del Repositorio

```typescript
async findAllByCommunityId(
  communityId: string,
  actions: boolean = false,
): Promise<Either<ValidationError | RepositoryException, Cause[]>> {
  const causeEntities = await this.causeRepository.find({
    where: { communityId },
    relations: actions ? ['actions'] : [],
  });

  const causes = sequence(causeEntities.map(entity => this.causeMapper.fromPersistence(entity)));

  if (causes.isLeft()) {
    return left(causes.value);
  }

  return right(causes.value);
}
```

#### Análisis de Conversión del ORM

- **`where: { communityId }`**: TypeORM genera cláusula WHERE con parámetro preparado (`$1`)
- **Parámetros seguros**: Uso de prepared statements previene SQL injection
- **`relations: []`**: Array vacío indica que no se cargan relaciones, sin JOINs
- **Parámetro booleano `actions`**: Controla si se incluyen acciones o no, en este caso `false`
- **Conversión FK**: La propiedad `communityId` del Entity se mapea directamente a la columna `communityId` de la tabla
- **Función `sequence`**: Convierte array de `Either` en `Either` de array, permitiendo procesar múltiples mapeos de forma funcional

#### Qué Busca Esta Consulta

Busca causas donde `communityId` coincide con el parámetro proporcionado:

- Filtra por Foreign Key a la tabla `communities`
- Retorna solo causas pertenecientes a una comunidad específica
- No incluye datos de acciones asociadas

### 2.3 Causa específica por ID (con acciones)

```sql
-- Query 1: Obtener ID distinto
SELECT DISTINCT "distinctAlias"."CauseEntity_id" AS "ids_CauseEntity_id"
FROM (
  SELECT "CauseEntity"."id" AS "CauseEntity_id",
         "CauseEntity"."name" AS "CauseEntity_name",
         "CauseEntity__CauseEntity_actions"."id" AS "CauseEntity__CauseEntity_actions_id"
  FROM "cause" "CauseEntity"
  LEFT JOIN "action" "CauseEntity__CauseEntity_actions"
    ON "CauseEntity__CauseEntity_actions"."causeId"="CauseEntity"."id"
  WHERE (("CauseEntity"."id" = $1))
) "distinctAlias"
ORDER BY "CauseEntity_id" ASC
LIMIT 1
```

**Repositorio:** `CausesRepositoryTypeOrmAdapter`  
**Servicio:** `CausesService`  
**Endpoint:** `GET /communities/:communityId/causes/:causeId`

#### Caso de Uso

Recuperar una causa específica con todas sus acciones solidarias asociadas. Se utiliza en la vista de detalle de una causa, donde se muestra la información completa incluyendo las acciones concretas que se pueden realizar.

#### Flujo de Ejecución

1. **Controller** (`CausesController`) → Recibe `causeId` como path param
2. **Service** (`CausesService.findById(causeId, ['actions'])`) → Solicita cargar relación de acciones
3. **Repository** (`CausesRepositoryTypeOrmAdapter.findById()`) → Hereda de clase base con parámetro `relations`
4. **TypeORM** → Genera SELECT principal + SELECT secundario para acciones
5. **PostgreSQL** → Ejecuta 2 queries independientes

#### Query Generada por TypeORM

**Query 1 - Causa principal:**

```sql
SELECT "CauseEntity"."id" AS "CauseEntity_id",
       "CauseEntity"."name" AS "CauseEntity_name",
       "CauseEntity"."description" AS "CauseEntity_description",
       "CauseEntity"."communityId" AS "CauseEntity_communityId",
       "CauseEntity"."status" AS "CauseEntity_status"
FROM "causes" "CauseEntity"
WHERE "CauseEntity"."id" = $1;
```

**Query 2 - Acciones relacionadas:**

```sql
SELECT "ActionEntity"."id" AS "ActionEntity_id",
       "ActionEntity"."name" AS "ActionEntity_name",
       "ActionEntity"."description" AS "ActionEntity_description",
       "ActionEntity"."causeId" AS "ActionEntity_causeId"
FROM "actions" "ActionEntity"
WHERE "ActionEntity"."causeId" = $1;
```

**Parámetros:** `$1 = causeId`

#### Código del Repositorio

```typescript
// Heredado de RepositoryTypeORM<Cause, CauseEntity>
async findById(
  id: string,
  relations?: string[]
): Promise<Either<ValidationError | RepositoryException, Cause>> {
  return super.findById(id, relations);
}

// Implementación en clase base:
async findById(
  id: string,
  relations?: string[]
): Promise<Either<ValidationError | RepositoryException, Entity>> {
  const entity = await this.repository.findOne({
    where: { id },
    relations: relations || [],
  });

  if (!entity) {
    return left(new EntityNotFoundException(Entity.name, id));
  }

  return this.mapper.fromPersistence(entity);
}
```

#### Análisis de Conversión del ORM

- **Estrategia de 2 queries**: TypeORM con `find()`/`findOne()` ejecuta queries separadas para entidad principal y relaciones
- **Primera query**: Busca la causa por su `id` con WHERE simple
- **Segunda query**: Busca todas las acciones donde `causeId` coincide con el id de la causa
- **`relations: ['actions']`**: Indica a TypeORM que cargue la relación OneToMany definida en `CauseEntity`
- **Eager loading**: Carga las acciones automáticamente sin necesidad de query manual
- **Unión en memoria**: TypeORM ensambla el objeto completo en la aplicación, no en la BD
- **Sin JOIN**: A diferencia de QueryBuilder, `find()`/`findOne()` no usa LEFT JOIN

#### Qué Busca Esta Consulta

Busca una causa específica por su ID e incluye todas las acciones asociadas:

- **Causa**: Registro único de la tabla `causes` con `id` especificado
- **Acciones**: Todas las filas de `actions` donde `causeId` coincide
- **Relación 1:N**: Una causa puede tener múltiples acciones

**Ejemplo de resultado:**

```json
{
  "id": "cause-uuid-1",
  "name": "Reforestación Amazonia",
  "description": "Plantar 10000 árboles nativos",
  "communityId": "community-uuid-1",
  "status": "APPROVED",
  "actions": [
    {
      "id": "action-uuid-1",
      "name": "Jornada de plantación Marzo",
      "description": "Plantar 500 árboles",
      "causeId": "cause-uuid-1"
    },
    {
      "id": "action-uuid-2",
      "name": "Jornada de plantación Abril",
      "description": "Plantar 500 árboles",
      "causeId": "cause-uuid-1"
    }
  ]
}
```

### 2.4 Causa específica por comunidad y causa ID (con acciones)

```sql
-- Query 1: Obtener IDs distintos
SELECT DISTINCT "distinctAlias"."CauseEntity_id" AS "ids_CauseEntity_id"
FROM (
  SELECT "CauseEntity"."id" AS "CauseEntity_id",
         "CauseEntity"."name" AS "CauseEntity_name",
         "CauseEntity__CauseEntity_actions"."id" AS "CauseEntity__CauseEntity_actions_id",
         "CauseEntity__CauseEntity_actions"."name" AS "CauseEntity__CauseEntity_actions_name"
  FROM "cause" "CauseEntity"
  LEFT JOIN "action" "CauseEntity__CauseEntity_actions"
    ON "CauseEntity__CauseEntity_actions"."causeId"="CauseEntity"."id"
  WHERE (("CauseEntity"."id" = $1) AND ("CauseEntity"."communityId" = $2))
) "distinctAlias"
ORDER BY "CauseEntity_id" ASC
LIMIT 1

-- Query 2: Obtener datos completos
SELECT "CauseEntity"."id" AS "CauseEntity_id",
       "CauseEntity"."name" AS "CauseEntity_name",
       "CauseEntity"."description" AS "CauseEntity_description",
       "CauseEntity"."initialDate" AS "CauseEntity_initialDate",
       "CauseEntity"."durationDays" AS "CauseEntity_durationDays",
       "CauseEntity"."ods" AS "CauseEntity_ods",
       "CauseEntity"."communityId" AS "CauseEntity_communityId",
       "CauseEntity__CauseEntity_actions"."id" AS "CauseEntity__CauseEntity_actions_id",
       "CauseEntity__CauseEntity_actions"."name" AS "CauseEntity__CauseEntity_actions_name",
       "CauseEntity__CauseEntity_actions"."description" AS "CauseEntity__CauseEntity_actions_description",
       "CauseEntity__CauseEntity_actions"."causeId" AS "CauseEntity__CauseEntity_actions_causeId"
FROM "cause" "CauseEntity"
LEFT JOIN "action" "CauseEntity__CauseEntity_actions"
  ON "CauseEntity__CauseEntity_actions"."causeId"="CauseEntity"."id"
WHERE ( (("CauseEntity"."id" = $1) AND ("CauseEntity"."communityId" = $2)) )
  AND ( "CauseEntity"."id" IN ($3) )
```

**Repositorio:** `CausesRepositoryTypeOrmAdapter`  
**Servicio:** `CausesService`  
**Endpoint:** `GET /communities/:communityId/causes/:causeId`

#### Caso de Uso

Validar que una causa específica pertenece a una comunidad determinada antes de permitir operaciones sobre ella. Se utiliza como medida de seguridad para prevenir que usuarios modifiquen causas de comunidades a las que no pertenecen.

#### Flujo de Ejecución

1. **Controller** (`CausesController`) → Recibe `communityId` y `causeId` como path params
2. **Service** (`CausesService.findByCommunityIdAndCauseId()`) → Valida ownership
3. **Repository** (`CausesRepositoryTypeOrmAdapter.findByCommunityIdAndCauseId()`) → Método custom con doble filtro
4. **TypeORM** → Genera SELECT con WHERE compuesto (AND)
5. **PostgreSQL** → Ejecuta query con 2 condiciones

#### Query Generada por TypeORM

```sql
SELECT "CauseEntity"."id" AS "CauseEntity_id",
       "CauseEntity"."name" AS "CauseEntity_name",
       "CauseEntity"."description" AS "CauseEntity_description",
       "CauseEntity"."communityId" AS "CauseEntity_communityId",
       "CauseEntity"."status" AS "CauseEntity_status"
FROM "causes" "CauseEntity"
WHERE "CauseEntity"."id" = $1
  AND "CauseEntity"."communityId" = $2;
```

**Parámetros:**

- `$1 = causeId` (ej: "cause-uuid-123")
- `$2 = communityId` (ej: "community-uuid-456")

#### Código del Repositorio

```typescript
async findByCommunityIdAndCauseId(
  communityId: string,
  causeId: string,
  actions: boolean = false,
): Promise<Either<ValidationError | RepositoryException, Cause>> {
  const causeEntity = await this.causeRepository.findOne({
    where: { id: causeId, communityId },
    relations: actions ? ['actions'] : [],
  });

  if (!causeEntity) {
    return left(
      new EntityNotFoundException(
        Cause.name,
        causeId,
        `Cause with id ${causeId} for community ${communityId} not found`,
      ),
    );
  }

  const causeOrError = this.causeMapper.fromPersistence(causeEntity);

  if (causeOrError.isLeft()) {
    return left(causeOrError.value);
  }

  return right(causeOrError.value);
}
```

#### Análisis de Conversión del ORM

- **`where: { id: causeId, communityId }`**: Objeto con múltiples propiedades genera condiciones AND
- **WHERE compuesto**: TypeORM traduce cada propiedad del objeto a una condición en el WHERE
- **Validación de ownership**: La combinación de ambos IDs garantiza que la causa pertenece a la comunidad
- **EntityNotFoundException**: Si no encuentra registro, retorna error específico indicando ambos IDs
- **Pattern Either**: Manejo funcional de errores con tipo `Left` (error) o `Right` (éxito)
- **Parámetros preparados**: Uso de `$1` y `$2` para prevenir SQL injection
- **Control de acceso**: Esta query implementa autorización a nivel de datos

#### Qué Busca Esta Consulta

Busca una causa que cumpla DOS condiciones simultáneamente:

1. **`id = causeId`**: La causa debe tener el ID especificado
2. **`communityId = communityId`**: La causa debe pertenecer a la comunidad especificada

**Casos de uso:**

- **Éxito**: Causa existe y pertenece a la comunidad → Retorna causa
- **Fallo 1**: Causa existe pero pertenece a otra comunidad → Retorna `null` (EntityNotFoundException)
- **Fallo 2**: Causa no existe → Retorna `null` (EntityNotFoundException)

---

## **3. ACTIONS - Listado Simple (1 consulta)**

### 3.1 Listar todas las acciones

```sql
SELECT "ActionEntity"."id" AS "ActionEntity_id",
       "ActionEntity"."name" AS "ActionEntity_name",
       "ActionEntity"."description" AS "ActionEntity_description",
       "ActionEntity"."causeId" AS "ActionEntity_causeId"
FROM "action" "ActionEntity"
```

**Repositorio:** `ActionsRepositoryTypeOrmAdapter`  
**Servicio:** `ActionsService`  
**Endpoint:** `GET /actions`

#### Caso de Uso

Obtener un listado completo de todas las acciones solidarias registradas en el sistema, sin filtros ni relaciones adicionales. Se utiliza en dashboards de administración para tener una visión global de todas las acciones disponibles.

#### Flujo de Ejecución

1. **Controller** (`ActionsController`) → Recibe petición GET sin parámetros
2. **Service** (`ActionsService.findAll()`) → Procesa solicitud
3. **Repository** (`ActionsRepositoryTypeOrmAdapter.findAll()`) → Hereda método de clase base
4. **TypeORM** → Genera SELECT simple de toda la tabla
5. **PostgreSQL** → Ejecuta query en tabla `actions`

#### Query Generada por TypeORM

```sql
SELECT "ActionEntity"."id" AS "ActionEntity_id",
       "ActionEntity"."name" AS "ActionEntity_name",
       "ActionEntity"."description" AS "ActionEntity_description",
       "ActionEntity"."causeId" AS "ActionEntity_causeId",
       "ActionEntity"."startDate" AS "ActionEntity_startDate",
       "ActionEntity"."endDate" AS "ActionEntity_endDate"
FROM "actions" "ActionEntity";
```

#### Código del Repositorio

```typescript
@Injectable()
export class ActionsRepositoryTypeOrmAdapter
  extends RepositoryTypeORM<Action, ActionEntity>
  implements ActionsRepositoryPort
{
  constructor(
    @InjectRepository(ActionEntity)
    private readonly actionRepository: TypeOrmRepository<ActionEntity>,
    private readonly actionMapper: ActionEntityMapper,
  ) {
    super(actionRepository, actionMapper);
  }
  // findAll() heredado de RepositoryTypeORM
}

// Implementación heredada de RepositoryTypeORM:
async findAll(): Promise<Either<ValidationError | RepositoryException, Action[]>> {
  const entities = await this.repository.find();
  const domainEntities = sequence(entities.map(e => this.mapper.fromPersistence(e)));
  return domainEntities.isLeft() ? left(domainEntities.value) : right(domainEntities.value);
}
```

#### Análisis de Conversión del ORM

- **Herencia completa**: `ActionsRepositoryTypeOrmAdapter` extiende `RepositoryTypeORM` sin override de métodos base
- **`repository.find()`**: Sin argumentos, genera SELECT de todos los registros sin WHERE ni JOIN
- **Sin relaciones**: No carga datos de la causa (`Cause`) asociada, solo el FK `causeId`
- **Mapeo Entity→Domain**: Cada `ActionEntity` se convierte en objeto `Action` del dominio mediante `ActionEntityMapper`
- **Pattern Either**: Manejo funcional de errores en la conversión de persistencia a dominio
- **Función `sequence`**: Transforma `Action[]` con posibles errores en `Either<Error, Action[]>`

#### Qué Busca Esta Consulta

Recupera todas las filas de la tabla `actions` con sus datos básicos: identificador UUID, nombre, descripción, FK a la causa, y fechas de inicio/fin de la acción.

---

## **4. COMMUNITIES QUERY - Time Series (1 consulta)**

### 4.1 Usuarios que se unieron por mes

```sql
SELECT "community"."name" AS "communityName",
       to_char(date_trunc('month', "cm"."joinedAt"), 'YYYY-MM') AS "month",
       COUNT(*) AS "userCount"
FROM "community" "community"
LEFT JOIN "community_user" "cm"
  ON "cm"."communityId"="community"."id"
WHERE "cm"."communityId" = $1
GROUP BY to_char(date_trunc('month', "cm"."joinedAt"), 'YYYY-MM'), "community"."name"
ORDER BY to_char(date_trunc('month', "cm"."joinedAt"), 'YYYY-MM') DESC
LIMIT 12
```

**Repositorio:** `CommunitiesQueryTypeOrmRepositoryAdapter`  
**Servicio:** `CommunitiesService`  
**Endpoint:** `GET /admin/communities/:id/statistics/users-joined`

#### Caso de Uso

Generar estadísticas de crecimiento de una comunidad mostrando cuántos usuarios se unieron cada mes durante el último año. Se utiliza en dashboards de análisis para visualizar tendencias de adopción y picos de actividad en gráficos de series temporales.

#### Flujo de Ejecución

1. **Controller** (`CommunitiesController`) → Recibe `communityId` y opcionalmente `months` como query param
2. **Service** (`CommunitiesService.getJoinedUsersLastMonths()`) → Procesa con `months = 12` por defecto
3. **Repository** (`CommunitiesQueryTypeOrmRepositoryAdapter.findJoinedUsersLastMonths()`) → Método custom con agregación temporal
4. **TypeORM QueryBuilder** → Genera SELECT con date_trunc, GROUP BY y ORDER BY
5. **PostgreSQL** → Ejecuta query con funciones de fecha y agregación

#### Query Generada por TypeORM

```sql
SELECT to_char(date_trunc('month', cm."joinedAt"), 'YYYY-MM') AS "month",
       COUNT(*) AS "userCount",
       community."name" AS "communityName"
FROM "communities" "community"
LEFT JOIN "community_members" "cm"
  ON "cm"."communityId" = "community"."id"
WHERE "cm"."communityId" = $1
GROUP BY to_char(date_trunc('month', cm."joinedAt"), 'YYYY-MM'), community."name"
ORDER BY to_char(date_trunc('month', cm."joinedAt"), 'YYYY-MM') DESC
LIMIT $2;
```

**Parámetros:**

- `$1 = communityId` (ej: "community-uuid-123")
- `$2 = months` (ej: 12)

#### Código del Repositorio

```typescript
async findJoinedUsersLastMonths(
  communityId: string,
  months: number = 12,
): Promise<Either<RepositoryException, CommunityLastUsersJoinedData[]>> {
  const queryBuilder = this.communityRepository
    .createQueryBuilder('community')
    .leftJoinAndSelect('community.members', 'cm')
    .where('cm.communityId = :communityId', { communityId })
    .select(`to_char(date_trunc('month', cm.joinedAt), 'YYYY-MM')`, 'month')
    .addSelect('COUNT(*)', 'userCount')
    .addSelect('community.name', 'communityName')
    .groupBy(`to_char(date_trunc('month', cm.joinedAt), 'YYYY-MM')`)
    .addGroupBy('community.name')
    .orderBy(`to_char(date_trunc('month', cm.joinedAt), 'YYYY-MM')`, 'DESC')
    .limit(months);

  let communityEntitiesData: CommunityLastUsersJoinedData[];
  try {
    communityEntitiesData = await queryBuilder.getRawMany<CommunityLastUsersJoinedData>();
  } catch (error) {
    return left(new RepositoryException('Failed to retrieve communities ordered by most users', error));
  }

  return right(
    communityEntitiesData.map(data => ({
      communityName: data.communityName,
      month: data.month,
      userCount: Number(data.userCount),
    })),
  );
}
```

#### Análisis de Conversión del ORM

- **QueryBuilder**: Utiliza API fluida de TypeORM para construir query compleja con agregaciones
- **`date_trunc('month', cm.joinedAt)`**: Función de PostgreSQL que trunca timestamp al primer día del mes
- **`to_char(..., 'YYYY-MM')`**: Formatea la fecha truncada como string "2024-03" para agrupar
- **`leftJoinAndSelect`**: Genera LEFT JOIN con tabla `community_members` para acceder a fechas de unión
- **`where` con parámetros named**: `:communityId` se convierte en prepared statement `$1`
- **`select` + `addSelect`**: Define columnas calculadas (agregaciones) en vez de columnas de entidad
- **`groupBy` + `addGroupBy`**: Agrupa por mes y nombre de comunidad
- **`orderBy DESC`**: Ordena desde el mes más reciente al más antiguo
- **`limit(months)`**: Limita a los últimos N meses
- **`getRawMany()`**: Retorna objetos planos (no entidades), necesario para agregaciones
- **Conversión a número**: `COUNT(*)` retorna string, se convierte explícitamente a `Number`

#### Qué Busca Esta Consulta

Genera un resumen mensual del crecimiento de usuarios en una comunidad:

- **Agrupación temporal**: Usuarios agrupados por mes de unión
- **Conteo por mes**: Cuántos usuarios se unieron cada mes
- **Últimos N meses**: Solo los más recientes (por defecto 12)
- **Ordenado descendente**: Del mes actual hacia atrás

**Uso en frontend:** Estos datos se utilizan para generar gráficos de líneas o barras mostrando la evolución temporal del crecimiento de la comunidad.

---

## **5. USERS - Autenticación y Validación (4 consultas)**

### 5.1 Buscar usuario por ID

```sql
SELECT "UserEntity"."Id" AS "UserEntity_Id",
       "UserEntity"."FullName" AS "UserEntity_FullName",
       "UserEntity"."MobilePhone" AS "UserEntity_MobilePhone",
       "UserEntity"."Username" AS "UserEntity_Username",
       "UserEntity"."PasswordHash" AS "UserEntity_PasswordHash",
       "UserEntity"."City" AS "UserEntity_City",
       "UserEntity"."CountryCode" AS "UserEntity_CountryCode"
FROM "tbl_Usuarios" "UserEntity"
WHERE "UserEntity"."Id" IN ($1);
```

**Repositorio:** `UsersRepositoryTypeORM`  
**Servicio:** `UsersService`  
**Endpoint:** `GET /users/:id`

#### Caso de Uso

Recuperar el perfil completo de un usuario específico por su identificador único. Se utiliza en vistas de perfil de usuario, autenticación y validación de permisos.

#### Flujo de Ejecución

1. **Controller** (`UsersController`) → Recibe `userId` como path param
2. **Service** (`UsersService.findById(userId)`) → Procesa solicitud
3. **Repository** (`UsersRepositoryTypeORM.findById()`) → Hereda de clase base
4. **TypeORM** → Genera SELECT con WHERE por ID
5. **PostgreSQL** → Ejecuta query en tabla `users`

#### Query Generada por TypeORM

````sql
SELECT "UserEntity"."Id" AS "UserEntity_Id",
       "UserEntity"."FullName" AS "UserEntity_FullName",
       "UserEntity"."MobilePhone" AS "UserEntity_MobilePhone",
       "UserEntity"."Username" AS "UserEntity_Username",
       "UserEntity"."PasswordHash" AS "UserEntity_PasswordHash",
       "UserEntity"."City" AS "UserEntity_City",
       "UserEntity"."CountryCode" AS "UserEntity_CountryCode"
FROM "tbl_Usuarios" "UserEntity"
WHERE "UserEntity"."Id" IN ($1);
```
#### Código del Repositorio

```typescript
@Injectable()
export class UsersRepositoryTypeORM
  extends RepositoryTypeORM<User, UserEntity>
  implements UsersRepositoryPort
{
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: TypeOrmRepository<UserEntity>,
    private readonly userMapper: UserMapper,
  ) {
    super(usersRepository, userMapper);
  }
  // findById() heredado de RepositoryTypeORM
}

// Implementación en clase base:
async findById(
  id: string,
  relations?: string[]
): Promise<Either<ValidationError | RepositoryException, User>> {
  const entity = await this.repository.findOne({
    where: { id },
    relations: relations || [],
  });

  if (!entity) {
    return left(new EntityNotFoundException(User.name, id));
  }

  return this.mapper.fromPersistence(entity);
}
````

#### Análisis de Conversión del ORM

- **Herencia de RepositoryTypeORM**: Método `findById()` no necesita implementación custom
- **`findOne({ where: { id } })`**: Busca un único registro por clave primaria
- **Prepared statement**: Parámetro `$1` previene SQL injection
- **EntityNotFoundException**: Si no existe usuario con ese ID, retorna error específico
- **`relations: []`**: Por defecto no carga relaciones (comunidades del usuario, etc.)
- **Mapeo a dominio**: `UserEntity` (persistencia) → `User` (dominio) mediante `UserMapper`
- **Pattern Either**: Retorno funcional con `Left` (error) o `Right` (usuario encontrado)

#### Qué Busca Esta Consulta

Busca un usuario específico por su ID primario con sus datos básicos: identificador UUID, username, información de contacto (email, móvil), nombre completo, y fechas de creación/actualización del registro.

### 5.2 Verificar existencia por móvil

```sql
SELECT COUNT(1) AS "cnt"
FROM "tbl_Usuarios" "UserEntity"
WHERE "UserEntity"."MobilePhone" = $1;
```

**Repositorio:** `UsersRepositoryTypeORM`  
**Servicio:** `UsersService`  
**Endpoint:** `POST /users/validate` (validación en registro)

#### Caso de Uso

Validar si un número de teléfono móvil ya está registrado en el sistema antes de permitir que un nuevo usuario se registre con ese número. Previene duplicados y garantiza unicidad del campo `mobilePhone`.

#### Flujo de Ejecución

1. **Controller** (`UsersController`) → Recibe `mobilePhone` en el body de la petición
2. **Service** (`UsersService.validateMobilePhone()`) → Valida unicidad
3. **Repository** (`UsersRepositoryTypeORM.existsByMobilePhone()`) → Método custom de existencia
4. **TypeORM** → Genera SELECT COUNT para verificar existencia
5. **PostgreSQL** → Ejecuta conteo con WHERE

#### Query Generada por TypeORM

```sql
SELECT COUNT(1) AS "cnt"
FROM "tbl_Usuarios" "UserEntity"
WHERE "UserEntity"."MobilePhone" = $1;
```

**Parámetro:** `$1 = mobilePhone.value` (ej: "+34612345678")

#### Código del Repositorio

```typescript
async existsByMobilePhone(
  mobilePhone: MobilePhone
): Promise<Either<RepositoryException, boolean>> {
  try {
    // Realizar la consulta a la base de datos
    const count = await this.usersRepository.count({
      where: { mobilePhone: mobilePhone.value },
    });

    // Devolver true si existe, false si no
    return right(count > 0);
  } catch (error) {
    const errorMessage = error instanceof Error
      ? error.message
      : 'Unknown error checking mobile phone';

    return left(
      new RepositoryException(
        `Failed to check if mobile phone exists: ${errorMessage}`
      )
    );
  }
}
```

#### Análisis de Conversión del ORM

- **`repository.count()`**: Método especializado de TypeORM para conteos
- **Genera COUNT(\*)**: Retorna número de filas que coinciden, no los datos completos
- **Value Object**: Parámetro `mobilePhone` es un Value Object, se extrae `.value` para la query
- **Validación de unicidad**: `count > 0` indica que ya existe un usuario con ese móvil
- **Retorno booleano**: Simplifica la lógica del servicio (true = existe, false = disponible)
- **Manejo de errores**: Try-catch captura errores de BD y los convierte en `RepositoryException`
- **Pattern Either**: Retorna `Right<boolean>` en éxito o `Left<RepositoryException>` en error

#### Qué Busca Esta Consulta

Verifica existencia de usuarios con un número de móvil específico:

- **Búsqueda por columna única**: `mobilePhone` tiene constraint UNIQUE en la BD
- **Retorno de existencia**: No retorna datos del usuario, solo si existe o no
- **Casos posibles**:
  - `count = 0` → Número disponible (retorna `false`)
  - `count = 1` → Número ya registrado (retorna `true`)
  - `count > 1` → Violación de constraint (no debería ocurrir)

**Ejemplo de uso en validación:**

```typescript
// En el servicio de registro:
const existsResult = await this.usersRepository.existsByMobilePhone(mobilePhone);

if (existsResult.isRight() && existsResult.value === true) {
  throw new ConflictException("Mobile phone already registered");
}
// Continuar con el registro...
```

**Resultado de la query:**

- Si móvil existe: `count = 1` → Retorna `Right(true)`
- Si móvil disponible: `count = 0` → Retorna `Right(false)`

### 5.3 Verificar existencia por username

```sql
SELECT COUNT(1) AS "cnt"
FROM "tbl_Usuarios" "UserEntity"
WHERE "UserEntity"."Username" = $1;
```

**Repositorio:** `UsersRepositoryTypeORM`  
**Servicio:** `UsersService`  
**Endpoint:** `POST /users/validate` (validación en registro)

#### Caso de Uso

Validar si un nombre de usuario (username) ya está siendo utilizado por otro usuario antes de permitir el registro. Garantiza la unicidad del username en el sistema.

#### Flujo de Ejecución

1. **Controller** (`UsersController`) → Recibe `username` en el body de la petición
2. **Service** (`UsersService.validateUsername()`) → Valida disponibilidad
3. **Repository** (`UsersRepositoryTypeORM.existsByUsername()`) → Método custom de verificación
4. **TypeORM** → Genera SELECT COUNT para comprobar existencia
5. **PostgreSQL** → Ejecuta conteo con WHERE

#### Query Generada por TypeORM

```sql
SELECT COUNT(1) AS "cnt"
FROM "tbl_Usuarios" "UserEntity"
WHERE "UserEntity"."Username" = $1;
```

**Parámetro:** `$1 = username.value` (ej: "juan_martinez")

#### Código del Repositorio

```typescript
async existsByUsername(
  username: Username
): Promise<Either<RepositoryException, boolean>> {
  try {
    // Realizar la consulta a la base de datos
    const count = await this.usersRepository.count({
      where: { username: username.value },
    });

    // Devolver true si existe, false si no
    return right(count > 0);
  } catch (error) {
    const errorMessage = error instanceof Error
      ? error.message
      : 'Unknown error checking username';

    return left(
      new RepositoryException(
        `Failed to check if username exists: ${errorMessage}`
      )
    );
  }
}
```

#### Análisis de Conversión del ORM

- **`repository.count()`**: Genera query COUNT en lugar de SELECT completo
- **Value Object Username**: Parámetro tipado con validaciones de dominio, se extrae `.value`
- **WHERE con UNIQUE constraint**: Columna `Username` tiene índice único en BD
- **Validación preventiva**: Ejecuta antes del INSERT para evitar violación de constraint
- **Booleano simplificado**: `count > 0` convierte número a booleano para lógica clara
- **Try-catch necesario**: COUNT puede fallar por problemas de conexión
- **Pattern Either**: Retorna `Right<boolean>` (disponible/ocupado) o `Left<RepositoryException>` (error de BD)
- **Nombres de tabla**: La tabla real es `tbl_Usuarios` con columnas en PascalCase
- **Validación preventiva**: Ejecuta antes del INSERT para evitar violación de constraint
- **Booleano simplificado**: `count > 0` convierte número a booleano para lógica clara
- **Try-catch necesario**: COUNT puede fallar por problemas de conexión
- **Pattern Either**: Retorna `Right<boolean>` (disponible/ocupado) o `Left<RepositoryException>` (error de BD)

#### Qué Busca Esta Consulta

Verifica si existe algún usuario con el username especificado:

- **Búsqueda por username**: Campo único identificador del usuario
- **Retorno de existencia**: Solo indica si está disponible (false) o ocupado (true)
- **Casos posibles**:
  - `count = 0` → Username disponible para registro
  - `count = 1` → Username ya ocupado por otro usuario
  - `count > 1` → Error: violación de unicidad (no debería ocurrir)

**Ejemplo de flujo de validación:**

```typescript
// En el servicio de registro:
const usernameExists = await this.usersRepository.existsByUsername(username);

if (usernameExists.isRight() && usernameExists.value === true) {
  throw new ConflictException("Username is already taken");
}

// Username disponible, continuar con registro
```

**Resultado de la query:**

- Username "juan_martinez" ya existe: `count = 1` → Retorna `Right(true)`
- Username "maria_lopez" disponible: `count = 0` → Retorna `Right(false)`

**Validación de dominio:**
Antes de ejecutar la query, el Value Object `Username` ya ha validado:

- Longitud mínima/máxima
- Caracteres permitidos (alfanuméricos y guión bajo)
- Sin espacios ni caracteres especiales

### 5.4 Buscar usuario por username (login)

```sql
SELECT "UserEntity"."Id" AS "UserEntity_Id",
       "UserEntity"."FullName" AS "UserEntity_FullName",
       "UserEntity"."MobilePhone" AS "UserEntity_MobilePhone",
       "UserEntity"."Username" AS "UserEntity_Username",
       "UserEntity"."PasswordHash" AS "UserEntity_PasswordHash",
       "UserEntity"."City" AS "UserEntity_City",
       "UserEntity"."CountryCode" AS "UserEntity_CountryCode"
FROM "tbl_Usuarios" "UserEntity"
WHERE "UserEntity"."Username" = $1;
```

**Repositorio:** `UsersRepositoryTypeORM`  
**Servicio:** `AuthService`  
**Endpoint:** `POST /auth/login`

#### Caso de Uso

Recuperar los datos completos de un usuario utilizando su nombre de usuario (username) durante el proceso de autenticación. El sistema necesita obtener el usuario para verificar la contraseña hasheada y generar el token JWT.

#### Flujo de Ejecución

1. **Controller** (`AuthController`) → Recibe `username` y `password` en el body
2. **Service** (`AuthService.login()`) → Inicia proceso de autenticación
3. **Repository** (`UsersRepositoryTypeORM.findByUsername()`) → Método custom de búsqueda
4. **TypeORM** → Genera SELECT con WHERE por username
5. **PostgreSQL** → Ejecuta query en tabla `users`
6. **Service** → Valida contraseña y genera JWT si es correcta

#### Query Generada por TypeORM

````sql
SELECT "UserEntity"."Id" AS "UserEntity_Id",
       "UserEntity"."FullName" AS "UserEntity_FullName",
       "UserEntity"."MobilePhone" AS "UserEntity_MobilePhone",
       "UserEntity"."Username" AS "UserEntity_Username",
       "UserEntity"."PasswordHash" AS "UserEntity_PasswordHash",
       "UserEntity"."City" AS "UserEntity_City",
       "UserEntity"."CountryCode" AS "UserEntity_CountryCode"
FROM "tbl_Usuarios" "UserEntity"
WHERE "UserEntity"."Username" = $1;

#### Código del Repositorio

```typescript
async findByUsername(
  username: Username
): Promise<Either<RepositoryException | ValidationError, User>> {
  try {
    const userEntity = await this.usersRepository.findOne({
      where: { username: username.value },
    });

    if (!userEntity) {
      return left(
        new EntityNotFoundException(
          Username.name,
          'User not found'
        )
      );
    }

    return this.userMapper.fromPersistence(userEntity);
  } catch (error) {
    const errorMessage = error instanceof Error
      ? error.message
      : 'Unknown error finding user by username';

    return left(
      new RepositoryException(
        `Failed to find user by username: ${errorMessage}`
      )
    );
  }
}
````

#### Análisis de Conversión del ORM

- **`findOne({ where: { username } })`**: Busca un único registro por Username (campo único)
- **Value Object Username**: Parámetro tipado del dominio, se extrae `.value` para la query
- **Prepared statement**: Uso de `$1` previene SQL injection en login
- **Retorno completo**: A diferencia de `existsByUsername`, retorna el objeto User completo
- **Incluye PasswordHash**: Campo `PasswordHash` (hash) se carga para validación posterior
- **EntityNotFoundException**: Si username no existe, retorna error específico (no UnauthorizedException aún)
- **Mapeo a dominio**: `UserEntity` (de `tbl_Usuarios`) → `User` mediante `UserMapper.fromPersistence()`
- **Pattern Either**: Permite distinguir entre "usuario no encontrado" y "error de BD"
- **Seguridad**: La validación de password se hace en el Service, no en el Repository

#### Qué Busca Esta Consulta

Busca un usuario completo por su Username en `tbl_Usuarios` para autenticación. Retorna todos sus datos incluyendo el PasswordHash (hash bcrypt) necesario para validar credenciales en el proceso de login.

---
