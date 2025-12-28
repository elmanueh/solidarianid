import { MicroserviceOptions, Transport } from '@nestjs/microservices';

export function kafkaOptions(serviceName: string): MicroserviceOptions {
  const brokers = (process.env.KAFKA_BROKERS ?? 'localhost:9092').split(',');

  return {
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: serviceName,
        brokers,
      },
      consumer: {
        groupId: `${serviceName}`,
      },
    },
  };
}
