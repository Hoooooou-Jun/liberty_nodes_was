import { Inject, Injectable } from '@nestjs/common';
import { GoogleAuthReqDto } from '../dto/request/googleAuth.req.dto.js';
import { UserRepository } from '../repositories/user.repository.js';
import { JwtService } from '@nestjs/jwt';
import { User } from '../entities/user.entity.js';
import { RegisterUsernameReqDto } from '../dto/request/registerUser.req.dto.js';
import { RedisService } from './redis.service.js';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    private readonly redisService: RedisService
  ) {}

  async googleLogin(req: GoogleAuthReqDto) {
    try {
      const { user: { email, photo }, } = req;

      let user = await this.userRepository.findOneByEmail(email);
      console.log("1. user: ", user);

      if (!user) {
        user = await this.userRepository.createUser({
          email: email,
          profileImage: photo,
        });
        console.log("2. user: ", user);
        return null;
      }

      const access_token = this.createAccessToken(user);
      const refresh_token = this.createRefreshToken(user);

      this.redisService.set(String(user.id), String(refresh_token));

      return {
        access_token: access_token,
        refresh_token: refresh_token,
      }
    } catch (error) {
      console.error('Error in AuthService: ', error);
      throw new Error('Google login failed');
    }
  }
  async registerUsername(dto: RegisterUsernameReqDto) {
    try {

    } catch (error) {
      console.error('Error in AuthService: ', error);
      throw new Error('Register username failed');
    }
  }
  async createAccessToken(user: User) {
    const access_token = this.jwtService.sign(
      {
        email: user.email,
        sub: user.id,
      },
      {
        secret: process.env.JWT_SECRET,
        expiresIn: '1d',
      }
    );
    return access_token;
  }
  async createRefreshToken(user: User) {
    const refresh_token = this.jwtService.sign(
      {
        email: user.email,
        sub: user.id,
      },
      {
        secret: process.env.JWT_SECRET,
        expiresIn: '14d',
      }
    );
    return refresh_token;
  }
}
