import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PaymentDto } from './dto/payment.dto';
import { PaymentService } from './payment.service';

@ApiTags('payment')
@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  async processPayment(@Body() body: PaymentDto) {
    const data = await this.paymentService.processPayment(body);

    return {
      success: true,
      message: data.message,
      amount: data.amount,
    };
  }
}
