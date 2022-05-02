import { IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProfileDTO {
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
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  publicAddress: string;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  bio: string;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  twitter: string;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  facebook: string;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  instagram: string;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  github: string;
}