import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { EntityRepository } from '@mikro-orm/mysql';
import { CreateUserDto } from './dto/create-user.dto';
import { promises as fs } from 'fs';
import * as path from 'path';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository:EntityRepository<User>
    ){}

    async findById(id:number){
        return await this.userRepository.findOneOrFail(id)
    }

    async findByEmail(email:string){
        return await this.userRepository.findOne({email})
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

   async uploadProfileAvatar(userId:number, avatar:Buffer){
    const avatarPath=path.join('public','avatars',`${userId}.jpeg`);

    try{
        await fs.writeFile(avatarPath,avatar);
    } catch (error){
        console.log(error)
        return{
            success:false,
            pictureUrl:null 
        }
    }
  
    const user = await this.findById(userId);
    user.userPicture=`/avatars/${userId}.jpeg`
    this.userRepository.flush()

    return{
        success:true,
        pictureUrl:`/avatars/${userId}.jpeg` 
    }

   }
}
