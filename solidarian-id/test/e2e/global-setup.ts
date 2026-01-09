import { Topics } from '../../libs/kafka/src/topics.enum';
import { KafkaTestContainer } from '../../libs/test/src/kafka.test-container';
import { MongoDBTestContainer } from '../../libs/test/src/mongodb.test-container';
import { PostgreSQLTestContainer } from '../../libs/test/src/postgresql.test-container';

export default async function globalSetup(): Promise<void> {
  const [mongoUri, postgresUri, kafkaBroker] = await Promise.all([
    MongoDBTestContainer.getInstance().start(),
    PostgreSQLTestContainer.getInstance().start(),
    KafkaTestContainer.getInstance().start(),
  ]);

  await KafkaTestContainer.getInstance().createTopics(Object.values(Topics));

  process.env.TEST_MONGODB_URI = mongoUri;
  process.env.TEST_POSTGRESQL_URI = postgresUri;
  process.env.TEST_KAFKA_BROKER = kafkaBroker;

  (globalThis as any).__TEST_CONTAINERS__ = {
    mongodb: MongoDBTestContainer.getInstance(),
    postgresql: PostgreSQLTestContainer.getInstance(),
    kafka: KafkaTestContainer.getInstance(),
  };

  console.log('\n✅ Test containers started:');
  console.log(`   MongoDB:    ${mongoUri}`);
  console.log(`   PostgreSQL: ${postgresUri}`);
  console.log(`   Kafka:      ${kafkaBroker}\n`);
}
