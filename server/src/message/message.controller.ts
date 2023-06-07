import { Controller, Get, Post, Body, Sse, Req } from '@nestjs/common';
import { MessageService } from './message.service';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { CreateMessageDto } from './dto/create-message.dto';
import { interval, map, Subject, observeOn, fromEvent } from 'rxjs';
import { Message } from './message.entity';

@Controller('message')
export class MessageController {
  constructor(
    private readonly messageService: MessageService,
    private eventEmitter: EventEmitter2,
  ) { }

  @Post()
  async create(@Body() createMessageDto: CreateMessageDto, @Req() request: Request) {
    const payload = await request['user'];
    const user_id = payload.id;
    createMessageDto.sender = user_id
    const message = await this.messageService.create(createMessageDto);
    // const receiverMessagesListenerId = `messages.${user_id}`;
    this.eventEmitter.emit('message.created',message);
    return await message
    
  }

  @Get()
  async findAll() {
    return await this.messageService.findAll();
  }

  @Sse('notifications')
  async notifications(@Req() request: Request) {
    // const subject = new Subject();
    // // const userId = request['user'].id;
    // // // return interval(1000).pipe(map((_) => ({ data: { hello: 'world', user: userId } })));
    // // const userMessagesListenerId = `message.${userId}`;
    //  this.eventEmitter.on('messages.created',(message: Message)=>{
    //   subject.next(message);
    // });
    // return  subject.pipe(map((message: Message) => ({ data: message })));

    return fromEvent(this.eventEmitter, 'message.created')
           .pipe(map((message: Message) => ({  data: message })));
  }

}
