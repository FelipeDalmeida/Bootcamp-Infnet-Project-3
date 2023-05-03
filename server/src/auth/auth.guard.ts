import { Injectable, ExecutionContext, CanActivate, UnauthorizedException } from "@nestjs/common";
import { Observable } from "rxjs";
import {JwtService} from "@nestjs/jwt"
import { authConstants } from "./auth.constants";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private readonly jwtService:JwtService
    ){

    }

    async canActivate(context: ExecutionContext){
        const request = context.switchToHttp().getRequest();
        const [type,token] = request.headers['authorization'].split(' ');
        if(type!=="Bearer"){
            throw new UnauthorizedException();
        }

        try{
            const payload=this.jwtService.verifyAsync(token,{
                secret:authConstants.jwtSecret,
            });
            request['user']=payload;
        } catch {
            throw new UnauthorizedException()
        }
 
        return true;
    }
}