import {
  Controller,
  Get,
  Post,
  Request,
  Response,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req, @Response() res) {
    const { access_token } = await this.authService.login(req.user);
    res.cookie('access_token', access_token, {
      httpOnly: true,
      secure: true,
      sameSite: 'None',
      domain: process.env.COOKIE_DOMAIN,
      expires: new Date(Date.now() + 1 * 24 * 60 * 1000),
    });
    res.cookie('is_logged_in', true, {
      secure: true,
      sameSite: 'None',
      domain: process.env.COOKIE_DOMAIN,
      expires: new Date(Date.now() + 1 * 24 * 60 * 1000),
    });
    res.send({ status: 'ok' });
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  logout(@Request() req, @Response() res) {
    res.clearCookie('access_token', {
      domain: process.env.COOKIE_DOMAIN,
      path: '/',
    });
    res.clearCookie('is_logged_in', {
      domain: process.env.COOKIE_DOMAIN,
      path: '/',
    });
    res.send({ status: 'ok' });
  }

  @UseGuards(JwtAuthGuard)
  @Get('connected-user')
  getConnectedUser(@Request() request) {
    return this.usersService.findOne(request.user.username);
  }
}
