import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class EmailDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  publicAddress: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  username: string

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  nftName: string

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  asaId: string
}