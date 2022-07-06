import { IsNotEmpty, IsString, MinLength, MaxLength, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LastWeeklyRewardsDTO {

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    username: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    fromAddress: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    toAddress: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    index: number | string;

    @ApiProperty()
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    date: string;
}
