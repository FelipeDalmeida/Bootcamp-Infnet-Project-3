import { MinLength, MaxLength, IsString, IsOptional, IsNumber, Min, Max, Matches, Length, IsEmail } from 'class-validator';


const errors={
    
    Error:`Valor Inválido`,
   
}

export class CreateAvantropometricaDto {

    @IsNumber()
    @Min(1,{
        message:errors.Error
    })
    @Max(250,{
        message:errors.Error
    })
    estatura: number;

    @IsNumber()
    @Min(1,{
        message:errors.Error
    })
    @Max(60,{
        message:errors.Error
    })
    comprimento_pe: number;

    @IsNumber()
    @Min(1,{
        message:errors.Error
    })
    @Max(200,{
        message:errors.Error
    })
    altura_ombro: number;

    @IsNumber()
    @Min(1,{
        message:errors.Error
    })
    @Max(200,{
        message:errors.Error
    })
    largura_ombro: number;

    @IsNumber()
    @Min(1,{
        message:errors.Error
    })
    @Max(200,{
        message:errors.Error
    })
    envergadura: number;

    @IsNumber()
    @Min(1,{
        message:errors.Error
    })
    @Max(200,{
        message:errors.Error
    })
    altura_quadril: number;

    @IsNumber()
        @Min(1,{
        message:errors.Error
    })
    @Max(200,{
        message:errors.Error
    })
    largura_quadril: number;

    @IsNumber()
        @Min(1,{
        message:errors.Error
    })
    @Max(200,{
        message:errors.Error
    })
    altura_joelho: number;

    @IsNumber()
        @Min(1,{
        message:errors.Error
    })
    @Max(200,{
        message:errors.Error
    })
    altura_tornozelo: number
    
    @IsString()
    data_avaliacao:string;


}
