import { ApiTags } from "@nestjs/swagger";
import { Body, Controller, Get, Header, Param, Post, UseGuards, ValidationPipe } from "@nestjs/common";
import { JwtAuthGuard } from '@src/modules/auth/guards/jwt-auth.guard';
import { UserService } from "../services/user.service";
import { IErrorResponse, IUserResponse } from "../data/interfaces/responses.interface";
import { UpdateProfileDTO } from "../data/dto/update-profile.dto";

@ApiTags("users")
@Controller("/users")
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get("/")
  @Header("Content-Type", "application/json")
  async getUsers(): Promise<IUserResponse[] | IErrorResponse | null> {
    return this.userService.getUsers();
  }

  @UseGuards(JwtAuthGuard)
  @Post("/update/:id")
  @Header("Content-Type", "application/json")
  async updateProfile(@Param('id') id: number, @Body(ValidationPipe) payload: UpdateProfileDTO
  ): Promise<IUserResponse | IErrorResponse | null> {
    return this.userService.updateUserProfile(id, payload);
  }
}
