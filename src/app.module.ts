import { Module } from '@nestjs/common';
import path from 'path';
import { fileURLToPath } from 'url';
import { ConfigModule } from '@nestjs/config';
import { CommentModule } from './modules/comment.module.js';
import { AnchorModule } from './modules/anchor.module.js';
import { HeliaModule } from './modules/helia.module.js';
import { IPFSModule } from './modules/ipfs.module.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RedisModule } from './modules/redis.module.js';
import { Node } from './entities/node.entity.js';
import { Comment } from './entities/comment.entity.js';
import { UserModule } from './modules/user.module.js';
import { AuthModule } from './modules/auth.module.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    AuthModule,
    UserModule,
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
      synchronize: true,
      migrationsRun: false,
      logging: true,
      logger: 'file',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      migrations: [__dirname + '/migrations/*{.ts,.js}'],
    }),
],
})
export class AppModule {}
