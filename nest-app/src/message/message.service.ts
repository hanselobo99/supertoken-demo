import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Message } from './entities/message.schema';
import { Model } from 'mongoose';

@Injectable()
export class MessageService {
  constructor(@InjectModel(Message.name) private messageModel: Model<Message>) {
  }

  async create(createMessageDto: CreateMessageDto, userId: string) {
    const lol = await this.messageModel.create({ ...createMessageDto, posted_by: userId });
    return 'Message created';
  }

  async findAll() {
    const all =  this.messageModel.find();
    console.log(all);
    return all;
  }

  async findOne(id: string) {
    return this.messageModel.findById(id);
  }

  async update(id: string, updateMessageDto: UpdateMessageDto) {
    await this.messageModel.findByIdAndUpdate(id, updateMessageDto);
    return `Updated successfully`;
  }

  async remove(id: string) {
    await this.messageModel.findByIdAndRemove(id);
    return `Deleted successfully`;
  }
}
