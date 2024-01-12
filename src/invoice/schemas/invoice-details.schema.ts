import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class InvoiceDetails {
  @Prop()
  id: string;

  @Prop()
  firstName: string;

  @Prop()
  lasName: string;

  @Prop()
  address: string;

  @Prop()
  country: string;

  @Prop()
  vatNumber: string;
}

export const InvoiceDetailsSchema =
  SchemaFactory.createForClass(InvoiceDetails);
