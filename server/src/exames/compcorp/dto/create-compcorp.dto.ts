import { MinLength, MaxLength, IsString, IsOptional, IsNumber, Min, Max, Matches, Length, IsEmail } from 'class-validator';


const errors={
    
    Error:`Valor Inválido`,
   
}

export class CreateCompcorpDto {

    @IsNumber()
    @Min(1,{
        message:errors.Error
    })
    @Max(200,{
        message:errors.Error
    })
    massa: number;

    @IsNumber()
    @Min(1,{
        message:errors.Error
    })
    @Max(60,{
        message:errors.Error
    })
    imc: number;

    @IsNumber()
    @Min(1,{
        message:errors.Error
    })
    @Max(50,{
        message:errors.Error
    })
    gordura_corporal: number;

    @IsNumber()
    @Min(1,{
        message:errors.Error
    })
    @Max(20,{
        message:errors.Error
    })
    gordura_visceral: number;

    @IsNumber()
    @Min(500,{
        message:errors.Error
    })
    @Max(5000,{
        message:errors.Error
    })
    metabolismo_basal: number;

    @IsNumber()
    @Min(1,{
        message:errors.Error
    })
    @Max(55,{
        message:errors.Error
    })
    musculos_esqueleticos: number;

    @IsNumber()
        @Min(1,{
        message:errors.Error
    })
    @Max(110,{
        message:errors.Error
    })
    idade_corporal: number;

    @IsOptional()
    @IsString()
    data_avaliacao:string;

    // user:number
}
