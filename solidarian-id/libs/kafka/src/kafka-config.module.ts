import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { KAFKA_BROKERS } from './tokens';

const DEFAULT_BROKERS = ['localhost:9092'];

@Global()
@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: KAFKA_BROKERS,
      inject: [ConfigService],
      useFactory: (config: ConfigService) =>
        config.get<string>('KAFKA_BROKERS')?.split(',') ?? DEFAULT_BROKERS,
    },
  ],
  exports: [KAFKA_BROKERS],
})
export class KafkaBrokersModule {}
