import { APIResponse } from '@/core/decorator/APIResponse';
import { Public } from '@/core/decorator/auth.decorator';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDao } from './dto/login-auth.dto';
import { RegisterDto } from './dto/register-auth.dto';
import { LoginVo } from './vo/login-auth-vo';

@Controller('/auth')
@ApiTags('认证')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiOperation({ summary: '登录' })
  @APIResponse(LoginVo, '登录成功')
  async signIn(@Body() loginDao: LoginDao) {
    return await this.authService.signIn(loginDao);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('register')
  @ApiOperation({ summary: '注册' })
  @APIResponse(LoginVo, '登录成功')
  async signUp(@Body() registerDto: RegisterDto) {
    return await this.authService.signUp(registerDto);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Get('/refresh')
  @ApiOperation({ summary: '刷新token' })
  @APIResponse(LoginVo, '刷新成功')
  async refresh_token(@Query('refresh_token') refreshToken: string) {
    return await this.authService.refreshToken(refreshToken);
  }
}
