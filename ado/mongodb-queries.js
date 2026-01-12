// Conectar a la base de datos
const conn = new Mongo(
  "mongodb://ado_user2:ado_user2_password@localhost:27017/solidarianid?authSource=admin"
);
const db = conn.getDB("solidarianid");

// Parámetros de ejemplo
const PARAMS = {
  // Paginación
  PAGE: 1,
  LIMIT_COMMUNITIES: 10,
  LIMIT_CAUSES: 10,
  LIMIT_ACTIONS: 10,
  LIMIT_USERS: 6,

  // IDs de ejemplo (reemplazar con IDs reales de tu base de datos)
  USER_ID: "a1acf9c7-4b92-4bdc-bae9-4473662ab63e",
  ADMIN_EMAIL: "sergio.garcia@solidarianid.org",
};

// 1.1 Causas agrupadas por ODS
let causesGroupedByOds = db.requests
  .aggregate([
    { $match: { $and: [{ type: "cause" }, { status: "approved" }] } },
    { $unwind: "$ods" },
    { $group: { _id: "$ods", causeCount: { $sum: 1 } } },
    { $project: { _id: 0, ods: "$_id", causeCount: 1 } },
    { $sort: { ods: 1 } },
  ])
  .toArray();
printjson(causesGroupedByOds);

// 1.2 Usuarios agrupados por país (Top 6)
let usersGroupedByCountry = db.users
  .aggregate([
    { $group: { _id: "$location.countryCode", userCount: { $sum: 1 } } },
    { $sort: { userCount: -1 } },
    { $project: { _id: 0, country: "$_id", userCount: 1 } },
    { $limit: 6 },
  ])
  .toArray();
printjson(usersGroupedByCountry);

// 1.3 Comunidades aprobadas
let approvedCommunities = db.requests
  .find({ status: "approved", type: "community" })
  .toArray();
print("Total comunidades aprobadas: " + approvedCommunities.length);

// 1.4 Causas aprobadas
let approvedCauses = db.requests
  .find({ status: "approved", type: "cause" })
  .toArray();
print("Total causas aprobadas: " + approvedCauses.length);

// 1.5 Acciones aprobadas
let approvedActions = db.requests
  .find({ status: "approved", type: "action" })
  .toArray();
print("Total acciones aprobadas: " + approvedActions.length);

// 1.6 Total de usuarios registrados
let totalUsers = db.users.countDocuments({});
print("Total usuarios registrados: " + totalUsers);

// 2.1 Contar comunidades pendientes
let pendingCommunitiesCount = db.requests.countDocuments({
  status: "pending",
  type: "community",
});
print("Total comunidades pendientes: " + pendingCommunitiesCount);

// 2.2 Comunidades pendientes con sus causas (paginado)
let pendingCommunitiesPage = db.requests
  .aggregate([
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
    { $skip: (PARAMS.PAGE - 1) * PARAMS.LIMIT_COMMUNITIES },
    { $limit: PARAMS.LIMIT_COMMUNITIES },
  ])
  .toArray();
printjson(pendingCommunitiesPage);

// 3.1 Contar causas pendientes
let pendingCausesCount = db.requests
  .aggregate([
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
  ])
  .toArray();
printjson(pendingCausesCount);

// 3.2 Causas pendientes (paginado)
let pendingCausesPage = db.requests
  .aggregate([
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
    { $skip: (PARAMS.PAGE - 1) * PARAMS.LIMIT_CAUSES },
    { $limit: PARAMS.LIMIT_CAUSES },
  ])
  .toArray();
printjson(pendingCausesPage);

// 4.1 Contar acciones pendientes
let pendingActionsCount = db.requests
  .aggregate([
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
  ])
  .toArray();
printjson(pendingActionsCount);

// 4.2 Acciones pendientes (paginado)
let pendingActionsPage = db.requests
  .aggregate([
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
    { $skip: (PARAMS.PAGE - 1) * PARAMS.LIMIT_ACTIONS },
    { $limit: PARAMS.LIMIT_ACTIONS },
  ])
  .toArray();
printjson(pendingActionsPage);

// 5.1 Contar total de usuarios
let totalUsersForReport = db.users.countDocuments({});
print("Total usuarios: " + totalUsersForReport);

// 5.2 Usuarios paginados
let usersPaginated = db.users
  .find({})
  .skip((PARAMS.PAGE - 1) * PARAMS.LIMIT_USERS)
  .limit(PARAMS.LIMIT_USERS)
  .toArray();
printjson(usersPaginated);

// 6.1 Buscar usuario por ID

let userDetail = db.users.findOne({ _id: PARAMS.USER_ID });
if (userDetail) {
  printjson(userDetail);
} else {
  print("Usuario no encontrado (ID de ejemplo). Reemplazar con un ID real.");
}

// 7.1 Login - Buscar administrador por email
let adminForLogin = db.administrators.findOne({ email: PARAMS.ADMIN_EMAIL });
if (adminForLogin) {
  printjson(adminForLogin);
} else {
  print(
    "Administrador no encontrado (email de ejemplo). Reemplazar con un email real."
  );
}
