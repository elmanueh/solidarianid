/* eslint-disable @typescript-eslint/no-unsafe-return */
import { writeFileSync } from 'node:fs';
import { DB_CONFIG, OUTPUT_PATHS } from './config';
import {
  logger,
  validateDockerEnvironment,
  ensureDirectory,
  execDockerCommand,
  createJsHeader,
  toMongoScript,
  getFileSize,
  formatFileSize,
} from './utils';

interface CollectionInfo {
  name: string;
  count: number;
}

function getCollections(): string[] {
  const command = [
    'docker exec',
    DB_CONFIG.mongo.container,
    'mongosh',
    `-u ${DB_CONFIG.mongo.user}`,
    `-p ${DB_CONFIG.mongo.password}`,
    `--authenticationDatabase ${DB_CONFIG.mongo.authDatabase}`,
    DB_CONFIG.mongo.database,
    '--quiet',
    '--eval',
    '"db.getCollectionNames().join(\',\')"',
  ].join(' ');

  const output = execDockerCommand(command, { silent: true });

  return output
    .trim()
    .split(',')
    .filter(name => name && !name.startsWith('system.'));
}

function getCollectionCount(collectionName: string): number {
  try {
    const command = [
      'docker exec',
      DB_CONFIG.mongo.container,
      'mongosh',
      `-u ${DB_CONFIG.mongo.user}`,
      `-p ${DB_CONFIG.mongo.password}`,
      `--authenticationDatabase ${DB_CONFIG.mongo.authDatabase}`,
      DB_CONFIG.mongo.database,
      '--quiet',
      '--eval',
      `"db.${collectionName}.countDocuments()"`,
    ].join(' ');

    const output = execDockerCommand(command, { silent: true });
    return Number.parseInt(output.trim()) || 0;
  } catch {
    return 0;
  }
}

function exportCollection(collectionName: string): any[] {
  const command = [
    'docker exec',
    DB_CONFIG.mongo.container,
    'mongosh',
    `-u ${DB_CONFIG.mongo.user}`,
    `-p ${DB_CONFIG.mongo.password}`,
    `--authenticationDatabase ${DB_CONFIG.mongo.authDatabase}`,
    DB_CONFIG.mongo.database,
    '--quiet',
    '--eval',
    `"JSON.stringify(db.${collectionName}.find().toArray())"`,
  ].join(' ');

  const output = execDockerCommand(command, { silent: true });

  try {
    return JSON.parse(output);
  } catch {
    logger.warn(`Failed to parse JSON for collection ${collectionName}`);
    return [];
  }
}

function generateMongoData(): void {
  logger.step(3, 'MongoDB Data');

  // Validate environment
  validateDockerEnvironment([DB_CONFIG.mongo.container]);

  // Ensure output directory exists
  ensureDirectory(OUTPUT_PATHS.mongo.dir);

  try {
    logger.info('Discovering collections...');
    const collections = getCollections();

    if (collections.length === 0) {
      logger.warn('No collections found in database');
      return;
    }

    logger.info(`Found ${collections.length} collections`);

    // Build script header
    let script = createJsHeader('MongoDB Seed Data', DB_CONFIG.mongo.database);
    script += `db = db.getSiblingDB('${DB_CONFIG.mongo.database}');\n`;
    script += `print('Loading seed data for ${DB_CONFIG.mongo.database}...');\n\n`;

    const collectionsInfo: CollectionInfo[] = [];
    let totalDocuments = 0;

    // Process each collection
    for (const name of collections) {
      logger.info(`Processing collection: ${name}`);

      const count = getCollectionCount(name);
      if (count === 0) {
        logger.warn(`  Skipping empty collection: ${name}`);
        continue;
      }

      collectionsInfo.push({ name, count });
      totalDocuments += count;

      logger.info(`  Exporting ${count} documents...`);
      const docs = exportCollection(name);

      if (docs.length === 0) {
        logger.warn(`  No documents exported from ${name}`);
        continue;
      }

      // Add collection to script
      script += `// ${name} (${count} documents)\n`;
      script += `print('  Loading ${name}...');\n`;
      script += `db.${name}.deleteMany({});\n`;

      // Split into batches of 1000 documents to avoid huge lines
      const BATCH_SIZE = 1000;
      for (let i = 0; i < docs.length; i += BATCH_SIZE) {
        const batch = docs.slice(i, Math.min(i + BATCH_SIZE, docs.length));
        script += `db.${name}.insertMany([\n`;

        batch.forEach((doc, idx) => {
          const isLast = i + idx === docs.length - 1;
          script += `  ${toMongoScript(doc, '  ')}${isLast ? '' : ','}\n`;
        });

        script += `]);\n`;
      }

      script += '\n';
      logger.success(`  Exported ${name}`);
    }

    script += `print('✅ Loaded ${totalDocuments} documents from ${collectionsInfo.length} collections');\n`;

    // Write file
    writeFileSync(OUTPUT_PATHS.mongo.data, script);

    const fileSize = getFileSize(OUTPUT_PATHS.mongo.data);
    logger.success(`Data saved to: ${OUTPUT_PATHS.mongo.data}`);
    logger.info(`File size: ${formatFileSize(fileSize)}`);

    // Show statistics
    if (collectionsInfo.length > 0) {
      console.log('\n📊 Exported collections:');
      collectionsInfo.forEach(({ name, count }) => {
        console.log(`   ${name.padEnd(30)} ${String(count).padStart(8)} documents`);
      });
      console.log(`   ${'-'.repeat(40)}`);
      console.log(`   ${'TOTAL'.padEnd(30)} ${String(totalDocuments).padStart(8)} documents`);
    }
  } catch (error) {
    logger.error(`Failed to generate MongoDB data: ${(error as Error).message}`);
    logger.info('Make sure Docker container is running: docker-compose up -d');
    process.exit(1);
  }
}

export default generateMongoData;

if (require.main === module) {
  generateMongoData();
}
