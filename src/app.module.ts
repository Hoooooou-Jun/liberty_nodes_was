import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CommentModule } from './modules/comment.module.js';
import { AnchorModule } from './modules/anchor.module.js';
import { HeliaModule } from './modules/helia.module.js';
import { IPFSModule } from './modules/ipfs.module.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RedisModule } from './modules/redis.module.js';
import { Node } from './entities/node.entity.js';
import { Comment } from './entities/comment.entity.js';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    CommentModule,
    AnchorModule,
    IPFSModule,
    RedisModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [Node, Comment],
      synchronize: true,
    }),
],
})
export class AppModule {}
