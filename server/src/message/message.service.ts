import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Message } from './message.entity';
import { EntityRepository } from '@mikro-orm/mysql';

@Injectable()
export class MessageService {

  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: EntityRepository<Message>
  ) { }

  async create(createMessageDto: CreateMessageDto) {
    const message = this.messageRepository.create(createMessageDto);
    await this.messageRepository.flush()
    return message;
  }

  async findAll() {
    const messages=await this.messageRepository.findAll()
    return messages;
  }
}
