import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Message, MessageSchema } from './entities/message.schema';

@Module({
  controllers: [MessageController],
  providers: [MessageService],
  imports: [MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }])],
})
export class MessageModule {}
