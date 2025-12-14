import { Module } from '@nestjs/common';
import { KafkaModule } from 'src/infrastructure/kafka/kafka.module';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { PaymentSuccessfulEvent } from './event-emit/payment-successful.event';

@Module({
  imports: [KafkaModule],
  controllers: [PaymentController],
  providers: [PaymentService, PaymentSuccessfulEvent],
})
export class PaymentModule {}
