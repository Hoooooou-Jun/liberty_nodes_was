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

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    ConfigModule,
    UserModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AuthController],
  providers: [GoogleStrategy, AccessTokenStrategy, AuthService],
  exports: [AuthService],
})
export class AuthModule {}
