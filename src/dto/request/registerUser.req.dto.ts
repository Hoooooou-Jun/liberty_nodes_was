import { IsString, Length } from 'class-validator';

export class RegisterUsernameReqDto{
  @IsString()
  @Length(3, 20)
  username: string;
}
