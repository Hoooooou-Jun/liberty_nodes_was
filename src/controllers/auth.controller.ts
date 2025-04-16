import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { GoogleAuthReqDto } from '../dto/request/googleAuth.req.dto.js';
import { AuthService } from '../services/auth.service.js';
import { JwtPayload } from '../types/index.js';
import { UpdateUsernameByIdReqDto } from '../dto/request/updateUsernameById.dto.js';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  @UseGuards(AuthGuard("google"))
  async googleLogin(@Req() req: Request) {}

  @Get("google/callback")
  @UseGuards(AuthGuard("google"))
  async googleLoginCallback(@Req() req: GoogleAuthReqDto) {
    return await this.authService.googleLogin(req);
  }

  @Post('update/username')
  @UseGuards(AuthGuard("access_token"))
  async updateUsername(@Body() dto: UpdateUsernameByIdReqDto, @Req() req: Request) {
    return await this.authService.UpdateUsername(dto);
  }

  @Post("refresh")
  @UseGuards(AuthGuard("refresh_token"))
  async refreshToken(@Req() req: Request) {
    const { refreshToken, sub, email } = req.user as JwtPayload & {
      refreshToken: string;
    }
    return {
      message: "Refresh access token success",
      access_token: await this.authService.createAccessToken(sub, email)
    }
  }
}
