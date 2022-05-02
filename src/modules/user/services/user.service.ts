/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from "typeorm";
import { UpdateProfileDTO } from '../data/dto/update-profile.dto';
import { User } from '../data/schemas/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
){}

  async getUserInternal(username: string): Promise<User | any> {
    return this.userRepository.findOne({ username });
  }

  async getUserByUsername(username: string ): Promise<User | any> {
    return this.userRepository.findOne({ username });
  }

  async getUserByEmail(email: string): Promise<User | any> {
    return this.userRepository.findOne({ email });
  }

  async getUserByPublicAddress(publicAddress: string): Promise<User | any> {
    return this.userRepository.findOne({ publicAddress });
  } 

  async getUserById(id: string): Promise<User | any> {
    return this.userRepository.findOne(id);
  }

  async getUsers(): Promise<User[] | any> {
    return this.userRepository.find();
  }

  async verifyUser(id: number): Promise<User | any> {
    return this.userRepository.update(id, { verified: true });
  }

  async remove(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }

  async createUser(username: string, email: string, publicAddress: string): Promise<User | any> {
    return this.userRepository.save({
      username, 
      email, 
      publicAddress,
      verfield: false,
    });
  }

  async updateUserProfile(id: number, updatePayload: UpdateProfileDTO): Promise<User | any> {
    return this.userRepository.update(id, updatePayload);
  }
}