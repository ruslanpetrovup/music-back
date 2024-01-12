import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class SelectPrice {
  @Prop()
  variant: number;

  @Prop()
  price: number;
}

const SelectPriceSchema = SchemaFactory.createForClass(SelectPrice);

@Schema()
export class SelectInfluencers {
  @Prop()
  influencerId: string;

  @Prop()
  instagramUsername: string;

  @Prop()
  confirmation: string;

  @Prop({ default: '' })
  brand: string;

  @Prop({ default: '' })
  datePost: string;

  @Prop({ default: '' })
  caption: string;

  @Prop({ default: '' })
  video: string;

  @Prop({ default: '' })
  postLink: string;

  @Prop({ default: '' })
  screenshot: string;

  @Prop({ default: '' })
  impressions: string;

  @Prop({ default: '' })
  reach: string;

  @Prop({ default: '' })
  like: string;

  @Prop({ default: '' })
  invoice: string;
}

const SelectInfluencersSchema = SchemaFactory.createForClass(SelectInfluencers);

@Schema({
  timestamps: true,
})
export class Promos {
  @Prop()
  userId: string;

  @Prop({
    required: true,
    type: SelectPriceSchema,
  })
  selectPrice: SelectPrice;

  @Prop({
    required: true,
    type: [SelectInfluencersSchema],
  })
  selectInfluencers: SelectInfluencers[];

  @Prop()
  videoLink: string;

  @Prop()
  postDescription: string;

  @Prop()
  storyTag: string;

  @Prop()
  swipeUpLink: string;

  @Prop()
  dateRequest: string;

  @Prop()
  specialWishes: string;

  @Prop({ required: true, default: 'payment' })
  paymentType: string;

  @Prop({ required: true, default: 'wait' })
  paymentStatus: string;

  @Prop({ required: true })
  statusPromo: string;


  @Prop({default: 'wait'})
  verifyPromo: string;

  @Prop()
  createdAt: Date;
}

export const PromosSchema = SchemaFactory.createForClass(Promos);
