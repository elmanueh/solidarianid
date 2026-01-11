# Análisis de Consultas MongoDB - Admin App

He identificado **14 consultas únicas** ejecutadas en la aplicación admin. Aquí está el análisis detallado con contexto profundo del ORM Mongoose.

---

## **1. DASHBOARD - Métricas y Estadísticas (6 consultas)**

### 1.1 Causas agrupadas por ODS

#### Caso de Uso

Mostrar en el dashboard un gráfico de distribución que indica cuántas causas aprobadas existen para cada ODS (Objetivo de Desarrollo Sostenible de la ONU). Este es un KPI crítico para medir el impacto social de la plataforma según los 17 objetivos de la Agenda 2030.

#### Flujo de Ejecución

Controller → `DashboardService.getCausesGroupByOds()` → `RequestQueryRepositoryMongoose.findCausesGroupByOds()`

#### Query Generada por Mongoose

```javascript
requests.aggregate([
  { $match: { $and: [{ type: "cause" }, { status: "approved" }] } },
  { $unwind: "$ods" },
  { $group: { _id: "$ods", causeCount: { $sum: 1 } } },
  { $project: { _id: 0, ods: "$_id", causeCount: 1 } },
  { $sort: { ods: 1 } },
]);
```

#### Código del Repositorio

```typescript
// request-query.repository-mongoose.ts
async findCausesGroupByOds(): Promise<Either<RepositoryException, CauseGroupByOds[]>> {
  try {
    const causesGrouped = await this.requestModel.aggregate<CauseGroupByOds>([
      { $match: { $and: [{ type: RequestType.CAUSE }, { status: 'approved' }] } },
      { $unwind: '$ods' },
      { $group: { _id: '$ods', causeCount: { $sum: 1 } } },
      { $project: { _id: 0, ods: '$_id', causeCount: 1 } },
      { $sort: { ods: 1 } },
    ]);

    return right(causesGrouped);
  } catch (error) {
    return left(new RepositoryException('Failed to group causes by ODS', error));
  }
}
```

#### Análisis de Conversión del ORM (Mongoose Aggregation Pipeline)

1. **`$match`**: Filtra solo documentos donde `type === "cause"` AND `status === "approved"`. Mongoose traduce el enum `RequestType.CAUSE` al string "cause" y aplica índice compuesto si existe en `{type: 1, status: 1}`.

2. **`$unwind: "$ods"`**: Descompone el array `ods` (puede contener múltiples ODS por causa) en documentos individuales. Si una causa tiene `ods: [3, 12, 13]`, genera 3 documentos temporales.

3. **`$group`**: Agrupa por `_id: "$ods"` (el número del ODS) y cuenta con `$sum: 1`. Mongoose acumula el conteo en memoria.

4. **`$project`**: Renombra `_id` a `ods` y mantiene `causeCount`. Elimina el campo `_id` del resultado final con `_id: 0`.

5. **`$sort: { ods: 1 }`**: Ordena ascendentemente por número de ODS (1 a 17).

#### Qué Busca Esta Consulta

Busca **todas las causas aprobadas** (`status: "approved"`) y las agrupa contando cuántas causas están asociadas a cada ODS específico. Por ejemplo, si hay 15 causas con ODS 3 (Salud y Bienestar) y 8 con ODS 13 (Acción por el Clima), el resultado será:

```javascript
[
  { ods: 3, causeCount: 15 },
  { ods: 13, causeCount: 8 },
  // ... resto de ODS
];
```

Vista en dashboard: `/admin` → Sección "Causas por ODS"

---

### 1.2 Usuarios agrupados por país (Top 6)

#### Caso de Uso

Mostrar en el dashboard un mapa o gráfico de barras con los 6 países con más voluntarios registrados. Ayuda a identificar la penetración geográfica de la plataforma y focalizar esfuerzos de expansión.

#### Flujo de Ejecución

Controller → `DashboardService.getUsersByCountry()` → `UserQueryRepositoryMongoose.findUsersGroupByCountry(6)`

#### Query Generada por Mongoose

```javascript
users.aggregate([
  { $group: { _id: "$location.countryCode", userCount: { $sum: 1 } } },
  { $sort: { userCount: -1 } },
  { $project: { _id: 0, country: "$_id", userCount: 1 } },
  { $limit: 6 },
]);
```

#### Código del Repositorio

```typescript
// user-query.repository-mongoose.ts
async findUsersGroupByCountry(limit: number = 6): Promise<Either<RepositoryException, UserGroupByCountryData[]>> {
  let usersGrouped: UserGroupByCountryData[];
  try {
    usersGrouped = await this.userModel.aggregate<UserGroupByCountryData>([
      { $group: { _id: '$location.countryCode', userCount: { $sum: 1 } } },
      { $sort: { userCount: -1 } },
      { $project: { _id: 0, country: '$_id', userCount: 1 } },
      { $limit: limit },
    ]);
  } catch (error) {
    return left(new RepositoryException('Failed to retrieve users grouped by country', error));
  }
  return right(usersGrouped);
}
```

#### Análisis de Conversión del ORM (Mongoose Aggregation Pipeline)

1. **`$group: { _id: "$location.countryCode" }`**: Agrupa todos los usuarios por el campo anidado `location.countryCode` (código ISO del país como "ES", "MX", "CO"). Mongoose navega la ruta del subdocumento automáticamente.

2. **`userCount: { $sum: 1 }`**: Acumulador que cuenta documentos. Por cada usuario del grupo, suma 1.

3. **`$sort: { userCount: -1 }`**: Ordena descendentemente por el conteo (de mayor a menor número de usuarios). Mongoose ejecuta sort en memoria después del group.

4. **`$project`**: Renombra `_id` (que contiene el countryCode) a `country` y mantiene `userCount`. Elimina el `_id` del output.

5. **`$limit: 6`**: Retorna solo los 6 primeros países (los que tienen más usuarios).

#### Qué Busca Esta Consulta

Busca **todos los usuarios** de la colección `users`, los agrupa por código de país (`location.countryCode`) y cuenta cuántos usuarios hay en cada país. Luego ordena por el conteo de mayor a menor y retorna solo el top 6. Resultado ejemplo:

```javascript
[
  { country: "ES", userCount: 234 },
  { country: "MX", userCount: 189 },
  { country: "CO", userCount: 145 },
  { country: "AR", userCount: 98 },
  { country: "PE", userCount: 76 },
  { country: "CL", userCount: 54 },
];
```

Vista en dashboard: `/admin` → Sección "Distribución Geográfica"

### 1.3 Comunidades aprobadas

#### Caso de Uso

Mostrar en un KPI card del dashboard el número total de comunidades que han sido aprobadas por los administradores. Es una métrica clave de crecimiento de la plataforma.

#### Flujo de Ejecución

Controller → `DashboardService.getApprovedCommunities()` → `RequestRepositoryMongoose.findByStatusAndType('approved', 'community')` → `.length`

#### Query Generada por Mongoose

```javascript
requests.find({ status: "approved", type: "community" });
```

#### Código del Repositorio

```typescript
// request.repository-mongoose.ts
async findByStatusAndType(
  status: RequestStatus,
  type: RequestType,
): Promise<Either<RepositoryException, Request<unknown>[]>> {
  const documents = await this.requestModel.find({ status, type }).lean().exec();

  const requestsOrError = sequence(
    documents.map(document => this.requestMapper.fromPersistence(document as RequestEntity)),
  );

  if (requestsOrError.isLeft()) {
    return left(new RepositoryException('Failed to map requests from persistence', requestsOrError.value));
  }

  return right(requestsOrError.value);
}
```

#### Análisis de Conversión del ORM (Mongoose Query)

1. **`find({ status, type })`**: Mongoose genera una consulta simple con dos condiciones AND implícitas. Busca documentos donde `status === "approved"` AND `type === "community"`.

2. **`.lean()`**: Retorna POJOs (Plain Old JavaScript Objects) en lugar de documentos Mongoose completos con getters/setters/virtuals.

3. **`.exec()`**: Ejecuta la query y retorna una Promise. Sin `.exec()`, Mongoose retornaría una thenable (query builder), no una Promise pura.

4. **Índices**: Si existe índice compuesto en `{status: 1, type: 1}`, MongoDB lo usa para scan eficiente. Sin índice, hace collection scan completo.

5. **Mapping**: Usa `requestMapper.fromPersistence()` para convertir cada `RequestEntity` (schema Mongoose) a `Request` (domain model). Implementa el patrón Data Mapper.

#### Qué Busca Esta Consulta

Busca **todas las solicitudes de tipo "community"** que tienen `status: "approved"`. Retorna el array completo de comunidades aprobadas. El servicio luego cuenta con `.length`. Resultado ejemplo:

```javascript
[
  { _id: "uuid1", type: "community", status: "approved", name: "Amigos de África", ... },
  { _id: "uuid2", type: "community", status: "approved", name: "Voluntarios por el Mar", ... },
  // ... todas las comunidades aprobadas
]
```

El dashboard muestra: **"23 Comunidades Activas"**

Vista en dashboard: `/admin` → Card "Total Comunidades"

---

### 1.4 Causas aprobadas

#### Caso de Uso

Mostrar el KPI de total de causas benéficas aprobadas. Mide el volumen de proyectos sociales activos en la plataforma.

#### Flujo de Ejecución

Controller → `DashboardService.getApprovedCauses()` → `RequestRepositoryMongoose.findByStatusAndType('approved', 'cause')` → `.length`

#### Query Generada por Mongoose

```javascript
requests.find({ status: "approved", type: "cause" });
```

#### Código del Repositorio

Usa el **mismo método** que la consulta 1.3 (`findByStatusAndType`), pero con `type: "cause"` en lugar de `"community"`. Ver código en sección 1.3.

#### Análisis de Conversión del ORM

Idéntico a la consulta 1.3. Mongoose aplica `.find()` con doble condición AND, usa `.lean()` y `.exec()` para ejecutar la query. Diferencia: busca en campo `type: "cause"` en lugar de `"community"`.

#### Qué Busca Esta Consulta

Busca **todas las solicitudes de tipo "cause"** que tienen `status: "approved"`. Las causas están vinculadas a comunidades (campo `communityId`). Ejemplo:

```javascript
[
  { _id: "uuid3", type: "cause", status: "approved", communityId: "uuid1",
    name: "Reforestación en Amazonas", ods: [13, 15], ... },
  { _id: "uuid4", type: "cause", status: "approved", communityId: "uuid1",
    name: "Limpieza de playas", ods: [14], ... },
  // ... todas las causas aprobadas
]
```

El dashboard muestra: **"87 Causas Activas"**

Vista en dashboard: `/admin` → Card "Total Causas"

---

### 1.5 Acciones aprobadas

#### Caso de Uso

Mostrar el KPI de total de acciones concretas aprobadas. Las acciones son proyectos específicos dentro de una causa (ej: "Recolecta de Alimentos Navidad 2025").

#### Flujo de Ejecución

Controller → `DashboardService.getApprovedActions()` → `RequestRepositoryMongoose.findByStatusAndType('approved', 'action')` → `.length`

#### Query Generada por Mongoose

```javascript
requests.find({ status: "approved", type: "action" });
```

#### Código del Repositorio

Usa el **mismo método** que las consultas 1.3 y 1.4 (`findByStatusAndType`), pero con `type: "action"`. Ver código en sección 1.3.

#### Análisis de Conversión del ORM

Idéntico a consultas 1.3 y 1.4. Mongoose ejecuta `.find({ status: "approved", type: "action" })` con `.lean().exec()`. Busca documentos donde ambas condiciones se cumplen.

#### Qué Busca Esta Consulta

Busca **todas las solicitudes de tipo "action"** que tienen `status: "approved"`. Las acciones están vinculadas a causas (campo `causeId`). Ejemplo:

```javascript
[
  { _id: "uuid5", type: "action", status: "approved", causeId: "uuid3",
    name: "Plantación 1000 árboles - Marzo 2026", startDate: "2026-03-15", ... },
  { _id: "uuid6", type: "action", status: "approved", causeId: "uuid3",
    name: "Campaña de concientización", ... },
  // ... todas las acciones aprobadas
]
```

El dashboard muestra: **"156 Acciones en Marcha"**

Vista en dashboard: `/admin` → Card "Total Acciones"

---

### 1.6 Total de usuarios registrados

#### Caso de Uso

Mostrar el KPI del número total de voluntarios registrados en la plataforma. Es la métrica principal de adopción y crecimiento de usuarios.

#### Flujo de Ejecución

Controller → `DashboardService.getTotalUsers()` → `UserRepositoryMongoose.countAll()`

#### Query Generada por Mongoose

```javascript
users.countDocuments({});
```

#### Código del Repositorio

```typescript
// user.repository-mongoose.ts
async countAll(): Promise<Either<RepositoryException, number>> {
  try {
    const count = await this.userModel.countDocuments({});
    return right(count);
  } catch (error) {
    return left(new RepositoryException('Failed to count users.', error));
  }
}
```

#### Análisis de Conversión del ORM (Mongoose Count)

1. **`countDocuments({})`**: Método optimizado de Mongoose para contar documentos. El objeto vacío `{}` significa "sin filtros" → cuenta todos los documentos de la colección.

2. **Funcionamiento**: MongoDB usa metadata del índice `_id` para contar sin leer los documentos completos. No transfiere datos, solo retorna el count.

3. **vs `estimatedDocumentCount()`**: `countDocuments()` es exacto pero más lento. `estimatedDocumentCount()` usa estadísticas de la colección (más rápido pero aproximado). Aquí se usa exacto para KPI preciso.

4. **Retorno**: Devuelve un `number` directamente, no un array. Mongoose ejecuta operación count nativa de MongoDB.

#### Qué Busca Esta Consulta

Cuenta **el número total de documentos** en la colección `users`. No aplica filtros, por lo que retorna el count completo de todos los voluntarios registrados en la plataforma.

```javascript
// Resultado
1247; // número total de usuarios
```

El dashboard muestra: **"1,247 Voluntarios Registrados"**

Vista en dashboard: `/admin` → Card "Total Voluntarios"

---

## **2. COMMUNITY REQUESTS - Solicitudes de Comunidades (2 consultas)**

### 2.1 Contar comunidades pendientes

#### Caso de Uso

Calcular el total de páginas para el paginador de la tabla de solicitudes de comunidades pendientes. Se usa en el componente de paginación para mostrar "Página 1 de 3".

#### Flujo de Ejecución

Controller `/community-requests` → `CommunityRequestsService.countPending()` → `RequestRepositoryMongoose.findPendingCommunityRequests()` → usa `countDocuments()` internamente

#### Query Generada por Mongoose

```javascript
requests.countDocuments({ status: "pending", type: "community" });
```

#### Código del Repositorio

```typescript
// request.repository-mongoose.ts (método findPendingCommunityRequests - parte del count)
const total = await this.requestModel.countDocuments({
  status: "pending",
  type: RequestType.COMMUNITY,
});

const totalPages = Math.ceil(total / limit);
```

#### Análisis de Conversión del ORM (Mongoose Count)

1. **`countDocuments({ status, type })`**: Cuenta documentos que cumplan ambas condiciones. A diferencia de `find()`, no transfiere documentos completos, solo retorna un número.

2. **Funcionamiento**: MongoDB ejecuta la operación de conteo. Solo retorna un número, no transfiere documentos.

3. **Cálculo de Paginación**: `totalPages = Math.ceil(total / limit)` calcula cuántas páginas se necesitan. Si hay 23 comunidades y limit=10, son 3 páginas.

#### Qué Busca Esta Consulta

Cuenta **cuántas solicitudes de comunidades están pendientes de aprobación** (`status: "pending"`, `type: "community"`). Retorna solo un número, no los documentos. Este número se usa para:

1. Mostrar "Total: 23 resultados"
2. Calcular paginación (23/10 = 3 páginas)
3. Deshabilitar botón "Siguiente" en última página

```javascript
// Resultado
23; // número de comunidades pendientes
```

Vista: `/community-requests` → Footer "Mostrando 1-10 de 23"

---

### 2.2 Comunidades pendientes con sus causas (paginado)

#### Caso de Uso

Listar todas las comunidades pendientes de aprobación con paginación, incluyendo todas las causas asociadas a cada comunidad. Los administradores pueden ver la solicitud completa antes de aprobar/rechazar.

#### Flujo de Ejecución

Controller `/community-requests` → `CommunityRequestsService.getPending(page, limit)` → `RequestRepositoryMongoose.findPendingCommunityRequests(page, limit)`

#### Query Generada por Mongoose

```javascript
requests.aggregate([
  { $match: { status: "pending", type: "community" } },
  {
    $lookup: {
      from: "requests",
      let: { communityId: "$_id" },
      pipeline: [
        {
          $match: {
            $expr: { $eq: ["$communityId", "$$communityId"] },
            type: "cause",
          },
        },
      ],
      as: "causes",
    },
  },
  { $skip: 0 },
  { $limit: 10 },
]);
```

#### Código del Repositorio

```typescript
// request.repository-mongoose.ts
async findPendingCommunityRequests(
  page: number,
  limit: number,
): Promise<Either<RepositoryException, PaginatedResult<CommunityRequest>>> {
  try {
    if (page < 1 || limit < 1) {
      return left(new RepositoryException('Page and limit must be greater than 0'));
    }

    const total = await this.requestModel.countDocuments({
      status: 'pending',
      type: RequestType.COMMUNITY,
    });

    const totalPages = Math.ceil(total / limit);
    const skip = (page - 1) * limit;

    const communityDocs = await this.requestModel
      .aggregate<CommunityRequestEntity & { causes: CauseRequestEntity[] }>([
        { $match: { status: 'pending', type: RequestType.COMMUNITY } },
        {
          $lookup: {
            from: this.requestModel.collection.name,
            let: { communityId: '$_id' },
            pipeline: [
              { $match: { $expr: { $eq: ['$communityId', '$$communityId'] }, type: RequestType.CAUSE } }
            ],
            as: 'causes',
          },
        },
        { $skip: skip },
        { $limit: limit },
      ])
      .exec();

    const requestsOrErrors = communityDocs.map(doc =>
      this.requestMapper.fromPersistenceAggregate(doc, doc.causes, []),
    );

    const requestsOrError = sequence(requestsOrErrors);
    if (requestsOrError.isLeft()) {
      return left(new RepositoryException('Failed to map requests.', requestsOrError.value));
    }

    const result: PaginatedResult<CommunityRequest> = {
      data: requestsOrError.value,
      total,
      page,
      limit,
      totalPages,
    };

    return right(result);
  } catch (error: unknown) {
    return left(new RepositoryException('Failed to find pending community requests.', error));
  }
}
```

#### Análisis de Conversión del ORM (Mongoose Aggregation Pipeline)

1. **`$match: { status: "pending", type: "community" }`**: Filtra solo comunidades pendientes. Se ejecuta primero para reducir documentos antes del $lookup.

2. **`$lookup` con pipeline avanzado**:

   - **`from: "requests"`**: Hace self-join en la misma colección (porque causas también están en `requests`).
   - **`let: { communityId: '$_id' }`**: Define variable para usar en el pipeline interno.
   - **`$expr: { $eq: ['$communityId', '$$communityId'] }`**: Compara `communityId` de la causa con `_id` de la comunidad. `$$` accede a variable del contexto externo.
   - **`type: RequestType.CAUSE`**: Solo trae documentos de tipo "cause".
   - **`as: "causes"`**: Guarda el array de causas en el campo `causes` de cada comunidad.

3. **`$skip: (page - 1) * limit`**: Salta documentos para la paginación. Página 1 → skip 0, Página 2 → skip 10.

4. **`$limit: limit`**: Retorna solo `limit` documentos (típicamente 10).

5. **Aggregate Type**: `<CommunityRequestEntity & { causes: CauseRequestEntity[] }>` - TypeScript sabe que el resultado incluye el array `causes`.

6. **Mapper**: `fromPersistenceAggregate(doc, doc.causes, [])` reconstruye el agregado raíz `CommunityRequest` con sus causas embebidas.

#### Qué Busca Esta Consulta

Busca **comunidades pendientes** y para cada una hace un JOIN con la misma colección para traer **todas sus causas asociadas** (independientemente del status de las causas). Retorna paginado (10 por página). Resultado ejemplo:

```javascript
{
  data: [
    {
      _id: "comm-uuid-1",
      type: "community",
      status: "pending",
      name: "Solidarios Madrid",
      causes: [
        { _id: "cause-uuid-1", communityId: "comm-uuid-1", type: "cause", status: "pending", name: "Ayuda alimentaria", ... },
        { _id: "cause-uuid-2", communityId: "comm-uuid-1", type: "cause", status: "pending", name: "Ropero social", ... }
      ],
      ...
    },
    // ... 9 comunidades más
  ],
  total: 23,
  page: 1,
  limit: 10,
  totalPages: 3
}
```

Vista: `/community-requests` → Tabla expandible con causas anidadas

---

## **3. CAUSE REQUESTS - Solicitudes de Causas (2 consultas)**

### 3.1 Contar causas pendientes

#### Caso de Uso

Calcular el total de causas pendientes para mostrar en el paginador. **Regla de negocio importante**: Solo se cuentan causas de comunidades ya aprobadas (no tiene sentido aprobar causas de comunidades rechazadas).

#### Flujo de Ejecución

Controller `/cause-requests` → `CauseRequestsService.countPending()` → `RequestRepositoryMongoose.findPendingCauseRequests()` → count pipeline

#### Query Generada por Mongoose

```javascript
requests.aggregate([
  { $match: { status: "approved", type: "community" } },
  {
    $lookup: {
      from: "requests",
      let: { communityId: "$_id" },
      pipeline: [
        {
          $match: {
            $expr: { $eq: ["$communityId", "$$communityId"] },
            status: "pending",
            type: "cause",
          },
        },
      ],
      as: "causes",
    },
  },
  { $unwind: "$causes" },
  { $group: { _id: null, count: { $sum: 1 } } },
]);
```

#### Código del Repositorio

```typescript
// request.repository-mongoose.ts (findPendingCauseRequests - fragmento del count)
const countPipeline = await this.requestModel
  .aggregate<{ count: number }>([
    { $match: { status: "approved", type: RequestType.COMMUNITY } },
    {
      $lookup: {
        from: this.requestModel.collection.name,
        let: { communityId: "$_id" },
        pipeline: [
          {
            $match: {
              $expr: { $eq: ["$communityId", "$$communityId"] },
              status: "pending",
              type: RequestType.CAUSE,
            },
          },
        ],
        as: "causes",
      },
    },
    { $unwind: "$causes" },
    { $group: { _id: null, count: { $sum: 1 } } },
  ])
  .exec();

const total = countPipeline.length > 0 ? countPipeline[0].count : 0;
```

#### Análisis de Conversión del ORM (Mongoose Aggregation Pipeline)

1. **`$match: { status: "approved", type: "community" }`**: Filtra **solo comunidades aprobadas** (regla de negocio). Reduce el dataset antes del $lookup.

2. **`$lookup` (self-join)**: Busca en `requests` las causas (`type: "cause"`) que pertenecen a cada comunidad aprobada (`$communityId === $$communityId`) y que están pendientes (`status: "pending"`).

3. **`$unwind: "$causes"`**: Descompone el array `causes`. Si una comunidad tiene 3 causas pendientes, genera 3 documentos temporales.

4. **`$group: { _id: null, count: { $sum: 1 } }`**: Agrupa TODOS los documentos (`_id: null`) y cuenta. Retorna un solo documento `{ _id: null, count: 15 }`.

5. **Extracción del count**: `countPipeline[0].count` extrae el número. Si el array está vacío (0 causas), retorna 0.

#### Qué Busca Esta Consulta

Cuenta **cuántas causas pendientes existen que pertenecen a comunidades ya aprobadas**. Es una consulta compleja porque aplica filtro jerárquico (comunidad aprobada → causa pendiente). Ejemplo:

```javascript
// Si hay:
// - Comunidad A (aprobada) con 3 causas pendientes
// - Comunidad B (aprobada) con 2 causas pendientes
// - Comunidad C (pendiente) con 5 causas pendientes  ← IGNORADA

// Resultado:
{ _id: null, count: 5 }  // 3 + 2 = 5 (la comunidad C no se cuenta)
```

Vista: `/cause-requests` → Footer "Total: 5 causas"

---

### 3.2 Causas pendientes (paginado)

#### Caso de Uso

Listar todas las causas pendientes que pertenecen a comunidades aprobadas, con paginación. Los administradores revisan y aprueban/rechazan cada causa individualmente.

#### Flujo de Ejecución

Controller `/cause-requests` → `CauseRequestsService.getPending(page, limit)` → `RequestRepositoryMongoose.findPendingCauseRequests(page, limit)`

#### Query Generada por Mongoose

```javascript
requests.aggregate([
  { $match: { status: "approved", type: "community" } },
  {
    $lookup: {
      from: "requests",
      let: { communityId: "$_id" },
      pipeline: [
        {
          $match: {
            $expr: { $eq: ["$communityId", "$$communityId"] },
            status: "pending",
            type: "cause",
          },
        },
      ],
      as: "causes",
    },
  },
  { $unwind: "$causes" },
  { $replaceRoot: { newRoot: "$causes" } },
  { $skip: 0 },
  { $limit: 10 },
]);
```

#### Código del Repositorio

```typescript
// request.repository-mongoose.ts
async findPendingCauseRequests(
  page: number,
  limit: number,
): Promise<Either<RepositoryException, PaginatedResult<CauseRequest>>> {
  try {
    // ... validaciones y count (ver 3.1)

    const causeDocs = await this.requestModel
      .aggregate<CauseRequestEntity>([
        { $match: { status: 'approved', type: RequestType.COMMUNITY } },
        {
          $lookup: {
            from: this.requestModel.collection.name,
            let: { communityId: '$_id' },
            pipeline: [
              {
                $match: {
                  $expr: { $eq: ['$communityId', '$$communityId'] },
                  status: 'pending',
                  type: RequestType.CAUSE,
                },
              },
            ],
            as: 'causes',
          },
        },
        { $unwind: '$causes' },
        { $replaceRoot: { newRoot: '$causes' } },
        { $skip: skip },
        { $limit: limit },
      ])
      .exec();

    const requestsOrErrors = causeDocs.map(doc => this.requestMapper.fromPersistenceCauseAggregate(doc, []));

    const requestsOrError = sequence(requestsOrErrors);
    if (requestsOrError.isLeft()) {
      return left(new RepositoryException('Failed to map cause requests.', requestsOrError.value));
    }

    const result: PaginatedResult<CauseRequest> = {
      data: requestsOrError.value,
      total,
      page,
      limit,
      totalPages,
    };

    return right(result);
  } catch (error: unknown) {
    return left(new RepositoryException('Failed to find pending cause requests.', error));
  }
}
```

#### Análisis de Conversión del ORM (Mongoose Aggregation Pipeline)

1-3. **`$match`, `$lookup`, `$unwind`**: Igual que la consulta 3.1. Trae causas pendientes de comunidades aprobadas.

4. **`$replaceRoot: { newRoot: "$causes" }`**: Operación crítica. Reemplaza el documento raíz (que era la comunidad) por el subdocumento `causes`. Ahora cada documento en el pipeline es una causa, no una comunidad.

   **Antes del replaceRoot**:

   ```javascript
   { _id: "comm1", name: "Comunidad A", causes: { _id: "cause1", name: "Causa X", ... } }
   ```

   **Después del replaceRoot**:

   ```javascript
   { _id: "cause1", name: "Causa X", communityId: "comm1", ... }
   ```

5. **`$skip` y `$limit`**: Paginación estándar sobre las causas (ya no sobre comunidades).

6. **Mapper**: `fromPersistenceCauseAggregate(doc, [])` reconstruye `CauseRequest` sin acciones anidadas (por eso el array vacío `[]`).

#### Qué Busca Esta Consulta

Busca **causas pendientes de comunidades aprobadas** y las retorna "aplanadas" (sin la comunidad padre). Paginado en 10 causas por página. Resultado ejemplo:

```javascript
{
  data: [
    { _id: "cause1", type: "cause", status: "pending", communityId: "comm-A",
      name: "Reforestación Urbana", ods: [13, 15], ... },
    { _id: "cause2", type: "cause", status: "pending", communityId: "comm-A",
      name: "Huertos escolares", ods: [2, 11], ... },
    { _id: "cause3", type: "cause", status: "pending", communityId: "comm-B",
      name: "Limpieza de ríos", ods: [6, 14], ... },
    // ... 7 causas más
  ],
  total: 45,
  page: 1,
  limit: 10,
  totalPages: 5
}
```

Vista: `/cause-requests` → Tabla de causas pendientes

---

## **4. ACTION REQUESTS - Solicitudes de Acciones (2 consultas)**

### 4.1 Contar acciones pendientes

#### Caso de Uso

Calcular el total de acciones pendientes para la paginación. **Regla de negocio**: Solo se cuentan acciones de causas aprobadas (jerarquía: comunidad aprobada → causa aprobada → acción pendiente).

#### Flujo de Ejecución

Controller `/action-requests` → `ActionRequestsService.countPending()` → `RequestRepositoryMongoose.findPendingActionRequests()` → count pipeline

#### Query Generada por Mongoose

```javascript
requests.aggregate([
  { $match: { status: "approved", type: "cause" } },
  {
    $lookup: {
      from: "requests",
      let: { causeId: "$_id" },
      pipeline: [
        {
          $match: {
            $expr: { $eq: ["$causeId", "$$causeId"] },
            status: "pending",
            type: "action",
          },
        },
      ],
      as: "actions",
    },
  },
  { $unwind: "$actions" },
  { $group: { _id: null, count: { $sum: 1 } } },
]);
```

#### Código del Repositorio

```typescript
// request.repository-mongoose.ts (findPendingActionRequests - fragmento del count)
const countPipeline = await this.requestModel
  .aggregate<{ count: number }>([
    { $match: { status: "approved", type: RequestType.CAUSE } },
    {
      $lookup: {
        from: this.requestModel.collection.name,
        let: { causeId: "$_id" },
        pipeline: [
          {
            $match: {
              $expr: { $eq: ["$causeId", "$$causeId"] },
              status: "pending",
              type: RequestType.ACTION,
            },
          },
        ],
        as: "actions",
      },
    },
    { $unwind: "$actions" },
    { $group: { _id: null, count: { $sum: 1 } } },
  ])
  .exec();

const total = countPipeline.length > 0 ? countPipeline[0].count : 0;
```

#### Análisis de Conversión del ORM

**Estructura idéntica a la consulta 3.1** pero en el siguiente nivel jerárquico:

- **3.1**: Comunidades aprobadas → causas pendientes
- **4.1**: Causas aprobadas → acciones pendientes

1. **`$match: { status: "approved", type: "cause" }`**: Filtra solo causas aprobadas.
2. **`$lookup`**: Self-join para traer acciones (`type: "action"`) pendientes (`status: "pending"`) de cada causa aprobada (`$causeId === $$causeId`).
3. **`$unwind: "$actions"`**: Descompone array de acciones.
4. **`$group: { _id: null, count: { $sum: 1 } }`**: Cuenta todas las acciones.

#### Qué Busca Esta Consulta

Cuenta **acciones pendientes de causas aprobadas**. Ejemplo:

```javascript
// Si hay:
// - Causa X (aprobada) con 4 acciones pendientes
// - Causa Y (aprobada) con 2 acciones pendientes
// - Causa Z (pendiente) con 10 acciones pendientes ← IGNORADA

// Resultado:
{ _id: null, count: 6 }  // 4 + 2 = 6
```

Vista: `/action-requests` → Footer "Total: 6 acciones"

---

### 4.2 Acciones pendientes (paginado)

#### Caso de Uso

Listar todas las acciones pendientes de causas aprobadas con paginación. Las acciones son proyectos concretos con fechas, ubicación y objetivos cuantificables.

#### Flujo de Ejecución

Controller `/action-requests` → `ActionRequestsService.getPending(page, limit)` → `RequestRepositoryMongoose.findPendingActionRequests(page, limit)`

#### Query Generada por Mongoose

```javascript
requests.aggregate([
  { $match: { status: "approved", type: "cause" } },
  {
    $lookup: {
      from: "requests",
      let: { causeId: "$_id" },
      pipeline: [
        {
          $match: {
            $expr: { $eq: ["$causeId", "$$causeId"] },
            status: "pending",
            type: "action",
          },
        },
      ],
      as: "actions",
    },
  },
  { $unwind: "$actions" },
  { $replaceRoot: { newRoot: "$actions" } },
  { $skip: 0 },
  { $limit: 10 },
]);
```

#### Código del Repositorio

```typescript
// request.repository-mongoose.ts
async findPendingActionRequests(
  page: number,
  limit: number,
): Promise<Either<RepositoryException, PaginatedResult<ActionRequest>>> {
  try {
    // ... validaciones y count (ver 4.1)

    const actionDocs = await this.requestModel
      .aggregate<ActionRequestEntity>([
        { $match: { status: 'approved', type: RequestType.CAUSE } },
        {
          $lookup: {
            from: this.requestModel.collection.name,
            let: { causeId: '$_id' },
            pipeline: [
              {
                $match: {
                  $expr: { $eq: ['$causeId', '$$causeId'] },
                  status: 'pending',
                  type: RequestType.ACTION,
                },
              },
            ],
            as: 'actions',
          },
        },
        { $unwind: '$actions' },
        { $replaceRoot: { newRoot: '$actions' } },
        { $skip: skip },
        { $limit: limit },
      ])
      .exec();

    const requestsOrErrors = actionDocs.map(
      doc => this.requestMapper.fromPersistence(doc) as Either<RepositoryException, ActionRequest>,
    );

    const requestsOrError = sequence(requestsOrErrors);
    if (requestsOrError.isLeft()) {
      return left(new RepositoryException('Failed to map action requests.', requestsOrError.value));
    }

    const result: PaginatedResult<ActionRequest> = {
      data: requestsOrError.value,
      total,
      page,
      limit,
      totalPages,
    };

    return right(result);
  } catch (error: unknown) {
    return left(new RepositoryException('Failed to find pending action requests.', error));
  }
}
```

#### Análisis de Conversión del ORM

**Estructura idéntica a la consulta 3.2**, cambiando el nivel jerárquico:

1. **`$match`, `$lookup`, `$unwind`**: Trae acciones pendientes de causas aprobadas.
2. **`$replaceRoot: { newRoot: "$actions" }`**: Aplana el documento, reemplazando la causa por la acción.
3. **`$skip` y `$limit`**: Paginación sobre acciones.
4. **Mapper**: `fromPersistence(doc)` convierte `ActionRequestEntity` a `ActionRequest`.

#### Qué Busca Esta Consulta

Busca **acciones pendientes de causas aprobadas**, aplanadas y paginadas. Resultado ejemplo:

```javascript
{
  data: [
    { _id: "action1", type: "action", status: "pending", causeId: "cause-X",
      name: "Plantación 500 árboles - Marzo 2026", startDate: "2026-03-15",
      location: { city: "Madrid", coordinates: [40.4168, -3.7038] }, ... },
    { _id: "action2", type: "action", status: "pending", causeId: "cause-X",
      name: "Taller educativo escuelas", startDate: "2026-04-10", ... },
    // ... 8 acciones más
  ],
  total: 34,
  page: 1,
  limit: 10,
  totalPages: 4
}
```

Vista: `/action-requests` → Tabla de acciones con detalles expandibles

---

## **5. REPORTS - Listado de Usuarios (2 consultas)**

### 5.1 Contar total de usuarios

#### Caso de Uso

Calcular el número total de páginas para el paginador del reporte de usuarios. Es la misma consulta que 1.6 pero usada en un contexto diferente (reporte vs dashboard KPI).

#### Flujo de Ejecución

Controller `/reports` → `ReportsService.getUsersPaginated(page, limit)` → `UserRepositoryMongoose.findPaginated()` → internamente usa `countAll()`

#### Query Generada por Mongoose

```javascript
users.countDocuments({});
```

#### Código del Repositorio

Ver código completo en sección 1.6. El mismo método `countAll()` se reutiliza.

#### Análisis de Conversión del ORM

Idéntico a consulta 1.6. `countDocuments({})` sin filtros cuenta todos los documentos de la colección `users`.

#### Qué Busca Esta Consulta

Cuenta el total de usuarios para calcular paginación del reporte. Si hay 1247 usuarios y limit=6, necesita 208 páginas.

Vista: `/reports` → Footer "Página 1 de 208"

---

### 5.2 Usuarios paginados

#### Caso de Uso

Listar todos los usuarios registrados con paginación en el reporte administrativo. Muestra información básica de cada voluntario (nombre, email, ubicación, fecha de registro).

#### Flujo de Ejecución

Controller `/reports` → `ReportsService.getUsersPaginated(page, limit)` → `UserRepositoryMongoose.findPaginated(page, limit)`

#### Query Generada por Mongoose

```javascript
users.find({}, { skip: 0, limit: 6 });
```

#### Código del Repositorio

```typescript
// user.repository-mongoose.ts
async findPaginated(page: number, limit: number): Promise<Either<RepositoryException, PaginatedResult<User>>> {
  try {
    if (page < 1 || limit < 1) {
      return left(new RepositoryException('Page and limit must be greater than 0'));
    }

    const total = await this.countAll();
    if (total.isLeft()) {
      return left(total.value);
    }

    const totalPages = Math.ceil(total.value / limit);
    const skip = (page - 1) * limit;

    const users = await this.userModel
      .find({})
      .skip(skip)
      .limit(limit)
      .lean()
      .exec();

    const usersOrErrors = users.map(user => this.userMapper.fromPersistence(user));
    const usersOrError = sequence(usersOrErrors);

    if (usersOrError.isLeft()) {
      return left(new RepositoryException('Failed to map users from persistence', usersOrError.value));
    }

    return right({
      data: usersOrError.value,
      total: total.value,
      page,
      limit,
      totalPages,
    });
  } catch (error) {
    return left(new RepositoryException('Failed to find paginated users.', error));
  }
}
```

#### Análisis de Conversión del ORM (Mongoose Query)

1. **`find({})`**: Query sin filtros. Mongoose retorna todos los usuarios. `{}` significa "sin condiciones WHERE".

2. **`.skip((page - 1) * limit)`**: Salta documentos para implementar paginación. Si page=3 y limit=6, skip=12 (salta las primeras 12 registros).

3. **`.limit(limit)`**: Limita el número de resultados retornados. Solo trae `limit` documentos (típicamente 6).

4. **`.lean()`**: Retorna POJOs en lugar de documentos Mongoose completos.

5. **`.exec()`**: Ejecuta la query y retorna Promise.

6. **Cálculo de skip**: `skip = (page - 1) * limit`

   - Página 1: skip 0 (documentos 1-6)
   - Página 2: skip 6 (documentos 7-12)
   - Página 3: skip 12 (documentos 13-18)

7. **Mapper**: `userMapper.fromPersistence()` convierte cada `UserEntity` a dominio `User`.

#### Qué Busca Esta Consulta

Busca **todos los usuarios** sin filtros, pero con paginación. Retorna solo un subconjunto (6 usuarios por página). Resultado ejemplo:

```javascript
{
  data: [
    { _id: "user1", fullName: "María González", email: "maria@email.com",
      location: { city: "Madrid", countryCode: "ES" }, createdAt: "2025-01-05", ... },
    { _id: "user2", fullName: "Juan Pérez", email: "juan@email.com",
      location: { city: "Barcelona", countryCode: "ES" }, createdAt: "2025-01-04", ... },
    // ... 4 usuarios más
  ],
  total: 1247,
  page: 1,
  limit: 6,
  totalPages: 208
}
```

Vista: `/reports` → Tabla de voluntarios con búsqueda/filtros

---

## **6. API REPORTS - Detalle de Usuario (1 consulta)**

### 6.1 Buscar usuario por ID

#### Caso de Uso

Obtener todos los detalles de un usuario específico cuando el administrador hace clic en "Ver Detalle" en el reporte. Muestra información completa: perfil, historial de participación, skills, etc.

#### Flujo de Ejecución

Controller `GET /api/reports/:userId` → `ReportsService.getUserById(userId)` → `UserRepositoryMongoose.findById(userId)`

#### Query Generada por Mongoose

```javascript
users.findOne({ _id: "550e8400-e29b-41d4-a716-446655440001" });
```

#### Código del Repositorio

```typescript
// user.repository-mongoose.ts (heredado de RepositoryMongoose base)
async findById(id: string): Promise<Either<RepositoryException, User>> {
  try {
    const document = await this.userModel.findOne({ _id: id }).lean().exec();

    if (!document) {
      return left(new EntityNotFoundException(`User with id ${id} not found`, id));
    }

    return this.userMapper.fromPersistence(document);
  } catch (error) {
    return left(new RepositoryException('Failed to find user by id.', error));
  }
}
```

#### Análisis de Conversión del ORM (Mongoose Query)

1. **`findOne({ _id: id })`**: Busca un único documento por su `_id`. Mongoose usa el índice único en `_id` (siempre existe por defecto en MongoDB).

2. **Query Optimization**: MongoDB ejecuta un **index scan** directamente en el índice `_id`, que es un B-tree. Complejidad O(log n), extremadamente rápido incluso con millones de documentos.

3. **`.lean()`**: Retorna POJO. Aunque es un solo documento, sigue siendo importante para reducir overhead si se usa en endpoints de alta frecuencia.

4. **`.exec()`**: Ejecuta y retorna Promise.

5. **Manejo de Not Found**: Si no encuentra el documento, `findOne()` retorna `null`. El repositorio convierte esto en `EntityNotFoundException` (domain exception).

6. **Type Safety**: Mongoose infiere que el resultado es `UserDocument | null`, luego el mapper lo convierte a `Either<RepositoryException, User>`.

#### Qué Busca Esta Consulta

Busca **un usuario específico por su ID único** (\_id). Retorna el documento completo con toda la información del perfil. Ejemplo:

```javascript
{
  _id: "550e8400-e29b-41d4-a716-446655440001",
  fullName: "María González Ruiz",
  email: "maria@email.com",
  mobilePhone: "+34612345678",
  location: {
    city: "Madrid",
    countryCode: "ES",
    coordinates: [40.4168, -3.7038]
  },
  skills: ["Educación", "Logística", "Comunicación"],
  biography: "Profesora jubilada con experiencia en...",
  createdAt: "2025-01-05T10:30:00Z",
  volunteerHistory: [
    { causeId: "cause1", hours: 45, rating: 5 },
    { causeId: "cause3", hours: 30, rating: 4 }
  ],
  ...
}
```

Vista: `/api/reports/:userId` → Modal "Detalle de Voluntario"

---

## **7. AUTH - Autenticación (1 consulta)**

### 7.1 Login - Buscar administrador por email

#### Caso de Uso

Validar las credenciales de login de un administrador. Busca el documento del administrador por email para comparar el password hasheado (bcrypt).

#### Flujo de Ejecución

Controller `POST /auth/login` → `AuthService.validateCredentials(email, password)` → `AdministratorRepository.findByEmail(email)` → comparar password con bcrypt

#### Query Generada por Mongoose

```javascript
administrators.findOne({ email: "info@cafecutillas88.com" });
```

#### Código del Repositorio

```typescript
// administrator.repository.ts
async findByEmail(email: string): Promise<Either<RepositoryException, Administrator>> {
  try {
    const document = await this.administratorModel.findOne({ email });

    if (!document) {
      return left(new EntityNotFoundException(`Administrator with email ${email} not found`, email));
    }

    return this.administratorEntityMapper.fromPersistence(document);
  } catch (error) {
    return left(new RepositoryException('Failed to find administrator by email.', error));
  }
}
```

#### Análisis de Conversión del ORM (Mongoose Query)

1. **`findOne({ email })`**: Busca un administrador por email. Similar a `findById`, pero por un campo diferente.

2. **Sin `.lean()`**: En este caso no usa `.lean()` porque el método retorna el documento sin optimizaciones adicionales.

3. **Security**: El password hasheado se retorna en el documento. El servicio luego usa `bcrypt.compare(plainPassword, document.password)` para validar.

4. **Not Found**: Si el email no existe, retorna `EntityNotFoundException`. El controller traduce esto a 401 Unauthorized.

#### Qué Busca Esta Consulta

Busca **un administrador por su email** para autenticación. Retorna el documento completo incluyendo password hasheado. Ejemplo:

```javascript
{
  _id: "c337c0e7-a5ce-483d-a74e-be95f58d60fd",
  fullname: "Sergio Ros Liarte",
  email: "info@cafecutillas88.com",
  phone: "+34608398684",
  password: "$2b$10$vUrVrsLVO2OduYj7UGr/KOJDVWQewpXroONStmeCpgGjPwiwWaXzi",
  __v: 0
}
```
