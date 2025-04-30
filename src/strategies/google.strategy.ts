import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';

export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/auth/google/callback',
      scope: ['email', 'profile'],
      prompt: 'select_account'
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback) {
    try {
      const { displayName, emails, photos } = profile;
      console.log('🚀 🔶 GoogleStrategy 🔶 validate 🔶 profile:', profile);
      const user = {
        email: emails[0].value,
        name: displayName,
        photo: photos[0].value,
      };
      done(null, user);
    } catch (error) {
      done(error);
    }
  }
}