import { APIResponse } from '@/core/decorator/APIResponse';
import { Public } from '@/core/decorator/auth.decorator';
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDao } from './dto/login-auth.dto';
import { RegisterDto } from './dto/register-auth.dto';
import { LoginVo } from './vo/login-auth-vo';

@Controller('/auth')
@ApiTags('认证')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiOperation({ summary: '登录' })
  @APIResponse(LoginVo, '登录成功')
  async signIn(@Body() loginDao: LoginDao) {
    return this.authService.signIn(loginDao);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('register')
  @ApiOperation({ summary: '注册' })
  @APIResponse(LoginVo, '登录成功')
  async signUp(@Body() registerDto: RegisterDto) {
    return this.authService.signUp(registerDto);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('/refresh/:refresh_token')
  @ApiOperation({ summary: '刷新token' })
  @APIResponse(LoginVo, '刷新成功')
  async refresh_token(@Param('refresh_token') refresh_token: string) {
    try {
      const payload = await this.jwtService.verifyAsync(refresh_token);
      return this.authService.refreshToken({
        userId: payload,
        account: payload.account,
      });
    } catch (_) {
      throw new UnauthorizedException();
    }
  }
}
