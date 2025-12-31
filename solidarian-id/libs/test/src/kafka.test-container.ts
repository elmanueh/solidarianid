import { IDatabaseTestContainer } from '@solidarianid/testing';
import { KafkaContainer, StartedKafkaContainer } from '@testcontainers/kafka';
import { Wait } from 'testcontainers';

export class KafkaTestContainer implements IDatabaseTestContainer {
  private static instance: KafkaTestContainer;
  private container: StartedKafkaContainer | null = null;

  private constructor() {}

  public static getInstance(): KafkaTestContainer {
    if (!KafkaTestContainer.instance) {
      KafkaTestContainer.instance = new KafkaTestContainer();
    }
    return KafkaTestContainer.instance;
  }

  public async start(): Promise<string> {
    if (this.container) {
      return this.getConnectionString();
    }

    const image = 'confluentinc/cp-kafka:8.1.1';
    const container = await new KafkaContainer(image)
      .withWaitStrategy(Wait.forLogMessage(/Kafka Server started/))
      .withStartupTimeout(120000)
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
      throw new Error('Kafka container not started');
    }

    const host = this.container.getHost();
    const port = this.container.getMappedPort(9093);

    return `${host}:${port}`;
  }

  public isRunning(): boolean {
    return this.container !== null;
  }
}
