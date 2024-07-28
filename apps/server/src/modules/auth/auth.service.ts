import {
  Injectable,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { appConfig } from '../../config/AppConfig';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dto/register-auth.dto';
import { LoginVo } from './vo/login-auth-vo';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  async signIn(account: string, password: string) {
    const user = await this.validateLogin(account, password);
    const payload = { userId: user.id, account: user.account };
    return new LoginVo({
      data: { access_token: await this.jwtService.signAsync(payload) },
      message: '登录成功',
    });
  }

  async signUp(registerDao: RegisterDto) {
    const { account, password, username, email = null } = registerDao;
    const user = await this.prisma.user.findFirst({
      where: { OR: [{ account }, { username }] },
    });
    if (user) {
      if (user.account === account) {
        throw new UnprocessableEntityException('账号已存在');
      }
      if (user.username === username) {
        throw new UnprocessableEntityException('用户名已存在');
      }
    } else {
      const currentUser = await this.prisma.user.create({
        data: {
          account,
          password,
          username,
          email,
          avatar: appConfig.DEFAULT_AVATAR,
        },
      });
      const payload = { userId: currentUser.id, account: currentUser.account };
      return new LoginVo({
        data: { access_token: await this.jwtService.signAsync(payload) },
        message: '登录成功',
      });
    }
  }

  async validateLogin(account: string, pass: string) {
    const user = await this.prisma.user.findUnique({ where: { account } });
    if (user && user.password === pass) {
      const { password: _, ...result } = user;
      return result;
    }
    throw new UnauthorizedException('账号或密码错误');
  }
}
