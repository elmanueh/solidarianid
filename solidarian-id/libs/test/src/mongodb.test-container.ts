import { IDatabaseTestContainer } from '@solidarianid/testing';
import { GenericContainer, StartedTestContainer, Wait } from 'testcontainers';

export class MongoDBTestContainer implements IDatabaseTestContainer {
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
      return this.getConnectionString();
    }

    const container = await new GenericContainer('mongo:7.0')
      .withExposedPorts(27017)
      .withEnvironment({
        MONGO_INITDB_ROOT_USERNAME: 'test',
        MONGO_INITDB_ROOT_PASSWORD: 'test',
      })
      .withWaitStrategy(Wait.forLogMessage(/.*Waiting for connections.*/i))
      .withStartupTimeout(120000)
      .withReuse()
      .start();

    this.container = container;

    return this.getConnectionString();
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

  public isRunning(): boolean {
    return this.container !== null;
  }
}
