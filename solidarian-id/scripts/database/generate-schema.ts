import { writeFileSync } from 'node:fs';
import { DB_CONFIG, OUTPUT_PATHS } from './config';
import {
  createSqlHeader,
  ensureDirectory,
  execDockerCommand,
  formatFileSize,
  getFileSize,
  logger,
  validateDockerEnvironment,
} from './utils';

function exportSchemaForDatabase(databaseName: string, outputPath: string, label: string): string {
  logger.info(`Exporting ${label} schema (${databaseName})...`);

  const command = [
    'docker exec',
    DB_CONFIG.postgres.container,
    'pg_dump',
    `-U ${DB_CONFIG.postgres.user}`,
    `-d ${databaseName}`,
    '--schema-only',
    '--no-owner',
    '--no-privileges',
    '--no-tablespaces',
    '--no-comments',
  ].join(' ');

  const dumpOutput = execDockerCommand(command, { silent: true });
  const finalSQL = createSqlHeader(`PostgreSQL ${label} Schema`) + dumpOutput;

  writeFileSync(outputPath, finalSQL);

  const fileSize = getFileSize(outputPath);
  logger.success(`${label} schema saved to: ${outputPath}`);
  logger.info(`File size: ${formatFileSize(fileSize)}`);

  return dumpOutput.trim();
}

function buildCombinedSchema(usersSchema: string, communitiesSchema: string): string {
  return [
    createSqlHeader('PostgreSQL Database Schema').trimEnd(),
    '',
    String.raw`\set ON_ERROR_STOP on`,
    '',
    String.raw`\set users_db \`printenv POSTGRES_USERS_DB | tr -d '\n'\``,
    String.raw`\set microservices_db \`printenv POSTGRES_COMMUNITIES_DB | tr -d '\n'\``,
    '',
    '-- Users domain schema goes to the users database.',
    String.raw`\connect :users_db`,
    '',
    usersSchema,
    '',
    '-- Microservices schema goes to the communities/microservices database.',
    String.raw`\connect :microservices_db`,
    '',
    communitiesSchema,
    '',
  ].join('\n');
}

function generateSchema(): void {
  logger.step(1, 'PostgreSQL Schema');

  // Validate environment
  validateDockerEnvironment([DB_CONFIG.postgres.container]);

  // Ensure output directory exists
  ensureDirectory(OUTPUT_PATHS.postgres.dir);

  try {
    const usersSchema = exportSchemaForDatabase(
      DB_CONFIG.postgres.usersDatabase,
      OUTPUT_PATHS.postgres.schemaUsers,
      'Users Database',
    );

    const communitiesSchema = exportSchemaForDatabase(
      DB_CONFIG.postgres.communitiesDatabase,
      OUTPUT_PATHS.postgres.schemaCommunities,
      'Communities Database',
    );

    const finalSQL = buildCombinedSchema(usersSchema, communitiesSchema);

    writeFileSync(OUTPUT_PATHS.postgres.schema, finalSQL);

    const fileSize = getFileSize(OUTPUT_PATHS.postgres.schema);
    logger.success(`Combined schema saved to: ${OUTPUT_PATHS.postgres.schema}`);
    logger.info(`File size: ${formatFileSize(fileSize)}`);
  } catch (error) {
    logger.error(`Failed to generate schema: ${(error as Error).message}`);
    logger.info('Make sure Docker container is running: docker-compose up -d');
    process.exit(1);
  }
}

export default generateSchema;

if (require.main === module) {
  generateSchema();
}
