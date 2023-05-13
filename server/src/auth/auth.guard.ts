import { Injectable, ExecutionContext, CanActivate, UnauthorizedException } from "@nestjs/common";
import { Observable } from "rxjs";
import {JwtService} from "@nestjs/jwt"

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private readonly jwtService:JwtService
    ){

    }

    async canActivate(context: ExecutionContext){
        const request = context.switchToHttp().getRequest();
        if(request.headers['authorization']===undefined){
            throw new UnauthorizedException();
        }
        const [type,token] = request.headers['authorization'].split(' ');
        if(type!=="Bearer"){
            throw new UnauthorizedException();
        }

        try{
            const payload=this.jwtService.verifyAsync(token,{
                secret:process.env.JWT_SECRET,
            });
            request['user']=payload;
        } catch {
            throw new UnauthorizedException()
        }
 
        return true;
    }
}