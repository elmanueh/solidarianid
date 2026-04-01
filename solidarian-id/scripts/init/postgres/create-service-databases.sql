\set ON_ERROR_STOP on

\set users_db `printenv POSTGRES_USERS_DB | tr -d '\n'`
\set communities_db `printenv POSTGRES_COMMUNITIES_DB | tr -d '\n'`

-- Ensure users database exists.
SELECT format('CREATE DATABASE %I', :'users_db')
WHERE NOT EXISTS (
  SELECT 1 FROM pg_database WHERE datname = :'users_db'
)\gexec

-- Ensure communities database exists.
SELECT format('CREATE DATABASE %I', :'communities_db')
WHERE NOT EXISTS (
  SELECT 1 FROM pg_database WHERE datname = :'communities_db'
)\gexec
