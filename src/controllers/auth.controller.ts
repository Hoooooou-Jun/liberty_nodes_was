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
    return this.authService.googleLogin(req);
  }

  @Post('update/username')
  @UseGuards(AuthGuard("access_token"))
  async updateUsername(@Body() dto: UpdateUsernameByIdReqDto, @Req() req: Request) {
    return this.authService.UpdateUsername(dto);
  }

  @Post("refresh")
  @UseGuards(AuthGuard("refresh_token"))
  async refreshToken(@Req() req: Request, @Res() res: Response) {
    const { refreshToken, sub, email } = req.user as JwtPayload & {
      refreshToken: string;
    }

    /* 레디스 상에서 토큰 교체해야함. */
  }
}
