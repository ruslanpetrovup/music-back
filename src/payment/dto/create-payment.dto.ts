import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderStripe {
  @ApiProperty({ required: true })
  nameProduct: string;

  @ApiProperty({ required: true })
  userId: string;

  @ApiProperty({ required: true })
  amount: string;

  @ApiProperty({ default: 'stripe' })
  paymentMethod: string;
}
