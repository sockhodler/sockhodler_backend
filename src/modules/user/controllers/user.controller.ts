import { ApiTags } from '@nestjs/swagger';
import {
  Body,
  Controller,
  Get,
  Header,
  Param,
  Post,
  UseGuards,
  ValidationPipe,
  Query,
  Delete,
} from '@nestjs/common';
import { JwtAuthGuard } from '@src/modules/auth/guards/jwt-auth.guard';
import { UserService } from '../services/user.service';
import {
  IErrorResponse,
  IUserResponse,
  IStakeResponse,
} from '../data/interfaces/responses.interface';
import { UpdateProfileDTO } from '../data/dto/update-profile.dto';
import { LastDailyScanRewardsDTO } from '../data/dto/last-daily-scan-rewards.dto';
import { StakeRecordDTO, DeleteStakeRecordDTO } from '../data/dto/stake-record.dto';
import { LastWeeklyRewardsDTO } from '../data/dto/last-weekly-claim-rewards.dto';

@ApiTags('users')
@Controller('/users')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/')
  @Header('Content-Type', 'application/json')
  async getUsers(): Promise<IUserResponse[] | IErrorResponse | null> {
    return this.userService.getUsers();
  }

  @Get('/last-weekly-claim-rewards')
  @Header('Content-Type', 'application/json')
  async getLastWeeklyClaimRewardsByUser(@Query() query: LastWeeklyRewardsDTO): Promise<IUserResponse[] | IErrorResponse | null> {
    return this.userService.getLastWeeklyClaimRewards(query);
  }

  @Post('/last-weekly-claim-rewards')
  @Header('Content-Type', 'application/json')
  async setLastWeeklyClaimRewardsByUser(@Body(ValidationPipe) payload: LastWeeklyRewardsDTO): Promise<void> {
    this.userService.setLastWeeklyClaimRewards(payload);
  }

  @Get('/last-daily-scan-rewards')
  @Header('Content-Type', 'application/json')
  async getLastDailyScanRewardsByUser(@Query('username') username: string): Promise<IUserResponse[] | IErrorResponse | null> {
    return this.userService.getLastDailyScanRewards(username);
  }

  @Post('/last-daily-scan-rewards')
  @Header('Content-Type', 'application/json')
  async setLastDailyScanRewardsByUser(@Body(ValidationPipe) payload: LastDailyScanRewardsDTO): Promise<void> {
    this.userService.setLastDailyScanRewards(payload);
  }

  @Get('/stake-record')
  @Header('Content-Type', 'application/json')
  async getStakeRecord(@Query('fromAddress') fromAddress: string): Promise<IStakeResponse[] | IErrorResponse | null> {
    return this.userService.getStakeRecord(fromAddress);
  }

  @Post('/stake-record')
  @Header('Content-Type', 'application/json')
  async setStakeRecord(@Body(ValidationPipe) payload: StakeRecordDTO): Promise<void> {
    this.userService.setStakeRecord(payload);
  }

  @Delete('/stake-record')
  @Header('Content-Type', 'application/json')
  async deleteStakeRecord(@Body(ValidationPipe) payload: DeleteStakeRecordDTO): Promise<void> {
    this.userService.deleteStakeRecord(payload);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/update/:id')
  @Header('Content-Type', 'application/json')
  async updateProfile(
    @Param('id') id: number,
    @Body(ValidationPipe) payload: UpdateProfileDTO,
  ): Promise<IUserResponse | IErrorResponse | null> {
    return this.userService.updateUserProfile(id, payload);
  }
}
