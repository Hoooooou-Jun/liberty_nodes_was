import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from '../controllers/auth.controller.js';
import { GoogleStrategy } from '../strategies/google.strategy.js';
import { AuthService } from '../services/auth.service.js';
import { UserModule } from '../modules/user.module.js';
import { AccessTokenStrategy } from '../strategies/access_token.strategy.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity.js';
import { RedisService } from '../services/redis.service.js';
import { RefreshTokenStrategy } from '../strategies/refresh_token.strategy.js';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    ConfigModule,
    UserModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
    HttpModule,
  ],
  controllers: [AuthController],
  providers: [GoogleStrategy, AccessTokenStrategy, RefreshTokenStrategy, AuthService, RedisService],
  exports: [AuthService],
})
export class AuthModule {}
