import { IDatabaseTestContainer } from '@solidarianid/testing';
import { KafkaContainer, StartedKafkaContainer } from '@testcontainers/kafka';
import { Wait } from 'testcontainers';
import { Kafka, Admin } from 'kafkajs';

export class KafkaTestContainer implements IDatabaseTestContainer {
  private static instance: KafkaTestContainer;
  private container: StartedKafkaContainer | null = null;
  private admin: Admin | null = null;

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

  /**
   * Creates topics in the Kafka container.
   * Should be called after start() and before consumers subscribe.
   */
  public async createTopics(topics: string[]): Promise<void> {
    const broker = process.env.TEST_KAFKA_BROKER ?? (this.container ? this.getConnectionString() : await this.start());
    const kafka = new Kafka({
      clientId: 'test-admin',
      brokers: [broker],
    });

    this.admin = kafka.admin();
    await this.admin.connect();

    await this.admin.createTopics({
      waitForLeaders: true,
      topics: topics.map(topic => ({
        topic,
        numPartitions: 1,
        replicationFactor: 1,
      })),
    });

    await this.admin.disconnect();
    this.admin = null;
  }

  public async stop(): Promise<void> {
    if (this.admin) {
      await this.admin.disconnect();
      this.admin = null;
    }

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
