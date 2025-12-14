import { Injectable } from '@nestjs/common';
import { KafkaService } from 'src/infrastructure/kafka/kafka.service';

@Injectable()
export class PaymentSuccessfulEvent {
  constructor(private readonly kafkaService: KafkaService) {}

  async emitPaymentSuccessfulEvent(paymentData: any): Promise<void> {
    const topic = 'payment-successful-topic';
    const message = {
      value: JSON.stringify(paymentData),
    };
    await this.kafkaService.send(topic, message);
  }
}
