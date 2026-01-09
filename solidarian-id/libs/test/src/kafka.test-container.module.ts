import { Module, DynamicModule, Global } from '@nestjs/common';
import { KAFKA_BROKERS } from '@solidarianid/kafka';
import { KafkaTestContainer } from '@solidarianid/testing';

@Global()
@Module({})
export class KafkaTestModule {
  static async forRoot(): Promise<DynamicModule> {
    const broker = process.env.TEST_KAFKA_BROKER ?? (await KafkaTestContainer.getInstance().start());

    return {
      module: KafkaTestModule,
      providers: [{ provide: KAFKA_BROKERS, useValue: [broker] }],
      exports: [KAFKA_BROKERS],
    };
  }
}
