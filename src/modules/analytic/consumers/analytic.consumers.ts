import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EachMessagePayload } from 'kafkajs';
import { KafkaConsumerBase } from 'src/infrastructure/kafka/consumer/kafka-consumer.base';
import { AnalyticService } from '../analytic.service';

@Injectable()
export class AnalyticConsumers
  extends KafkaConsumerBase
  implements OnModuleInit
{
  protected readonly groupId = 'analytic-consumer-group';
  protected readonly topics = ['analytic-topic'];

  constructor(
    configService: ConfigService,
    private readonly analyticService: AnalyticService,
  ) {
    super(configService);
  }

  async onModuleInit() {
    console.log('groupId: ', this.groupId);
    console.log('topics: ', this.topics);
    await this.connect();
  }

  protected processMessage({
    topic,
    partition,
    message,
  }: EachMessagePayload): Promise<void> {
    console.log('AnalyticConsumers processing message: ', {
      topic,
      partition,
      message,
    });

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const event = JSON.parse(message.value?.toString() || '[]');

    console.log('Parsed event: ', event);

    return Promise.resolve();
  }
}
