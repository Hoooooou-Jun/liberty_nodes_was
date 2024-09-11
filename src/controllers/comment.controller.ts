import { Controller, Get } from '@nestjs/common';
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
}
