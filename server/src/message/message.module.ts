import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Message } from './message.entity';

@Module({
  imports: [MikroOrmModule.forFeature([Message])],
  controllers: [MessageController],
  providers: [MessageService]
})
export class MessageModule {}
