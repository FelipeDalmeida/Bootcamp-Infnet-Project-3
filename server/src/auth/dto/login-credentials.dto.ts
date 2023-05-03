import { IsEmail, IsString } from "class-validator";

export class loginCredentialsDto{

    @IsEmail()
    email:string;

    @IsString()
    password:string;
}