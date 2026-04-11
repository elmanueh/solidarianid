import {
  KafkaTestContainer,
  KurrentDBTestContainer,
  MongoDBTestContainer,
  PostgreSQLTestContainer,
} from '@solidarianid/testing';

export class TestContainerLifecycle {
  private static instance: TestContainerLifecycle;

  private constructor() {}

  public static getInstance(): TestContainerLifecycle {
    if (!TestContainerLifecycle.instance) {
      TestContainerLifecycle.instance = new TestContainerLifecycle();
    }
    return TestContainerLifecycle.instance;
  }

  /**
   * Returns true if containers are managed by global setup
   */
  public isUsingGlobalSetup(): boolean {
    return !!(
      process.env.TEST_MONGODB_URI ||
      process.env.TEST_POSTGRESQL_URI ||
      process.env.TEST_KAFKA_BROKER ||
      process.env.TEST_KURRENTDB_URI
    );
  }

  /**
   * Gets Kafka broker URL from environment or container
   */
  public getKafkaBroker(): string {
    if (process.env.TEST_KAFKA_BROKER) {
      return process.env.TEST_KAFKA_BROKER;
    }
    return KafkaTestContainer.getInstance().getConnectionString();
  }

  /**
   * Gets MongoDB URI from environment or container
   */
  public getMongoDBUri(): string {
    if (process.env.TEST_MONGODB_URI) {
      return process.env.TEST_MONGODB_URI;
    }
    return MongoDBTestContainer.getInstance().getConnectionString();
  }

  /**
   * Gets PostgreSQL URI from environment or container
   */
  public getPostgreSQLUri(): string {
    if (process.env.TEST_POSTGRESQL_URI) {
      return process.env.TEST_POSTGRESQL_URI;
    }
    return PostgreSQLTestContainer.getInstance().getConnectionString();
  }

  /**
   * Gets KurrentDB URI from environment or container
   */
  public getKurrentDBUri(): string {
    if (process.env.TEST_KURRENTDB_URI) {
      return process.env.TEST_KURRENTDB_URI;
    }
    return KurrentDBTestContainer.getInstance().getConnectionString();
  }

  /**
   * Stops all containers only if not using global setup.
   */
  public async stopItSelfManaged(): Promise<void> {
    if (this.isUsingGlobalSetup()) return;

    await Promise.all([
      MongoDBTestContainer.getInstance().stop(),
      PostgreSQLTestContainer.getInstance().stop(),
      KafkaTestContainer.getInstance().stop(),
      KurrentDBTestContainer.getInstance().stop(),
    ]);
  }
}
