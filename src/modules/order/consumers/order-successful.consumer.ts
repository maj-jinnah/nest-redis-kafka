import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EachMessagePayload } from 'kafkajs';
import { KafkaConsumerBase } from 'src/infrastructure/kafka/consumer/kafka-consumer.base';
import { OrderService } from '../order.service';

@Injectable()
export class OrderSuccessfulConsumer
  extends KafkaConsumerBase
  implements OnModuleInit
{
  protected readonly groupId = 'order-successful-consumer-group';
  protected readonly topics = ['payment-successful-topic'];

  constructor(
    configService: ConfigService,
    private readonly orderService: OrderService,
  ) {
    super(configService);
  }

  async onModuleInit() {
    this.logger.log('Initializing OrderSuccessfulConsumer...');
    this.logger.log(`Group ID: ${this.groupId}`);
    this.logger.log(`Topics: ${this.topics.join(', ')}`);

    try {
      await this.connect();
      this.logger.log('OrderSuccessfulConsumer connected and ready!');
    } catch (error) {
      this.logger.error('Failed to initialize OrderSuccessfulConsumer', error);
      throw error;
    }
  }

  protected async processMessage({
    topic,
    partition,
    message,
  }: EachMessagePayload): Promise<void> {
    this.logger.log('OrderSuccessfulConsumer processing message');
    this.logger.log(`Topic: ${topic}, Partition: ${partition}`);

    if (!message.value) {
      this.logger.warn('Received message with no value');
      return;
    }

    try {
      const event = JSON.parse(message.value.toString());

      this.logger.log('Parsed event:', JSON.stringify(event, null, 2));
      console.log('Amount :>_____', event.amount);

      // Process the order based on the event
      // Example: await this.orderService.markOrderAsSuccessful(event.orderId);
    } catch (error) {
      this.logger.error('Error parsing or processing message:', error);
      this.logger.error('Raw message value:', message.value.toString());
      throw error; // Re-throw to trigger Kafka retry mechanism
    }
  }
}
