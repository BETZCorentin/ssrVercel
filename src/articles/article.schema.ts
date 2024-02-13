import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Article {
  @Prop()
  _id: number;
  @Prop({ required: true })
  url: string;
  @Prop({ required: true })
  title: string;
  @Prop({ required: true })
  description: string;
  @Prop({ required: true })
  content: string;
  @Prop()
  createdDate: Date;
  @Prop()
  authorName: string;
  @Prop()
  imageUrl: string;
  @Prop()
  imageAlt: string;
}

export const ArticleSchema = SchemaFactory.createForClass(Article);
