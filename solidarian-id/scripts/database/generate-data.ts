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

interface TableStats {
  table: string;
  rows: number;
}

function getTableStats(): TableStats[] {
  try {
    const command = [
      'docker exec',
      DB_CONFIG.postgres.container,
      'psql',
      `-U ${DB_CONFIG.postgres.user}`,
      `-d ${DB_CONFIG.postgres.database}`,
      '-t',
      '-c',
      `"SELECT relname, n_live_tup FROM pg_stat_user_tables WHERE n_live_tup > 0 ORDER BY n_live_tup DESC"`,
    ].join(' ');

    const output = execDockerCommand(command, { silent: true });

    return output
      .trim()
      .split('\n')
      .map(line => {
        const [table, rows] = line.split('|').map(s => s?.trim());
        return { table, rows: Number.parseInt(rows) || 0 };
      })
      .filter(stat => stat.table && stat.rows > 0);
  } catch {
    return [];
  }
}

function generateData(): void {
  logger.step(2, 'PostgreSQL Data');

  // Validate environment
  validateDockerEnvironment([DB_CONFIG.postgres.container]);

  // Ensure output directory exists
  ensureDirectory(OUTPUT_PATHS.postgres.dir);

  try {
    logger.info('Exporting data...');

    const command = [
      'docker exec',
      DB_CONFIG.postgres.container,
      'pg_dump',
      `-U ${DB_CONFIG.postgres.user}`,
      `-d ${DB_CONFIG.postgres.database}`,
      '--data-only',
      '--inserts',
      '--column-inserts',
      '--no-owner',
      '--no-privileges',
    ].join(' ');

    const output = execDockerCommand(command, { silent: true });

    // Create final SQL with header and sequence reset
    const finalSQL = `${createSqlHeader('PostgreSQL Seed Data')}
-- Disable triggers and foreign key constraints during import
SET session_replication_role = 'replica';

BEGIN;

${output}

COMMIT;

-- Re-enable triggers and foreign key constraints
SET session_replication_role = 'origin';

-- Reset all sequences to the maximum value in their respective tables
DO $$
DECLARE
    r RECORD;
    max_val BIGINT;
BEGIN
    FOR r IN 
        SELECT 
            c.relname as seq_name,
            t.relname as table_name,
            a.attname as column_name
        FROM pg_class c
        JOIN pg_depend d ON d.objid = c.oid
        JOIN pg_class t ON d.refobjid = t.oid
        JOIN pg_attribute a ON a.attrelid = t.oid AND a.attnum = d.refobjsubid
        WHERE c.relkind = 'S'
    LOOP
        EXECUTE format('SELECT COALESCE(MAX(%I), 0) FROM %I', r.column_name, r.table_name) INTO max_val;
        EXECUTE format('SELECT setval(%L, GREATEST(%s, 1))', r.seq_name, max_val);
    END LOOP;
END $$;

ANALYZE;
`;

    writeFileSync(OUTPUT_PATHS.postgres.data, finalSQL);

    const fileSize = getFileSize(OUTPUT_PATHS.postgres.data);
    logger.success(`Data saved to: ${OUTPUT_PATHS.postgres.data}`);
    logger.info(`File size: ${formatFileSize(fileSize)}`);

    // Show statistics
    const stats = getTableStats();
    if (stats.length > 0) {
      console.log('\n📊 Exported tables:');
      const totalRows = stats.reduce((sum, s) => sum + s.rows, 0);
      stats.forEach(({ table, rows }) => {
        console.log(`   ${table.padEnd(30)} ${String(rows).padStart(8)} rows`);
      });
      console.log(`   ${'-'.repeat(40)}`);
      console.log(`   ${'TOTAL'.padEnd(30)} ${String(totalRows).padStart(8)} rows`);
    }
  } catch (error) {
    logger.error(`Failed to generate data: ${(error as Error).message}`);
    logger.info('Make sure Docker container is running: docker-compose up -d');
    process.exit(1);
  }
}

export default generateData;

if (require.main === module) {
  generateData();
}
