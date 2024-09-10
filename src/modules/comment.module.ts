import { CommentController } from '@controllers/comment.controller.js';
import { Module } from '@nestjs/common';
import { CommentService } from '@services/comment.service.js';

@Module({
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
