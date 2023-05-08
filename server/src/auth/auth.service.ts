import { Injectable, UnauthorizedException } from '@nestjs/common';
import { loginCredentialsDto } from './dto/login-credentials.dto';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService:UserService,
        private readonly jwtService:JwtService
    ){}
    async login(loginCredentialsDto:loginCredentialsDto){
        const user=await this.userService.findByEmail(loginCredentialsDto.email)

        if(user?.id===undefined || user?.password!==loginCredentialsDto.password){
            throw new UnauthorizedException();
        }

        if( user?.password===loginCredentialsDto.password){
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
}
