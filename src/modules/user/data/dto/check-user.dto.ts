import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CheckUserDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  publicAddress: string;
}