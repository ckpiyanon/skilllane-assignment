import { Atk } from '../decorators/atk.decorator';
import { Public } from '../decorators/is-public.decorator';
import { UserId } from '../decorators/user-id.decorator';
import type { LoginRequest } from '../dtos/requests/login.request';
import type { RegisterRequest } from '../dtos/requests/register.request';
import { UserMapper } from '../mapper/user.mapper';
import { AuthService } from '../services/auth.service';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import type { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userMapper: UserMapper,
  ) {}

  @Public()
  @Post('register')
  async register(@Body() { username, password }: RegisterRequest) {
    await this.authService.register(username, password);
    return 'Success';
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(
    @Body() { username, password }: LoginRequest,
    @Res({ passthrough: true }) response: Response,
  ) {
    const token = await this.authService.login(username, password);
    response.cookie('atk', token);
    return 'Success';
  }

  @HttpCode(HttpStatus.OK)
  @Post('logout')
  async logout(
    @Atk() token: string,
    @Res({ passthrough: true }) response: Response,
  ) {
    await this.authService.logout(token);
    response.clearCookie('atk');
    return 'Success';
  }

  @Get('user')
  async getUserInfo(@UserId() userId: number) {
    return this.authService
      .getUserInfo(userId)
      .then((user) => this.userMapper.toUserResponse(user));
  }
}
