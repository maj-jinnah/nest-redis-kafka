import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { KafkaModule } from 'src/infrastructure/kafka/kafka.module';
import { OrderSuccessfulConsumer } from './consumers/order-successful.consumer';

@Module({
  imports: [KafkaModule],
  controllers: [OrderController],
  providers: [OrderService, OrderSuccessfulConsumer],
})
export class OrderModule {}
