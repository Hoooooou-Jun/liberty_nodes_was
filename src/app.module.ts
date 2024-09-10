import { Module } from '@nestjs/common';
import { CommentModule } from '@modules/comment.module.js';

@Module({
  imports: [CommentModule],
})
export class AppModule {}
