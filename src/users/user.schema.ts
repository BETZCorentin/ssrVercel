import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class User {
  @Prop()
  _id: number;
  @Prop({ required: true })
  username: string;
  @Prop({ required: true })
  password: string;
  @Prop({ required: true })
  favoriteArticleIds: number[];
}

export const UserSchema = SchemaFactory.createForClass(User);
