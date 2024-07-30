import { APIResponse } from '@/core/decorator/APIResponse';
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from '../../shared/utils/setMetadata';
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
  signIn(@Body() loginDao: LoginDao) {
    return this.authService.signIn(loginDao.account, loginDao.password);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('register')
  @ApiOperation({ summary: '注册' })
  @APIResponse(LoginVo, '登录成功')
  signUp(@Body() registerDto: RegisterDto) {
    return this.authService.signUp(registerDto);
  }
}
