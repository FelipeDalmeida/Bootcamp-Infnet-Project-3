import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { User } from './user.entity';
import { UserController } from './user.controller';

@Module({
    providers:[UserService],
    imports:[MikroOrmModule.forFeature([User])],
    controllers: [UserController],
})
export class UserModule {}
