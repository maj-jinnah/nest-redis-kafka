import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import configuration from './config/configuration';
import { AuthModule } from './infrastructure/auth/auth.module';
import { DatabaseModule } from './infrastructure/database/database.module';
// import { KafkaModule } from './infrastructure/kafka/kafka.module';
import { AnalyticModule } from './modules/analytic/analytic.module';
import { EmailModule } from './modules/email/email.module';
import { OrderModule } from './modules/order/order.module';
import { PaymentModule } from './modules/payment/payment.module';

@Module({
  imports: [
    // Configuration Module
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
      envFilePath: ['.env.local', '.env'],
      cache: true,
    }),

    // Infrastructure
    AuthModule,
    DatabaseModule,
    // KafkaModule,

    // Modules
    EmailModule,
    PaymentModule,
    OrderModule,
    AnalyticModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
