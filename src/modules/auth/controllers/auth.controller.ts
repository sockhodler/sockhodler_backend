/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {
  Body,
  Controller,
  Header,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { Response } from 'express';

import { CreateUserDTO } from '@src/modules/user/data/dto/create-user.dto';
import { CheckUserDTO } from '@src/modules/user/data/dto/check-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { VerifyOTPDTO } from '@src/modules/user/data/dto/verify-otp.dto';
import { AuthService } from '../services/auth.service';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { IErrorResponse, ILoginResponse } from '../models/interfaces/responses.interface';
import { LoginUserDTO } from '../models/dto/login-user.dto';

@ApiTags("auth")
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/register')
  @Header("Content-Type", "application/json")
  async register(
    @Body(ValidationPipe) payload: CreateUserDTO
  ): Promise<void | IErrorResponse> {
    return this.authService.register(payload);
  }

  @Post('/remove')
  @Header("Content-Type", "application/json")
  @HttpCode(200)
  async remove(
    @Body(ValidationPipe) payload: CheckUserDTO
  ): Promise<void | IErrorResponse> {
    return this.authService.remove(payload);
  }

  @Post('/reverify')
  @Header("Content-Type", "application/json")
  async reverify(
    @Body(ValidationPipe) payload: CreateUserDTO
  ): Promise<void | IErrorResponse> {
    return this.authService.reverify(payload);
  }

  @Post('/verify-code')
  @Header("Content-Type", "application/json")
  @HttpCode(200)
  async verifyOTP(
    @Body(ValidationPipe) payload: VerifyOTPDTO, @Res({passthrough: true}) response: Response
  ) {

    const verfied = await this.authService.verifyEmailOTP(payload.email, payload.code);
    
    if (verfied) {
      response.status(HttpStatus.OK);
      return;
    }

    response.status(HttpStatus.FORBIDDEN).json({ error: 'Invalid/Expired Code' });
  }

  @Post('/check')
  @Header("Content-Type", "application/json")
  @HttpCode(200)
  async check(
    @Body(ValidationPipe) payload: CheckUserDTO
  ): Promise<ILoginResponse | IErrorResponse> {
    return this.authService.check(payload);
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  @Header("Content-Type", "application/json")
  async login(@Body(ValidationPipe) payload: LoginUserDTO):  Promise<ILoginResponse |IErrorResponse> {
    return this.authService.login(payload);
  }
}