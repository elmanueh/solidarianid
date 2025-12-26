import { GenericContainer, StartedTestContainer, Wait } from 'testcontainers';

export class MongoDBTestContainer {
  private static instance: MongoDBTestContainer;
  private container: StartedTestContainer | null = null;

  private constructor() {}

  public static getInstance(): MongoDBTestContainer {
    if (!MongoDBTestContainer.instance) {
      MongoDBTestContainer.instance = new MongoDBTestContainer();
    }
    return MongoDBTestContainer.instance;
  }

  public async start(): Promise<string> {
    if (this.container) {
      const host = this.container.getHost();
      const port = this.container.getMappedPort(27017);
      return `mongodb://test:test@${host}:${port}/?directConnection=true&authSource=admin`;
    }

    const container = await new GenericContainer('mongo:7.0')
      .withExposedPorts(27017)
      .withEnvironment({
        MONGO_INITDB_ROOT_USERNAME: 'test',
        MONGO_INITDB_ROOT_PASSWORD: 'test',
      })
      .withWaitStrategy(Wait.forLogMessage(/.*Waiting for connections.*/i))
      .withStartupTimeout(120000)
      .start();

    const host = container.getHost();
    const port = container.getMappedPort(27017);
    const connectionString = `mongodb://test:test@${host}:${port}/?directConnection=true&authSource=admin`;

    this.container = container;

    return connectionString;
  }

  public async stop(): Promise<void> {
    if (!this.container) {
      return;
    }

    await this.container.stop();
    this.container = null;
  }

  public getConnectionString(): string {
    if (!this.container) {
      throw new Error('MongoDB container not started');
    }
    const host = this.container.getHost();
    const port = this.container.getMappedPort(27017);
    return `mongodb://test:test@${host}:${port}/?directConnection=true&authSource=admin`;
  }
}
