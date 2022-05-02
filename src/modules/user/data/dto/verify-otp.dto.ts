import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class VerifyOTPDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(6, { message: 'Code is too short (6 characters min)' })
  @MaxLength(6, { message: 'Code is too long (6 characters max)' })
  code: string;
}
