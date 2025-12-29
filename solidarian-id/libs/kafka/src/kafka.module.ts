import { DynamicModule, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({})
export class KafkaDynamicModule {
  static register(serviceName: string): DynamicModule {
    const name = `${serviceName}_kafka`;

    return {
      module: KafkaDynamicModule,
      imports: [
        ClientsModule.register([
          {
            name,
            transport: Transport.KAFKA,
            options: {
              client: {
                clientId: serviceName,
                brokers: process.env.KAFKA_BROKERS?.split(',') || [
                  'localhost:9092',
                ],
                connectionTimeout: 5000,
                requestTimeout: 30000,
                retry: {
                  initialRetryTime: 1000,
                  retries: 8,
                  maxRetryTime: 5000,
                  factor: 2,
                },
              },
              producer: {
                idempotent: true,
                maxInFlightRequests: 1,
              },
              consumer: {
                groupId: `${serviceName}-consumer-group`,
              },
            },
          },
        ]),
      ],
      exports: [ClientsModule],
    };
  }
}
