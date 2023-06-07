import { IsString, MaxLength } from "class-validator";

export class CreateMessageDto {
  
    @MaxLength(144,
        {
            message:"Mensagem com no máximo 144 caracteres"
        })
    content:string

    sender:number;
    
}
