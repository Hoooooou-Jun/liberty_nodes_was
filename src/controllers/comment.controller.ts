import { Body, Controller, Get, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { CommentService } from '../services/comment.service.js';
import { AuthGuard } from '@nestjs/passport';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get()
  async getCommentData() {
    const data = await this.commentService.getComment();
    return data;
  }

  @Post()
  @UseGuards(AuthGuard('access_token'))
  async createComment(
    @Body() dto
  ) {

    return { message: "Success!"};
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
