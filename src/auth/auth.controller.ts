import { Controller, UseGuards, Post, Req, Get, Res } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Req() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(AuthGuard('google'))
  @Get('google')
  async signInWithGoogle() {}

  @UseGuards(AuthGuard('google'))
  @Get('google/callback')
  async signInWithGoogleRedirect(@Req() req, @Res() res: Response) {
    const { access_token } = await this.authService.signInWithGoogle(req);
    res.cookie('token', access_token);
    return req.user;
  }
}
