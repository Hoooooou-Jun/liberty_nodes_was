import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { RedisService } from "../services/redis.service.js";
import { JwtPayload } from "../types/index.js";

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, 'refresh_token') {
  constructor(
    private configService: ConfigService,
    private readonly redisService: RedisService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>('JWT_SECRET') || 'secretKey',
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: JwtPayload) {
    const refresh_token = req.headers['authorization']?.split('Bearer ')[1];
    const redisToken = await this.redisService.get(String(payload.sub));
    if (refresh_token !== redisToken) {
      throw new Error('Unauthorized');
    }
    return {
      ...payload,
      refresh_token,
    };
  }
}