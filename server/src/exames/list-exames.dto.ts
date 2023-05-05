import { IsInt, Min, Max, IsOptional, Matches, IsString } from "class-validator";
import { Transform } from "class-transformer";

export class ListExamDto {
    @IsOptional()
    @Transform(({ value }) => parseInt(value))
    @IsInt()
    @Min(1)
    @Max(25)
    limit?: number;

    @IsOptional()
    @Transform(({ value }) => parseInt(value))
    @IsInt()
    @Min(0)
    offset?: number;

    @IsOptional()
    @Matches(/^(id|data_avaliacao)$/)
    order_by?: string;

    @IsOptional()
    @Matches(/^(asc|desc)$/)
    direction?: string;

    // @Transform(({ value }) => parseInt(value))
    // @IsInt()
    // id_paciente?: string;
}