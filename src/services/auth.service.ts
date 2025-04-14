import { Inject, Injectable } from '@nestjs/common';
import { GoogleAuthReqDto } from '../dto/request/googleAuth.req.dto.js';
import { UserRepository } from '../repositories/user.repository.js';
import { JwtService } from '@nestjs/jwt';
import { User } from '../entities/user.entity.js';
import { RegisterUsernameReqDto } from 'src/dto/request/registerUser.req.dto.js';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService
  ) {}

  async googleLogin(req: GoogleAuthReqDto) {
    try {
      const { user: { email, photo }, } = req;

      const user = await this.userRepository.findOneByEmail(email);
      console.log("user: ", user);

      if (!user) {
        await this.userRepository.createUser({
          email: email,
          profileImage: photo,
        });
        return null;
      }

      /* 언제 토큰을 줘야 할 지 모르겠다. */

      const access_token = this.createAccessToken(user);
      const refresh_token = this.createRefreshToken(user);

      return {
        access_token,
        refresh_token,
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
    return {
      access_token
    }
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
  }
}
