import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GoogleAuthReqDto } from '../dto/request/googleAuth.req.dto.js';
import { AuthService } from '../services/auth.service.js';

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

  // @Get()
  // async getCommentData(
  // ) {
  //   const data = await this.commentService.getComment();
  //   return data;
  // }

  // @Post()
  // async createComment(
  //   @Body() createCommentDto: { publicKey: string, secretKey: string, url: string, content: string }
  // ) {
  //   const { publicKey, secretKey, url, content } = createCommentDto;
  //   const data = await this.commentService.createComment(publicKey, secretKey, url, content);
  //   return data;
  // }
}
