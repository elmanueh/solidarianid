import { IDatabaseTestContainer } from '@solidarianid/testing';
import { KurrentDbContainer, StartedKurrentDbContainer } from '@testcontainers/kurrentdb';

export class KurrentDBTestContainer implements IDatabaseTestContainer {
  private static instance: KurrentDBTestContainer;
  private container: StartedKurrentDbContainer | null = null;

  private constructor() {}

  public static getInstance(): KurrentDBTestContainer {
    if (!KurrentDBTestContainer.instance) {
      KurrentDBTestContainer.instance = new KurrentDBTestContainer();
    }
    return KurrentDBTestContainer.instance;
  }

  public async start(): Promise<string> {
    if (this.container) {
      return this.getConnectionString();
    }

    const container = await new KurrentDbContainer('kurrentplatform/kurrentdb:26.0').start();

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
      throw new Error('KurrentDB container not started');
    }
    return this.container.getConnectionString();
  }

  public isRunning(): boolean {
    return this.container !== null;
  }
}
