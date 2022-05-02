/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@src/modules/user/data/schemas/user.schema';
import { CreateUserDTO } from '@src/modules/user/data/dto/create-user.dto';
import { UserService } from '@src/modules/user/services/user.service';
import { CheckUserDTO } from '@src/modules/user/data/dto/check-user.dto';
import axios from 'axios';
import { LoginUserDTO } from '../models/dto/login-user.dto';
import { IErrorResponse, ILoginResponse } from '../models/interfaces/responses.interface';


@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService
  ) {}

  async register(createUserDTO: CreateUserDTO): Promise<void | IErrorResponse> {
    try {
      const { username, email, publicAddress = '' } = createUserDTO;

      const codeSent = await axios.post(`${process.env.AUTH0_API}/passwordless/start`, {
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        connection: 'email',
        email,
        send: "code",
        authParams: {}
      });

      if (codeSent && codeSent.status === 200) {
        await this.userService.createUser(username, email, publicAddress);
      }
    } catch (error) {
      if (error.code === 11000) {
        const loginResponse: IErrorResponse = { status: 'failed', message: 'User already exists.' };
        return loginResponse;
      }

      const loginResponse: IErrorResponse = { status: 'failed', message: error.message };
      return loginResponse;
    }
  }

  async reverify(createUserDTO: CreateUserDTO): Promise<void | IErrorResponse> {
    try {
      const { username, email, publicAddress = '' } = createUserDTO;

      const codeSent = await axios.post(`${process.env.AUTH0_API}/passwordless/start`, {
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        connection: 'email',
        email,
        send: "code",
        authParams: {}
      });

      // if (codeSent && codeSent.status === 200) {
      //   await this.userService.createUser(username, email, publicAddress);
      // }
    } catch (error) {
      if (error.code === 11000) {
        const loginResponse: IErrorResponse = { status: 'failed', message: 'User already exists.' };
        return loginResponse;
      }

      const loginResponse: IErrorResponse = { status: 'failed', message: error.message };
      return loginResponse;
    }
  }

  async check(checkUserPayload: CheckUserDTO): Promise<ILoginResponse | IErrorResponse> {
    try {
      const { publicAddress } = checkUserPayload;
      const user = await this.userService.getUserByPublicAddress(publicAddress);
      if (user) {
        return { username: user.username, email: user.email, verified: user.verified } as unknown as ILoginResponse;
      }
      
      const loginResponse: IErrorResponse = { status: 'not found', message: 'User not found.' };
      return loginResponse;
    } catch (error) {
      if (error.code === 11000) {
        const loginResponse: IErrorResponse = { status: 'failed', message: 'User already exists.' };
        return loginResponse;
      }

      const loginResponse: IErrorResponse = { status: 'failed', message: error.message };
      return loginResponse;
    }
  }

  async remove(removeUserPayload: CheckUserDTO): Promise<void | IErrorResponse> {
    try {
      const { publicAddress } = removeUserPayload;
      const user = await this.userService.getUserByPublicAddress(publicAddress);
      if (user) {
        await this.userService.remove(user.id);
      }
    } catch (error) {
      if (error.code === 11000) {
        const loginResponse: IErrorResponse = { status: 'failed', message: 'Unkown Error.' };
        return loginResponse;
      }

      const loginResponse: IErrorResponse = { status: 'failed', message: error.message };
      return loginResponse;
    }
  }

  async login(loginPayload: LoginUserDTO): Promise<ILoginResponse | IErrorResponse> {
    try {
      const user = await this.userService.getUserByUsername(loginPayload.username);
      const payload = { username: user.username, sub: user._id };
      const accessToken = this.jwtService.sign(payload);

      const loginResponse: ILoginResponse = { accessToken };
      return loginResponse;
    } catch (error) {
      const loginResponse: IErrorResponse = { status: 'failed', message: error.message };
      return loginResponse;
    }
    
  }

  async validateUser(username: string): Promise<User | null> {
    const user = await this.userService.getUserInternal(username);

    if (user) {
      return user;
    }
    return null;
  }

  async verifyEmailOTP(email: string, code: string): Promise<any> {
    try {
      const verified = await axios.post(`${process.env.AUTH0_API}/oauth/token`, {
        grant_type : "http://auth0.com/oauth/grant-type/passwordless/otp",
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        username: email,
        otp: code,
        realm: 'email',
        audience : '',
        scope:'openid profile email'
      });

      if (verified && verified.status === 200) {
        const user = await this.userService.getUserByEmail(email);

        if (user) {
          const verify = await this.userService.verifyUser(user.id);

          if (verify) return true;

          return false;
        }
      };

      return false;
    } catch (error) {
      return false;
    }    
  }
}