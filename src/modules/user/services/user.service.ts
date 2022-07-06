/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateProfileDTO } from '../data/dto/update-profile.dto';
import { DeleteStakeRecordDTO, StakeRecordDTO } from '../data/dto/stake-record.dto';
import { User } from '../data/schemas/user.schema';
import { Stake } from '../data/schemas/stake.schema';
import { LastDailyScanRewardsDTO } from '../data/dto/last-daily-scan-rewards.dto';
import { LastWeeklyRewardsDTO } from '../data/dto/last-weekly-claim-rewards.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Stake)
    private stakeRepository: Repository<Stake>,
  ) {}

  async getLastWeeklyClaimRewards(query: LastWeeklyRewardsDTO): Promise<string | any> {
    const { username, fromAddress, toAddress, index } = query;
    const stakeRecordInfo = await this.stakeRepository.findOne({
      where: {
        username,
        fromAddress,
        toAddress,
        index
      }
    });
    return stakeRecordInfo?.lastWeeklyClaimRewards;
  }

  async setLastWeeklyClaimRewards(payload: LastWeeklyRewardsDTO): Promise<void> {
    const { username, fromAddress, toAddress, index, date } = payload;
    const stakeRecordInfo = await this.stakeRepository.findOne({
      where: {
        username,
        fromAddress,
        toAddress,
        index
      }
    });
    if (stakeRecordInfo) {
      await this.stakeRepository.update(stakeRecordInfo.id, {
        lastWeeklyClaimRewards: date
      })
    }
  }

  async getLastDailyScanRewards(username: string): Promise<User | any> {
    const user = await this.userRepository.findOne({
      where: {
        username
      }
    })
    return user?.lastDailyScanRewards
  }

  async setLastDailyScanRewards(payload: LastDailyScanRewardsDTO): Promise<void> {
    const { username, date } = payload
    const user = await this.userRepository.findOne({
      where: {
        username
      }
    })
    if (user) {
      await this.userRepository.update(user.id, {
        lastDailyScanRewards: date
      })
    }
  }

  async getStakeRecord(fromAddress: string): Promise<Stake | any> {
    const stakeRecordInfo = await this.stakeRepository.find({
      where: {
        fromAddress
      }
    })
    return stakeRecordInfo;
  }

  async setStakeRecord(payload: StakeRecordDTO): Promise<void> {
    const { fromAddress, toAddress, index, username, amount, date } = payload
    const user = await this.stakeRepository.findOne({
      where: {
        username,
        fromAddress,
        index
      }
    })
    if (user) {
      await this.stakeRepository.update(user.id, {
        amount: user.amount + amount,
        lastWeeklyClaimRewards: date
      })
    } else {
      await this.stakeRepository.save({
        username,
        fromAddress,
        toAddress,
        index,
        amount,
        lastWeeklyClaimRewards: date
      })
    }
  }

  async deleteStakeRecord(payload: DeleteStakeRecordDTO): Promise<void> {
    const { fromAddress, index, amount } = payload
    const user = await this.stakeRepository.findOne({
      where: {
        fromAddress,
        index
      }
    })
    if (user && user.amount <= amount) {
      await this.stakeRepository.delete(user.id);
    } else if (user && user.amount > amount) {
      await this.stakeRepository.update(user.id, {
        amount: user.amount - amount,
      })
    }
  }

  async getUserInternal(username: string): Promise<User | any> {
    return this.userRepository.findOne({
      where: {
        username
      }
    });
  }

  async getUserByUsername(username: string): Promise<User | any> {
    return this.userRepository.findOne({
      where: {
        username
      }
    });
  }

  async getUserByEmail(email: string): Promise<User | any> {
    return this.userRepository.findOne({
      where: {
        email
      }
    });
  }

  async getUserByPublicAddress(publicAddress: string): Promise<User | any> {
    return this.userRepository.findOne({
      where: {
        publicAddress
      }
    });
  }

  // async getUserById(id: number): Promise<User | any> {
  //   return this.userRepository.findOne(id);
  // }

  async getUsers(): Promise<User[] | any> {
    return this.userRepository.find();
  }

  async verifyUser(id: number): Promise<User | any> {
    return this.userRepository.update(id, { verified: true });
  }

  async remove(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }

  async createUser(
    username: string,
    email: string,
    publicAddress: string,
  ): Promise<User | any> {
    return this.userRepository.save({
      username,
      email,
      publicAddress,
      verfield: false,
    });
  }

  async updateUserProfile(
    id: number,
    updatePayload: UpdateProfileDTO,
  ): Promise<User | any> {
    return this.userRepository.update(id, updatePayload);
  }
}
