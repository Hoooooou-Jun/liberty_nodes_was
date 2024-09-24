import { Module } from '@nestjs/common';
import { CommentModule } from './modules/comment.module.js';
import { AnchorModule } from './modules/anchor.module.js';
import { HeliaModule } from './modules/helia.module.js';
import { IPFSModule } from './modules/ipfs.module.js';

@Module({
  imports: [CommentModule, AnchorModule, HeliaModule, IPFSModule],
})
export class AppModule {}
