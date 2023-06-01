import { PartialType } from '@nestjs/mapped-types';
import { MinLength, MaxLength, IsOptional , IsEmail } from 'class-validator';
import { CreateUserDto } from './create-user.dto';


export class UpdateUserPasswordDto extends PartialType(CreateUserDto) {

    @MinLength(6, {message:"A senha precisa ter no mínimo 6 caracteres"})
    @MaxLength(16,{message:"A senha pode ter no máximo 16 caracteres"})
    oldPassword:string;

    @MinLength(6, {message:"A senha precisa ter no mínimo 6 caracteres"})
    @MaxLength(16,{message:"A senha pode ter no máximo 16 caracteres"})
    password:string;
}
