import { IsInt, Min, Max, IsOptional, Matches, IsString } from "class-validator";
import { Transform } from "class-transformer";

export class ListPacientesDto {
    @IsOptional()
    @Transform(({ value }) => parseInt(value))
    @IsInt()
    @Min(1)
    @Max(20)
    limit?: number;

    @IsOptional()
    @Transform(({ value }) => parseInt(value))
    @IsInt()
    @Min(0)
    offset?: number;

    @IsOptional()
    @Matches(/^(id|data_cadastro|cpf)$/)
    order_by?: string;

    @IsOptional()
    @Matches(/^(asc|desc)$/)
    direction?: string;

    @IsOptional()
    @IsString()
    search?: string;
}