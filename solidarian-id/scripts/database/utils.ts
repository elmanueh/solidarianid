/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { execSync } from 'node:child_process';
import { existsSync, mkdirSync } from 'node:fs';

/**
 * Logger with colored output
 */
export const logger = {
  info: (msg: string) => console.log(`ℹ️  ${msg}`),
  success: (msg: string) => console.log(`✅ ${msg}`),
  error: (msg: string) => console.error(`❌ ${msg}`),
  warn: (msg: string) => console.warn(`⚠️  ${msg}`),
  section: (msg: string) => console.log(`\n${'═'.repeat(50)}\n${msg}\n${'═'.repeat(50)}`),
  step: (num: number, msg: string) => console.log(`\n${num}️⃣  ${msg}\n${'-'.repeat(30)}`),
};

/**
 * Check if a Docker container is running
 */
export function isDockerContainerRunning(containerName: string): boolean {
  try {
    const result = execSync(`docker ps --filter "name=${containerName}" --format "{{.Names}}"`, {
      encoding: 'utf8',
    }).trim();
    return result === containerName;
  } catch {
    return false;
  }
}

/**
 * Validate Docker environment
 */
export function validateDockerEnvironment(containers: string[]): void {
  logger.info('Validating Docker environment...');

  // Check if Docker is available
  try {
    execSync('docker --version', { encoding: 'utf8', stdio: 'ignore' });
  } catch {
    logger.error('Docker is not installed or not running');
    logger.info('Install Docker: https://docs.docker.com/get-docker/');
    process.exit(1);
  }

  // Check if required containers are running
  const notRunning = containers.filter(c => !isDockerContainerRunning(c));

  if (notRunning.length > 0) {
    logger.error(`The following containers are not running: ${notRunning.join(', ')}`);
    logger.info('Start containers with: docker-compose up -d');
    process.exit(1);
  }

  logger.success('Docker environment validated');
}

/**
 * Ensure directory exists
 */
export function ensureDirectory(path: string): void {
  if (!existsSync(path)) {
    mkdirSync(path, { recursive: true });
  }
}

/**
 * Execute Docker command safely
 */
export function execDockerCommand(command: string, options: { maxBuffer?: number; silent?: boolean } = {}): string {
  const { maxBuffer = 100 * 1024 * 1024, silent = false } = options;

  try {
    return execSync(command, {
      encoding: 'utf8',
      maxBuffer,
      stdio: silent ? 'pipe' : 'inherit',
    });
  } catch (error) {
    logger.error(`Command failed: ${command}`);
    throw error;
  }
}

/**
 * Format file size in human-readable format
 */
export function formatFileSize(bytes: number): string {
  const units = ['B', 'KB', 'MB', 'GB'];
  let size = bytes;
  let unitIndex = 0;

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }

  return `${size.toFixed(2)} ${units[unitIndex]}`;
}

/**
 * Get file size
 */
export function getFileSize(filePath: string): number {
  try {
    const fs = require('node:fs');
    return fs.statSync(filePath).size;
  } catch {
    return 0;
  }
}

/**
 * Convert MongoDB Extended JSON to mongosh script format
 */
export function toMongoScript(doc: any, indent = '  '): string {
  if (doc === null) return 'null';
  if (doc === undefined) return 'undefined';

  // Date from Extended JSON
  if (doc.$date) {
    return `new Date("${doc.$date}")`;
  }

  // ObjectId from Extended JSON
  if (doc.$oid) {
    return `ObjectId("${doc.$oid}")`;
  }

  // NumberLong from Extended JSON
  if (doc.$numberLong) {
    return `NumberLong("${doc.$numberLong}")`;
  }

  // NumberDecimal from Extended JSON
  if (doc.$numberDecimal) {
    return `NumberDecimal("${doc.$numberDecimal}")`;
  }

  // Arrays
  if (Array.isArray(doc)) {
    if (doc.length === 0) return '[]';
    const items = doc.map(item => toMongoScript(item, indent + '  ')).join(',\n' + indent + '  ');
    return `[\n${indent}  ${items}\n${indent}]`;
  }

  // Objects
  if (typeof doc === 'object') {
    const keys = Object.keys(doc);
    if (keys.length === 0) return '{}';
    const pairs = keys
      .map(key => {
        const value = toMongoScript(doc[key], indent + '  ');
        const quotedKey = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(key) ? key : `"${key}"`;
        return `${quotedKey}: ${value}`;
      })
      .join(',\n' + indent + '  ');
    return `{\n${indent}  ${pairs}\n${indent}}`;
  }

  // Primitives
  if (typeof doc === 'string') {
    // Escape special characters
    const escaped = doc
      .replaceAll('\\', '\\\\')
      .replaceAll('"', String.raw`\"`)
      .replaceAll('\n', String.raw`\n`)
      .replaceAll('\r', String.raw`\r`)
      .replaceAll('\t', String.raw`\t`);
    return `"${escaped}"`;
  }

  if (typeof doc === 'number' || typeof doc === 'boolean') {
    return doc.toString();
  }

  return JSON.stringify(doc);
}

/**
 * Create SQL file header
 */
export function createSqlHeader(title: string): string {
  return `-- =====================================================
-- ${title}
-- Generated: ${new Date().toISOString()}
-- =====================================================

`;
}

/**
 * Create JavaScript file header
 */
export function createJsHeader(title: string, database: string): string {
  return `// =====================================================
// ${title}
// Generated: ${new Date().toISOString()}
// Database: ${database}
// =====================================================

`;
}
