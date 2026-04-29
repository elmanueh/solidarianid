import { DynamicModule, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { Partitioners, logLevel } from 'kafkajs';
import { KAFKA_BROKERS } from './tokens';

@Module({})
export class KafkaDynamicModule {
  static register(serviceName: string, producerOnlyMode: boolean): DynamicModule {
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
                producerOnlyMode,
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
                ...(!producerOnlyMode && {
                  consumer: {
                    groupId: `${serviceName}-consumer-group`,
                    retry: {
                      retries: 8,
                      initialRetryTime: 300,
                      factor: 0.2,
                      multiplier: 2,
                      maxRetryTime: 30000,
                      restartOnFailure: async error => {
                        console.error('Consumer error:', error);
                        return Promise.resolve(true);
                      },
                    },
                  },
                }),
                producer: {
                  createPartitioner: Partitioners.DefaultPartitioner,
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
