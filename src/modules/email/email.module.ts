import { Module } from '@nestjs/common';
import { EmailController } from './controllers/email.controller';
import { EmailService } from './service/email.service';

@Module({
  providers: [EmailService],
  controllers: [EmailController],
  exports: [EmailService],
})
export class EmailModule {}
