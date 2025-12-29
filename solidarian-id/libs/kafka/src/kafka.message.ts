export interface KafkaMessage {
  key: string;
  value: any;
  headers?: Record<string, string>;
}
