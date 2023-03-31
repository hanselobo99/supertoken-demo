import { IsEmail, IsNotEmpty, Matches, MinLength } from 'class-validator';

export class registerUserObject {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  username: string;

  @IsNotEmpty()
  @MinLength(8)
  @Matches(/[a-zA-Z$@%^&*0-9]$/, { message: 'password too weak' })
  password: string;
}

export class loginObject {
  @IsNotEmpty()
  @IsEmail()
  username: string;

  @IsNotEmpty()
  password: string;
}
