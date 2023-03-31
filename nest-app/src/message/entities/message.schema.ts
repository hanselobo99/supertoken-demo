import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type MessageDocument = HydratedDocument<Message>;

@Schema()
export class Message {
  @Prop()
  posted_by: string;
  @Prop()
  title: string;
  @Prop()
  description: string;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
