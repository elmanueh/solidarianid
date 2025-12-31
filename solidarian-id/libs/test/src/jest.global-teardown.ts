import { PostgreSQLTestContainer } from './postgresql.test-container';
import { MongoDBTestContainer } from './mongodb.test-container';
import { KafkaTestContainer } from './kafka.test-container';

module.exports = async () => {
  const postgres = PostgreSQLTestContainer.getInstance();
  if (postgres.isRunning()) {
    await postgres.stop();
  }

  const mongo = MongoDBTestContainer.getInstance();
  if (mongo.isRunning()) {
    await mongo.stop();
  }

  const kafka = KafkaTestContainer.getInstance();
  if (kafka.isRunning()) {
    await kafka.stop();
  }
};
