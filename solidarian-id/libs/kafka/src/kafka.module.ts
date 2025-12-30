import { DynamicModule, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

const DEFAULT_BROKERS = ['localhost:9092'];

@Module({})
export class KafkaDynamicModule {
  static register(serviceName: string): DynamicModule {
    const name = `${serviceName}_kafka`;

    return {
      module: KafkaDynamicModule,
      imports: [
        ClientsModule.registerAsync([
          {
            name,
            inject: ['KAFKA_BROKERS'],
            useFactory: (injectedBrokers?: string[]) => {
              const resolvedBrokers: string[] = injectedBrokers?.length
                ? injectedBrokers
                : (process.env.KAFKA_BROKERS?.split(',') ?? DEFAULT_BROKERS);

              return {
                transport: Transport.KAFKA,
                options: {
                  client: {
                    clientId: serviceName,
                    brokers: resolvedBrokers,
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
              };
            },
          },
        ]),
      ],
      exports: [ClientsModule],
    };
  }
}
