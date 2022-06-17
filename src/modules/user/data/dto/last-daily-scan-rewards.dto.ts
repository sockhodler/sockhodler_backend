import {
    IsNotEmpty,
    IsOptional,
    IsString,
    MaxLength,
    MinLength,
  } from 'class-validator';
  import { ApiProperty } from '@nestjs/swagger';
  
  export class LastDailyScanRewardsDTO {
    @ApiProperty()
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    username: string;
  
    @ApiProperty()
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    date: string;
  }