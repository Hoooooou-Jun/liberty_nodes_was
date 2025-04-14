import { IsEmail, IsString } from "class-validator";

class GoogleUser {
  @IsEmail()
  email: string;

  @IsString()
  name: string;

  @IsString()
  photo: string;
}

export type GoogleAuthReqDto = Request & { user: GoogleUser };