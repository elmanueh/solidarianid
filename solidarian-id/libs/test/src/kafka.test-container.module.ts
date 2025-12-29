import { Module, DynamicModule } from '@nestjs/common';
import { KafkaTestContainer } from '@solidarianid/testing';

export const KAFKA_BROKERS = 'KAFKA_BROKERS';

@Module({})
export class KafkaTestModule {
  static async forRoot(): Promise<DynamicModule> {
    const broker = await KafkaTestContainer.getInstance().start();
    const brokers = [broker];

    const module = {
      global: true,
      module: KafkaTestModule,
      providers: [
        {
          provide: KAFKA_BROKERS,
          useValue: brokers,
        },
      ],
      exports: [KAFKA_BROKERS],
    };

    return module;
  }
}
