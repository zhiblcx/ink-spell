import { APIResponse } from '@/core/decorator/APIResponse';
import { Public } from '@/core/decorator/auth.decorator';
import {
  BadGatewayException,
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDao } from './dto/login-auth.dto';
import { RegisterDto } from './dto/register-auth.dto';
import { LoginVo } from './vo/login-auth-vo';
import axios, { AxiosResponse } from 'axios';
import { writeFile } from 'node:fs';
import { env } from 'node:process';
import { appConfig } from '@/config/AppConfig';
import { OauthEnum } from '@/shared/enums/oauth.enum';

@Controller('/auth')
@ApiTags('认证')
export class AuthController {
  constructor(private readonly authService: AuthService) { }
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

  // 第三方登录
  @Public()
  @HttpCode(HttpStatus.OK)
  @Get('/oauth')
  @ApiOperation({ summary: '第三方登录' })
  async getAccessToken(@Query('code') code: string) {
    const imagePath = appConfig.OAUTH_REGISTER_AVATAR + `${new Date().getTime()}.png`;
    if (!code) {
      throw new HttpException('Missing code parameter', HttpStatus.BAD_REQUEST);
    }

    try {
      const tokenResponse = await axios({
        method: 'post',
        url:
          'https://github.com/login/oauth/access_token?' +
          `client_id=${env.CLIENT_ID}&` +
          `client_secret=${env.CLIENT_SECRETS}&` +
          `code=${code}`,
        headers: {
          accept: 'application/json',
        },
        timeout: 10 * 1000
      });
      const accessToken = tokenResponse.data.access_token;

      const result = await axios({
        method: 'get',
        url: `https://api.github.com/user`,
        headers: {
          accept: 'application/json',
          Authorization: `token ${accessToken}`,
        },
      });
      const user = result.data
      // login 账号
      // name  用户名
      // avatar_url 头像
      // 密码默认 123456

      // 注册用户
      const isDownloadAvatar = await this.authService.validateOauth(user.login, OauthEnum.GITHUB)
      if (!isDownloadAvatar) {
        // 下载用户的头像
        await axios({
          method: "GET",
          url: user.avatar_url,
          responseType: 'arraybuffer',
        }).then((response: AxiosResponse) => {
          writeFile(imagePath, response.data, 'binary', function (err) {
            if (err) {
              console.log("下载失败", err);
            } else {
              console.log("下载成功");
            }
          });
        })
      }

      return await this.authService.oauth({
        account: user.login,
        username: user.name,
        password: appConfig.DEFAULT_PASSWORD,
        avatar: imagePath.replace("public", "static"),
      }, OauthEnum.GITHUB)
    } catch (err) {
      throw new BadGatewayException("连接超时")
    }
  }
}
