
import { IsString, IsInt, IsOptional } from 'class-validator';

export class UpdateServiceDto {
    @IsString()
    @IsOptional()
    name?: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsInt()
    @IsOptional()
    averageDuration?: number;
}
