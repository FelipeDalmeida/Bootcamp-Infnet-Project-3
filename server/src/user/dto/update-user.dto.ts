import { PartialType } from '@nestjs/mapped-types';
import { MinLength, MaxLength, IsOptional , IsEmail } from 'class-validator';
import { CreateUserDto } from './create-user.dto';


export class UpdateUserDto extends PartialType(CreateUserDto) {

    @IsOptional()
    @MinLength(3,{message:"O nome necessita ter no mínimo três caracteres"})
    @MaxLength(60,{message:"O nome pode ter no máximo 60 caracteres"})
    nome:string;

    @IsOptional()
    @IsEmail(undefined,{message:"E-mail inválido"})
    email:string;

    @IsOptional()
    @MinLength(6, {message:"A senha precisa ter no mínimo 6 caracteres"})
    @MaxLength(16,{message:"A senha pode ter no máximo 16 caracteres"})
    password:string;
}
