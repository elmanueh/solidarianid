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

function generateSchema(): void {
  logger.step(1, 'PostgreSQL Schema');

  // Validate environment
  validateDockerEnvironment([DB_CONFIG.postgres.container]);

  // Ensure output directory exists
  ensureDirectory(OUTPUT_PATHS.postgres.dir);

  try {
    logger.info('Exporting schema...');

    const command = [
      'docker exec',
      DB_CONFIG.postgres.container,
      'pg_dump',
      `-U ${DB_CONFIG.postgres.user}`,
      `-d ${DB_CONFIG.postgres.database}`,
      '--schema-only',
      '--no-owner',
      '--no-privileges',
      '--no-tablespaces',
      '--no-comments',
    ].join(' ');

    const output = execDockerCommand(command, { silent: true });

    // Create final SQL with header
    const finalSQL = createSqlHeader('PostgreSQL Database Schema') + output;

    writeFileSync(OUTPUT_PATHS.postgres.schema, finalSQL);

    const fileSize = getFileSize(OUTPUT_PATHS.postgres.schema);
    logger.success(`Schema saved to: ${OUTPUT_PATHS.postgres.schema}`);
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
