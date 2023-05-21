import { IsNumber, Length } from "class-validator";



export class VerifyEmailDto {
    @IsNumber()
    id:number;

    @Length(6)
    code: string;
}