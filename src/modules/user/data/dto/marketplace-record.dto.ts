import { IsNotEmpty, IsString, MinLength, MaxLength, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class MarketplaceRecordDTO {

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    unitName: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    creator: string;

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
    total: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    decimals: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    url: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    algoPrice: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    socksPrice: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    royalty: number;
}
