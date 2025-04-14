import { IsEmail, IsOptional, IsString } from 'class-validator';

export class CreateUserReqDto {
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  profileImage?: string;
}
