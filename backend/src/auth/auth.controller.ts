import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import type { Response } from 'express';
import { CreateUserDto } from '../users/dto/create-user.dto';
import {
  AUTH_COOKIE_NAME,
  getAuthCookieClearOptions,
  getAuthCookieOptions,
} from './auth-cookie.config';
import { AuthService } from './auth.service';
import type { AuthenticatedUser } from './auth.types';
import { CurrentUser } from './decorators/current-user.decorator';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(
    @Body() createUserDto: CreateUserDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { user, token } = await this.authService.register(createUserDto);

    response.cookie(
      AUTH_COOKIE_NAME,
      token,
      getAuthCookieOptions(this.authService.getCookieMaxAgeMs()),
    );

    return { user };
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { user, token } = await this.authService.login(loginDto);

    response.cookie(
      AUTH_COOKIE_NAME,
      token,
      getAuthCookieOptions(this.authService.getCookieMaxAgeMs()),
    );

    return { user };
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie(AUTH_COOKIE_NAME, getAuthCookieClearOptions());

    return { message: 'Déconnecté avec succès' };
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  me(@CurrentUser() user: AuthenticatedUser) {
    return user;
  }
}
