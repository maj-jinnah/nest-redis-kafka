import { IsNotEmpty, IsNumber, Max, Min } from 'class-validator';

export class PaymentDto {
  @IsNotEmpty()
  @IsNumber()
  @Min(99)
  @Max(1000)
  amount: number;
}
