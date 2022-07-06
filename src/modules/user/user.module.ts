import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './controllers/user.controller';
import { User } from './data/schemas/user.schema';
import { Stake } from './data/schemas/stake.schema';
import { UserService } from './services/user.service';
import { Marketplace } from './data/schemas/marketplace.schema';

@Module({
  imports: [ConfigModule.forRoot(), TypeOrmModule.forFeature([User, Stake, Marketplace])],
  controllers: [UserController],
  providers: [UserService],
  exports: [TypeOrmModule, UserService],
})
export class UserModule {}
