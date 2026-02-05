import { IsNotEmpty, IsString, IsOptional, IsInt, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class JoinQueueDto {
    @ApiProperty({ example: 'service-uuid' })
    @IsString()
    @IsNotEmpty()
    serviceId: string;

    @ApiProperty({ example: 'branch-uuid' })
    @IsString()
    @IsNotEmpty()
    branchId: string;

    @ApiProperty({ example: 0, description: '0 for normal, 1+ for priority' })
    @IsInt()
    @IsOptional()
    priority?: number;
}

export class QueueStatusDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    tokenId: string;
}
