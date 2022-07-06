import { IsNotEmpty, IsString, MinLength, MaxLength, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class StakeRecordDTO {

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
    index: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    amount: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    date: string;
}

export class DeleteStakeRecordDTO {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    fromAddress: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    index: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    amount: number;
}

