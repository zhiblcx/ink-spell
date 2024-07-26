import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Public } from '../../shared/utils/setMetadata';
import { AuthService } from './auth.service';
import { LoginDao } from './dto/login-auth.dto';
import { RegisterDto } from './dto/register-auth.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LoginVo } from './vo/login-auth-vo';

@Controller('/auth')
@ApiTags('认证')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('local'))
  @Post('login')
  @ApiOperation({ summary: '登录' })
  @ApiResponse({
    description: '返回实例',
    type: LoginVo,
  })
  signIn(@Body() loginDao: LoginDao) {
    return this.authService.signIn(loginDao);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('register')
  @ApiOperation({ summary: '注册' })
  @ApiResponse({
    description: '返回示例',
    type: LoginVo,
  })
  signUp(@Body() registerDto: RegisterDto) {
    return registerDto;
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
