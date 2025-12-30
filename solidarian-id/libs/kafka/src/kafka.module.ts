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
            useFactory: () => {
              const brokers =
                process.env.KAFKA_BROKERS?.split(',') ?? DEFAULT_BROKERS;

              return {
                transport: Transport.KAFKA,
                options: {
                  client: {
                    clientId: serviceName,
                    brokers: brokers,
                  },
                  producer: {
                    maxInFlightRequests: 1,
                  },
                  consumer: { groupId: `${serviceName}-consumer-group` },
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
