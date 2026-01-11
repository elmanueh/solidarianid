-- Consultas PostgreSQL - Communities & Users
-- Base de datos: solidarian_id_db

-- Parámetros de ejemplo
\set community_id '\'2b7ad378-7e59-4baf-9e4d-b286db16762a\''
\set cause_id '\'3cb13e37-308f-4fd5-80a1-ec31a58a0b4b\''
\set user_id '\'d89858db-23ca-4df2-b5d3-b1c5f2eb4683\''

\set username_example '\'testuser\''
\set mobile_phone_example '\'+34123456789\''
\set ranking_limit 10
\set months_limit 12

-- 1. COMMUNITIES

-- 1.1 Listar comunidades con miembros

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

-- 1.2 Comunidad por ID con causas y miembros
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

-- 1.3 Ranking de comunidades por usuarios
SELECT 
  c.id AS "communityId", 
  c.name AS "communityName", 
  COUNT(cm."userId")::int AS "userCount"
FROM community c
INNER JOIN community_user cm ON cm."communityId" = c.id
GROUP BY c.id
ORDER BY COUNT(cm."userId")::int DESC
LIMIT :ranking_limit;

-- 2. CAUSES

-- 2.1 Listar causas
SELECT 
  id AS cause_id, 
  name AS cause_name, 
  description AS cause_description, 
  "initialDate" AS initial_date, 
  "durationDays" AS duration_days, 
  ods AS sustainable_development_goals, 
  "communityId" AS community_id
FROM cause
ORDER BY id;

-- 2.2 Causas por comunidad
SELECT 
  id AS cause_id, 
  name AS cause_name, 
  description AS cause_description, 
  "initialDate" AS initial_date, 
  "durationDays" AS duration_days, 
  ods AS sustainable_development_goals, 
  "communityId" AS community_id
FROM cause
WHERE "communityId" = :community_id
ORDER BY id;

-- 2.3 Causa por ID con acciones
SELECT 
  ca.id AS cause_id, 
  ca.name AS cause_name, 
  ca.description AS cause_description, 
  ca."initialDate" AS initial_date, 
  ca."durationDays" AS duration_days, 
  ca.ods AS sustainable_development_goals, 
  ca."communityId" AS community_id,
  a.id AS action_id,
  a.name AS action_name,
  a.description AS action_description
FROM cause ca
LEFT JOIN action a ON a."causeId" = ca.id
WHERE ca.id = :cause_id
ORDER BY a.id;

-- 2.4 Causa por comunidad y causa ID con acciones
SELECT 
  ca.id AS cause_id, 
  ca.name AS cause_name, 
  ca.description AS cause_description, 
  ca."initialDate" AS initial_date, 
  ca."durationDays" AS duration_days, 
  ca.ods AS sustainable_development_goals, 
  ca."communityId" AS community_id,
  a.id AS action_id,
  a.name AS action_name,
  a.description AS action_description
FROM cause ca
LEFT JOIN action a ON a."causeId" = ca.id
WHERE ca.id = :cause_id AND ca."communityId" = :community_id
ORDER BY a.id;

-- 3. ACTIONS

-- 3.1 Listar acciones
SELECT 
  id AS action_id, 
  name AS action_name, 
  description AS action_description, 
  "causeId" AS cause_id
FROM action
ORDER BY id;

-- 4. TIME SERIES

-- 4.1 Usuarios unidos por mes
SELECT 
  c.name AS "communityName", 
  to_char(date_trunc('month', cm."joinedAt"), 'YYYY-MM') AS "month", 
  COUNT(*)::int AS "userCount"
FROM community c
LEFT JOIN community_user cm ON cm."communityId" = c.id
WHERE cm."communityId" = :community_id
GROUP BY to_char(date_trunc('month', cm."joinedAt"), 'YYYY-MM'), c.name
ORDER BY to_char(date_trunc('month', cm."joinedAt"), 'YYYY-MM') DESC
LIMIT :months_limit;

-- 5. USERS

-- 5.1 Usuario por ID
SELECT 
  "UserEntity"."Id" AS "UserEntity_Id", 
  "UserEntity"."FullName" AS "UserEntity_FullName", 
  "UserEntity"."MobilePhone" AS "UserEntity_MobilePhone", 
  "UserEntity"."Username" AS "UserEntity_Username", 
  "UserEntity"."PasswordHash" AS "UserEntity_PasswordHash", 
  "UserEntity"."City" AS "UserEntity_City", 
  "UserEntity"."CountryCode" AS "UserEntity_CountryCode" 
FROM "tbl_Usuarios" "UserEntity" 
WHERE "UserEntity"."Id" IN (:user_id);

-- 5.2 Verificar móvil existente
SELECT COUNT(1) AS "cnt" 
FROM "tbl_Usuarios" "UserEntity" 
WHERE (("UserEntity"."MobilePhone" = :mobile_phone_example));

-- 5.3 Verificar username existente
SELECT COUNT(1) AS "cnt" 
FROM "tbl_Usuarios" "UserEntity" 
WHERE (("UserEntity"."Username" = :username_example));

-- 5.4 Usuario por username (login)
SELECT 
  "UserEntity"."Id" AS "UserEntity_Id", 
  "UserEntity"."FullName" AS "UserEntity_FullName", 
  "UserEntity"."MobilePhone" AS "UserEntity_MobilePhone", 
  "UserEntity"."Username" AS "UserEntity_Username", 
  "UserEntity"."PasswordHash" AS "UserEntity_PasswordHash", 
  "UserEntity"."City" AS "UserEntity_City", 
  "UserEntity"."CountryCode" AS "UserEntity_CountryCode" 
FROM "tbl_Usuarios" "UserEntity" 
WHERE "UserEntity"."Username" = :username_example;