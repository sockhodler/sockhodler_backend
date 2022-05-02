/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {
  Body,
  Controller,
  Header,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { EmailDTO } from '../data/dto/email.dto';
import { EmailService } from '../service/email.service';


@ApiTags("email")
@Controller('email')
export class EmailController {
  constructor(private emailService: EmailService) {}

  @Post('/send')
  @Header("Content-Type", "application/json")
  async register(
    @Body(ValidationPipe) payload: EmailDTO
  ): Promise<any> {
    return this.emailService.sendEmail(payload.email, payload.publicAddress, payload.nftName, payload.asaId);
  }
}