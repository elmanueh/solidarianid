import generateData from './generate-data';
import generateMongo from './generate-mongo';
import generateSchema from './generate-schema';
import { logger } from './utils';

function main() {
  logger.section('Generating Database Initialization Files');

  const startTime = Date.now();

  try {
    // PostgreSQL Schema
    generateSchema();

    // PostgreSQL Data
    generateData();

    // MongoDB Data
    generateMongo();

    const duration = ((Date.now() - startTime) / 1000).toFixed(2);

    logger.section(`All files generated successfully in ${duration}s`);

    console.log('\nGenerated files:');
    console.log('  • scripts/init/postgres/01-schema-users.sql');
    console.log('  • scripts/init/postgres/01-schema-communities.sql');
    console.log('  • scripts/init/postgres/01-schema.sql');
    console.log('  • scripts/init/postgres/02-seed-users.sql');
    console.log('  • scripts/init/postgres/02-seed-communities.sql');
    console.log('  • scripts/init/postgres/02-seed.sql');
    console.log('  • scripts/init/mongo/01-seed.js');
  } catch (error) {
    logger.error(`Generation failed: ${(error as Error).message}`);
    process.exit(1);
  }
}

main();
