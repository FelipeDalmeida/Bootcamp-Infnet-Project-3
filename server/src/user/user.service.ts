import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { EntityRepository } from '@mikro-orm/mysql';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository:EntityRepository<User>
    ){}

    findBiId(id:number){
        return this.userRepository.findOneOrFail(id)
    }

    findByEmail(email:string){
        return this.userRepository.findOne({email})
    }
}
