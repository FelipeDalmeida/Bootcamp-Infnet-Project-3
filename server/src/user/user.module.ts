import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { User } from './user.entity';

@Module({
    providers:[UserService],
    imports:[MikroOrmModule.forFeature([User])],
})
export class UserModule {}
