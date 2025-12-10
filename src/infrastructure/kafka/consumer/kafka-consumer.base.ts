import { Injectable, Logger, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Consumer, EachMessagePayload, Kafka } from 'kafkajs';

@Injectable()
export abstract class KafkaConsumerBase implements OnModuleDestroy {
  protected readonly logger: Logger;
  protected kafka: Kafka;
  protected consumer: Consumer;
  protected abstract groupId: string;
  protected abstract topics: string[];

  constructor(protected readonly configService: ConfigService) {
    this.logger = new Logger(this.constructor.name);
    this.kafka = new Kafka({
      clientId: this.configService.get<string>('KAFKA_CLIENT_ID') || 'my-app',
      brokers: this.configService.get<string[]>('KAFKA_BROKERS') || [
        'localhost:9092',
      ],
      retry: {
        initialRetryTime: 300,
        retries: 10,
      },
    });
  }

  async connect() {
    try {
      this.consumer = this.kafka.consumer({
        groupId: this.groupId,
        sessionTimeout: 30000,
        heartbeatInterval: 5000,
      });
      await this.consumer.connect();

      this.logger.log(`Kafka Consumer connected with groupId: ${this.groupId}`);
      this.logger.log(`Subscribing to topics: ${this.topics.join(', ')}`);
      console.log('Subscribing to topics: ', this.topics);

      for (const topic of this.topics) {
        this.logger.log(`Subscribing to topic: ${topic}`);
        console.log('Subscribing to topic: ', topic);
        await this.consumer.subscribe({ topic, fromBeginning: false });
      }

      await this.consumer.run({
        eachMessage: async (payload: EachMessagePayload) => {
          try {
            this.logger.log(`Processing message from topic ${payload.topic}`);
            console.log('Message payload>_____ ', payload);
            await this.processMessage(payload);
          } catch (error) {
            this.logger.error(
              `Error processing message from topic ${payload.topic}`,
              error,
            );
          }
        },
      });
    } catch (error) {
      this.logger.error('Failed to connect Kafka Consumer', error);
      throw error;
    }
  }

  async onModuleDestroy() {
    try {
      await this.consumer.disconnect();
      this.logger.log('Kafka Consumer disconnected');
    } catch (error) {
      this.logger.error('Failed to disconnect Kafka Consumer', error);
    }
  }

  protected abstract processMessage(payload: EachMessagePayload): Promise<void>;
}
