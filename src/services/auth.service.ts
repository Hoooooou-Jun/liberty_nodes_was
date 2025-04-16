import { Injectable } from '@nestjs/common';
import { GoogleAuthReqDto } from '../dto/request/googleAuth.req.dto.js';
import { UserRepository } from '../repositories/user.repository.js';
import { JwtService } from '@nestjs/jwt';
import { User } from '../entities/user.entity.js';
import { RedisService } from './redis.service.js';
import { UpdateUsernameByIdReqDto } from '../dto/request/updateUsernameById.dto.js';

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

      const access_token = await this.createAccessToken(user.id, user.email);
      const refresh_token = await this.createRefreshToken(user.id, user.email);

      await this.redisService.set(String(user.id), String(refresh_token));

      return {
        access_token: access_token,
        refresh_token: refresh_token,
      }
    } catch (error) {
      console.error('Error in AuthService: ', error);
      throw new Error('Google login failed');
    }
  }
  async UpdateUsername(dto: UpdateUsernameByIdReqDto) {
    try {
      const user = await this.userRepository.updateUsernameById(dto);

      if (!user) {
        return {
          message: 'User not found',
        };
      }
      return {
        message: 'Username updated successfully',
        user: {
          id: user.id,
          username: user.username,
        },
      }
    } catch (error) {
      console.error('Error in AuthService: ', error);
      throw new Error('Register username failed');
    }
  }
  async createAccessToken(id: number, email: string) {
    const access_token = await this.jwtService.sign(
      {
        email: email,
        sub: id,
      },
      {
        secret: process.env.JWT_SECRET,
        expiresIn: '1d',
      }
    );
    return access_token;
  }
  async createRefreshToken(id: number, email: string) {
    const refresh_token = await this.jwtService.sign(
      {
        email: email,
        sub: id,
      },
      {
        secret: process.env.JWT_SECRET,
        expiresIn: '14d',
      }
    );
    return refresh_token;
  }
}
