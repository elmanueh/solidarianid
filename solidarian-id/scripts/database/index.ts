import generateSchema from './generate-schema';
import generateData from './generate-data';
import generateMongo from './generate-mongo';
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
    console.log('  • scripts/init/postgres/01-schema.sql');
    console.log('  • scripts/init/postgres/02-seed-data.sql');
    console.log('  • scripts/init/mongo/01-seed-data.js');

    console.log('\nNext steps:');
    console.log('  1. Review the generated files');
    console.log('  2. Commit to git: git add database/init/');
    console.log('  3. Team members run: docker-compose up -d');
    console.log('  4. Data will auto-load on first container creation');
  } catch (error) {
    logger.error(`Generation failed: ${(error as Error).message}`);
    process.exit(1);
  }
}

main();
