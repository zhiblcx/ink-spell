import { appConfig } from '@/config/AppConfig';
import { APIResponse } from '@/core/decorator/APIResponse';
import { Public } from '@/core/decorator/auth.decorator';
import { OauthEnum } from '@/shared/enums/oauth.enum';
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
import axios, { AxiosResponse } from 'axios';
import { writeFile } from 'node:fs';
import { env } from 'node:process';
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

  // 第三方登录
  @Public()
  @HttpCode(HttpStatus.OK)
  @Get('/oauth')
  @ApiOperation({ summary: '第三方登录' })
  async getAccessToken(
    @Query('code') code: string,
    @Query('method') method: string,
  ) {
    if (!code) {
      throw new HttpException('Missing code parameter', HttpStatus.BAD_REQUEST);
    }

    switch (method) {
      case OauthEnum.GITHUB:
        await this.handleOauthRequest({
          apiUrl:
            'https://github.com/login/oauth/access_token?' +
            `client_id=${env.GITHUB_CLIENT_ID}&` +
            `client_secret=${env.GITHUB_CLIENT_SECRETS}&` +
            `code=${code}`,
          userUrl: 'https://api.github.com/user',
          method,
        });
        break;

      case OauthEnum.GITEE:
        await this.handleOauthRequest({
          apiUrl:
            'https://gitee.com/oauth/token?grant_type=authorization_code&' +
            'redirect_uri=http://127.0.0.1:6600/oauth?method=gitee&' +
            `client_id=${env.GITEE_CLIENT_ID}&` +
            `client_secret=${env.GITEE_CLIENT_SECRET}&` +
            `code=${code}`,
          userUrl: 'https://gitee.com/api/v5/user/',
          method,
        });
        break;
    }
  }

  // 第三方登录请求
  async handleOauthRequest({
    apiUrl,
    userUrl,
    method,
  }: {
    apiUrl: string;
    userUrl: string;
    method: OauthEnum;
  }) {
    const imagePath =
      appConfig.OAUTH_REGISTER_AVATAR + `${new Date().getTime()}.png`;

    try {
      const tokenResponse = await axios({
        method: 'post',
        url: apiUrl,
        headers: { accept: 'application/json' },
        timeout: 10 * 1000,
      });
      const accessToken = tokenResponse.data.access_token;

      const result = await axios({
        method: 'get',
        url: userUrl + `?access_token=${accessToken}`,
        headers: {
          accept: 'application/json',
          Authorization: `token ${accessToken}`,
        },
      });
      const user = result.data;
      // login 账号
      // name  用户名
      // avatar_url 头像
      // 密码默认 123456

      // 注册用户
      const isDownloadAvatar = await this.authService.validateOauth(
        user.login,
        method,
      );
      if (!isDownloadAvatar) {
        // 下载用户的头像
        await this.downloadAvatar(user.avatar_url, imagePath);
      }

      return await this.authService.oauth(
        {
          account: user.login,
          username: user.name,
          password: appConfig.DEFAULT_PASSWORD,
          avatar: imagePath.replace('public', 'static'),
        },
        method,
      );
    } catch (err) {
      throw new BadGatewayException('连接超时');
    }
  }
  // 下载头像
  async downloadAvatar(avatar_url: string, imagePath: string) {
    await axios({
      method: 'GET',
      url: avatar_url,
      responseType: 'arraybuffer',
    }).then((response: AxiosResponse) => {
      writeFile(imagePath, response.data, 'binary', function (err) {
        if (err) {
          console.log('下载失败', err);
        } else {
          console.log('下载成功');
        }
      });
    });
  }
}
