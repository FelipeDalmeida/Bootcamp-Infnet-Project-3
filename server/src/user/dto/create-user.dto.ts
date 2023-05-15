import { IsEmail, MaxLength, MinLength } from "class-validator";

export class CreateUserDto{

    @MinLength(3,{message:"O nome necessita ter no mínimo três caracteres"})
    @MaxLength(60,{message:"O nome pode ter no máximo 60 caracteres"})
    nome:string;

    @IsEmail(undefined,{message:"E-mail inválido"})
    email:string;

    @MinLength(6, {message:"A senha precisa ter no mínimo 6 caracteres"})
    @MaxLength(16,{message:"A senha pode ter no máximo 16 caracteres"})
    password:string;
}