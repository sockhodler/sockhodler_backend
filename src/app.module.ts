import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { config } from '@config/config';
import { AuthModule } from '@src/modules/auth/auth.module';
import { UserModule } from '@src/modules/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './modules/user/data/schemas/user.schema';
import { EmailModule } from './modules/email/email.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_HOST || 'localhost',
      port: Number(process.env.MYSQL_PORT) || 3306,
      username: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      entities: [User],
      synchronize: true,
      dropSchema: false
    }),
    AuthModule,
    UserModule,
    EmailModule
  ],
})
export class AppModule {}
