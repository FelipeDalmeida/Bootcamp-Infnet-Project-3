import { MinLength, MaxLength, IsString, IsOptional, IsNumber, Min, Max, Matches, Length, IsEmail } from 'class-validator';


const errors={
    
    titleMinLengthError:`Nome muito pequeno`,
    titleMaxLengthError:`Nome muito Longo`,
    idadeMinError:"Idade mínima de 1 ano",
    idadeMaxError:"Idade máxima de 110 anos",
    sexoError:`Sexo inserido inválido`,
    emailError:"e-mail inválido",
    celularError:"Número inválido"
}

export class CreatePacienteDto {
    @IsString()
    @MinLength(3,{
        message:errors.titleMinLengthError,
    })
    @MaxLength(110,{
        message:errors.titleMaxLengthError,
    })
    nome:string;

    @IsNumber()
    @Min(1,{
        message:errors.idadeMinError
    })
    @Max(110,{
        message:errors.idadeMaxError
    })
    idade:number;

    @IsString()
    @Matches(/^(Feminino|Masculino)$/,{
        message:errors.sexoError
    })
    sexo:string;

    @IsEmail()
    email:string;

    @IsString()
    @MinLength(8,{
        message:errors.celularError,
    })
    @MaxLength(20,{
        message:errors.celularError,
    })
    celular:string;

    @IsString()
    @Length(11)
    cpf:string;

    
    user:number;
}
