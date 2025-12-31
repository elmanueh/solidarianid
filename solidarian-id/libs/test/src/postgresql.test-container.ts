import { IDatabaseTestContainer } from '@solidarianid/testing';
import { GenericContainer, StartedTestContainer, Wait } from 'testcontainers';

export class PostgreSQLTestContainer implements IDatabaseTestContainer {
  private static instance: PostgreSQLTestContainer;
  private container: StartedTestContainer | null = null;

  private constructor() {}

  public static getInstance(): PostgreSQLTestContainer {
    if (!PostgreSQLTestContainer.instance) {
      PostgreSQLTestContainer.instance = new PostgreSQLTestContainer();
    }
    return PostgreSQLTestContainer.instance;
  }

  public async start(): Promise<string> {
    if (this.container) {
      return this.getConnectionString();
    }

    const container = await new GenericContainer('postgres:16-alpine')
      .withExposedPorts(5432)
      .withEnvironment({
        POSTGRES_USER: 'test',
        POSTGRES_PASSWORD: 'test',
        POSTGRES_DB: 'test_db',
      })
      .withWaitStrategy(
        Wait.forLogMessage(
          /.*database system is ready to accept connections.*/i,
          2,
        ),
      )
      .withStartupTimeout(120000)
      .withReuse() // Mantiene el contenedor vivo entre ejecuciones
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
      throw new Error('PostgreSQL container not started');
    }
    const host = this.container.getHost();
    const port = this.container.getMappedPort(5432);
    return `postgresql://test:test@${host}:${port}/test_db`;
  }

  public isRunning(): boolean {
    return this.container !== null;
  }
}
