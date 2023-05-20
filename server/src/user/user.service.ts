import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { EntityRepository } from '@mikro-orm/mysql';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository:EntityRepository<User>
    ){}

    findById(id:number){
        return this.userRepository.findOneOrFail(id)
    }

    findByEmail(email:string){
        return this.userRepository.findOne({email})
    }

    async create(createUserDto:CreateUserDto){
        const user = await this.userRepository.create(createUserDto)
        this.userRepository.flush();
        return user;
    }

    async setEmailVerified(userId:number){
        const user=await this.userRepository.findOne(userId)
        user.isEmailVerified=true
        await this.userRepository.flush()
   }

}
