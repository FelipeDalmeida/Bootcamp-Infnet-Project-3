import { Injectable, ExecutionContext, CanActivate, UnauthorizedException } from "@nestjs/common";
import { Observable } from "rxjs";
import {JwtService} from "@nestjs/jwt"
import { Reflector } from "@nestjs/core";
import { IS_PUBLIC_KEY } from "./decorator/public-endpoints";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private readonly jwtService:JwtService,
        private reflector :Reflector,
    ){

    }

    async canActivate(context: ExecutionContext){

        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
          ]);
          if(isPublic){
            return true
          }

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