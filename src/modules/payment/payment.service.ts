import { Injectable } from '@nestjs/common';
import { PaymentSuccessfulEvent } from './event-emit/payment-successful.event';

interface PaymentResponse {
  message: string;
  amount: number;
}

interface Body {
  amount: number;
}

@Injectable()
export class PaymentService {
  constructor(
    private readonly paymentSuccessfulEvent: PaymentSuccessfulEvent,
  ) {}

  async processPayment(body: Body): Promise<PaymentResponse> {
    await this.paymentSuccessfulEvent.emitPaymentSuccessfulEvent(body);

    return {
      message: 'Payment processed and event emitted successfully',
      amount: Number(body.amount),
    };
  }
}
