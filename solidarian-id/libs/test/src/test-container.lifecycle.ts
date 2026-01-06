import { KafkaTestContainer, MongoDBTestContainer, PostgreSQLTestContainer } from '@solidarianid/testing';

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
  private isUsingGlobalSetup(): boolean {
    return !!(process.env.TEST_MONGODB_URI || process.env.TEST_POSTGRESQL_URI || process.env.TEST_KAFKA_BROKER);
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
    ]);
  }
}
