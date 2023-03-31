import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { AuthGuard } from '../auth/auth/auth.guard';
import { Session } from '../auth/session/session.decorator';
import { SessionContainer } from 'supertokens-node/recipe/session';

@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {
  }

  @Post()
  @UseGuards(new AuthGuard())
  create(@Session() session: SessionContainer, @Body() createMessageDto: CreateMessageDto) {
    const userId = session.getUserId();
    return this.messageService.create(createMessageDto, userId);
  }

  @Get()
  findAll() {
    return this.messageService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.messageService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(new AuthGuard())
  update(@Session() session: SessionContainer, @Param('id') id: string, @Body() updateMessageDto: UpdateMessageDto) {
    const userId = session.getUserId();
    return this.messageService.update(id, updateMessageDto);
  }

  @Delete(':id')
  @UseGuards(new AuthGuard())
  remove(@Session() session: SessionContainer, @Param('id') id: string) {
    const userId = session.getUserId();
    return this.messageService.remove(id);
  }
}
