import { PartialType } from '@nestjs/mapped-types';
import { MinLength, MaxLength, IsString, IsOptional, IsNumber, Min, Max, Matches, Length, IsEmail } from 'class-validator';
import { CreateAvantropometricaDto } from './create-avantropometrica.dto';

const errors={
    
    Error:`Valor Inválido`,
   
}

export class UpdateAvantropometrica extends PartialType(CreateAvantropometricaDto) {
    @IsOptional()
    @IsNumber()
    @Min(1,{
        message:errors.Error
    })
    @Max(250,{
        message:errors.Error
    })
    estatura: number;

    @IsOptional()
    @IsNumber()
    @Min(1,{
        message:errors.Error
    })
    @Max(60,{
        message:errors.Error
    })
    comprimento_pe: number;

    @IsOptional()
    @IsNumber()
    @Min(1,{
        message:errors.Error
    })
    @Max(200,{
        message:errors.Error
    })
    altura_ombro: number;

    @IsOptional()
    @IsNumber()
    @Min(1,{
        message:errors.Error
    })
    @Max(200,{
        message:errors.Error
    })
    largura_ombro: number;

    @IsOptional()
    @IsNumber()
    @Min(1,{
        message:errors.Error
    })
    @Max(200,{
        message:errors.Error
    })
    envergadura: number;

    @IsOptional()
    @IsNumber()
    @Min(1,{
        message:errors.Error
    })
    @Max(200,{
        message:errors.Error
    })
    altura_quadril: number;

    @IsOptional()
    @IsNumber()
        @Min(1,{
        message:errors.Error
    })
    @Max(200,{
        message:errors.Error
    })
    largura_quadril: number;

    @IsOptional()
    @IsNumber()
        @Min(1,{
        message:errors.Error
    })
    @Max(200,{
        message:errors.Error
    })
    altura_joelho: number;

    @IsOptional()
    @IsNumber()
        @Min(1,{
        message:errors.Error
    })
    @Max(200,{
        message:errors.Error
    })
    altura_tornozelo: number
    
    @IsOptional()
    @IsString()
    data_avaliacao:string;
}
