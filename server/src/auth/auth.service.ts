import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { loginCredentialsDto } from './dto/login-credentials.dto';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService:UserService,
        private readonly jwtService:JwtService
    ){}
    async login(loginCredentialsDto:loginCredentialsDto){

        const user=await this.userService.findByEmail(loginCredentialsDto.email)

        if(user?.id===undefined){
            throw new UnauthorizedException();
        }

        if(await user?.comparePassword(loginCredentialsDto.password)){
            const payload = { id: user.id, email: user.email };
            const accessToken = await this.jwtService.signAsync(payload )
            return {
                accessToken,
                user:{
                    id:user.id,
                    email:user.email,
                    nome:user.nome
                }
            }

        } else {
            throw new UnauthorizedException();
        }
 
    }

    async createAcount(createuserDto:CreateUserDto){
        const verificaEmail=await this.userService.findByEmail(createuserDto.email)
        if(verificaEmail){
            throw new BadRequestException({
                errors:{
                    email:"Email já cadastrado."
                },
                success:false
            })
        }

        await this.userService.create(createuserDto);
        const {user,accessToken } = await this.login({
            email:createuserDto.email,
            password:createuserDto.password, 
         })

        return {
            user,
            accessToken,
            success:true
        }
    }
}
