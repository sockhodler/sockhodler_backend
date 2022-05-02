/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as hsb from 'nodemailer-express-handlebars';

@Injectable()
export class EmailService {
  async setupTransport(config: any) {
    return nodemailer.createTransport(config);
  }

  async sendEmail(email: string, walletAddress: string, nftName: string, asaId: string): Promise<any> {
    const transport = await this.setupTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const handlebarOptions = {
      viewEngine: {
          extName: '.hbs',
          partialsDir: 'views',
          layoutsDir: 'views',
          defaultLayout: 'email.hbs',
      },
      viewPath: 'views',
      extName: '.hbs',
    };
    
    const mailOptions = {
      from: '"SockVault" <noreply@sockvault.com',
      to: process.env.ADMIN_EMAIL,
      subject: 'SockVault Notification',
      template: 'email',
      context: {
        walletAddress,
        emailAddress: email,
        nftName,
        asaId
      }
    }

    transport.use('compile', hsb(handlebarOptions));

    const response = await transport.sendMail(mailOptions);

    return response;   
  }
}