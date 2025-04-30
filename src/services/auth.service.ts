import { BadRequestException, Injectable } from '@nestjs/common';
import { GoogleAuthReqDto } from '../dto/request/googleAuth.req.dto.js'; // Ensure this import points to the correct file and type definition
import { UserRepository } from '../repositories/user.repository.js';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { RedisService } from './redis.service.js';
import { UpdateUsernameByIdReqDto } from '../dto/request/updateUsernameById.dto.js';


@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly http: HttpService,
    private readonly jwtService: JwtService,
    private readonly redisService: RedisService
  ) {}

  async googleLogin(req: GoogleAuthReqDto) {
    try {
      const { user: { email, photo }, } = req;

      let isNewUser = false;
      let user = await this.userRepository.findOneByEmail(email);

      if (!user) {
        user = await this.userRepository.createUser({
          email: email,
          profileImage: photo,
        });
        isNewUser = true;
      }

      const access_token = await this.createAccessToken(user.id, user.email);
      const refresh_token = await this.createRefreshToken(user.id, user.email);

      await this.redisService.set(String(user.id), String(refresh_token));

      return {
        isNewUser,
        access_token: access_token,
        refresh_token: refresh_token,
      }
    } catch (error) {
      console.error('Error in AuthService: ', error);
      throw new Error('Google login failed');
    }
  }
  async exchangeGoogleCode(code: string) {
    const googleProfileResponse = await firstValueFrom(
      this.http.get('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: { Authorization: `Bearer ${code}` },
      }),
    ).catch(() => {
      throw new BadRequestException('Invalid Google access token');
    });

    const dto = {
      user: {
        email: googleProfileResponse.data.email,
        name: googleProfileResponse.data.name,
        photo: googleProfileResponse.data.picture,
      },
    } as GoogleAuthReqDto;
    return await this.googleLogin(dto);
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
