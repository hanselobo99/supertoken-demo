import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { loginObject, registerUserObject } from '../../common/api.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {
  }

  @Post('register')
  register(@Req() req: Request, @Res() res: Response, @Body() body: registerUserObject) {
    const result = this.authService.register(req, res, body);
    res.write(JSON.stringify(result));
    res.end();
  }

  @Post('login')
  async login(@Req() req: Request, @Res() res: Response, @Body() body: loginObject) {
    const result = await this.authService.login(req, res, body);
    res.write(JSON.stringify(result));
    res.end();
  }
}
