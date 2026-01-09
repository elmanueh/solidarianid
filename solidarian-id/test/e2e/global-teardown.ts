import { KafkaTestContainer } from '../../libs/test/src/kafka.test-container';
import { MongoDBTestContainer } from '../../libs/test/src/mongodb.test-container';
import { PostgreSQLTestContainer } from '../../libs/test/src/postgresql.test-container';

export default async function globalTeardown(): Promise<void> {
  await Promise.all([
    MongoDBTestContainer.getInstance().stop(),
    PostgreSQLTestContainer.getInstance().stop(),
    KafkaTestContainer.getInstance().stop(),
  ]);

  delete (globalThis as any).__TEST_CONTAINERS__;

  console.log(`All containers stopped.\n`);
}
