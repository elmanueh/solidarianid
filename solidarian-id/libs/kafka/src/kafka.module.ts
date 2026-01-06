import { DynamicModule, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { logLevel } from 'kafkajs';
import { KAFKA_BROKERS } from './tokens';

@Module({})
export class KafkaDynamicModule {
  static register(serviceName: string): DynamicModule {
    const name = `${serviceName}_kafka`;
    const isTestEnv = process.env.NODE_ENV === 'test';

    return {
      module: KafkaDynamicModule,
      imports: [
        ClientsModule.registerAsync([
          {
            name,
            inject: [KAFKA_BROKERS],
            useFactory: (brokers: string[]) => ({
              transport: Transport.KAFKA,
              options: {
                client: {
                  clientId: serviceName,
                  brokers,
                  connectionTimeout: 5000,
                  requestTimeout: 30000,
                  retry: {
                    initialRetryTime: 300,
                    retries: 12,
                    factor: 0.2,
                    multiplier: 2,
                    maxRetryTime: 5000,
                  },
                  logLevel: isTestEnv ? logLevel.NOTHING : logLevel.ERROR,
                },
                consumer: {
                  groupId: `${serviceName}-consumer-group`,
                },
                producer: {
                  maxInFlightRequests: 1,
                },
              },
            }),
          },
        ]),
      ],
      exports: [ClientsModule],
    };
  }
}
