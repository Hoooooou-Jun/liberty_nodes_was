import { Body, Controller, Get, Post } from '@nestjs/common';
import { CommentService } from '../services/comment.service.js';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get()
  async getCommentData(
  ) {
    const data = await this.commentService.getComment();
    return data;
  }

  @Post()
  async createComment(
    @Body() createCommentDto: { publicKey: string, secretKey: string, url: string, content: string }
  ) {
    const { publicKey, secretKey, url, content } = createCommentDto;
    const data = await this.commentService.createComment(publicKey, secretKey, url, content);
    return data;
  }
}
