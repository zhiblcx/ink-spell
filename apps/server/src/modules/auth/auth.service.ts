import { ALL_BOOK } from '@/shared/constants';
import { R } from '@/shared/res/r';
import Email from '@/shared/utils/EmailTool';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcrypt';
import * as dayjs from 'dayjs';
import { env } from 'process';
import { appConfig } from '../../config/AppConfig';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDao } from './dto/login-auth.dto';
import { RegisterDto } from './dto/register-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  async generateToken(payload: { userId: number; account: string }) {
    return {
      access_token: await this.jwtService.signAsync(payload, {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
      }),
      refresh_token: await this.jwtService.signAsync(payload, {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN,
      }),
    };
  }

  async refreshToken(payload: { userId: number; account: string }) {
    return new R({
      data: await this.generateToken(payload),
      message: '刷新成功',
    });
  }

  async signIn(loginDao: LoginDao) {
    const { account, password } = loginDao;
    try {
      const user = await this.validateLogin(account, password);
      return new R({
        data: await this.generateToken({
          userId: user.id,
          account: user.account,
        }),
        message: '登录成功',
      });
    } catch (err) {
      throw new BadRequestException('账号或密码错误');
    }
  }

  async signUp(registerDao: RegisterDto) {
    const {
      account,
      password,
      username,
      email = null,
      code = null,
    } = registerDao;
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
      const pass = await hash(password, Number(env.HASH_SALT_OR_ROUNDS));
      if (email != null) {
        const index = Email.getRegisterEmail().findIndex(
          (item) => item.email === email,
        );
        if (index === -1 || Email.getRegisterEmail()[index].code !== code) {
          throw new UnprocessableEntityException('验证码错误');
        }
      }
      const currentUser = await this.prisma.user.create({
        data: {
          account,
          password: pass,
          username,
          email,
          avatar: appConfig.DEFAULT_AVATAR,
          bookShelfs: {
            create: {
              label: ALL_BOOK,
              createTimer: dayjs().toDate(),
              allFlag: true,
              position: 1,
              cover: appConfig.DEFAULT_BOOK_SHELF_COVER,
            },
          },
        },
      });
      return new R({
        data: await this.generateToken({
          userId: currentUser.id,
          account: currentUser.account,
        }),
        message: '登录成功',
      });
    }
  }

  async validateLogin(account: string, pass: string) {
    const user = await this.prisma.user.findUnique({
      where: { account, isDelete: false },
    });

    if (user && (await compare(pass, user.password))) {
      const { password: _, ...result } = user;
      return result;
    }
    throw new UnauthorizedException('账号或密码错误');
  }
}
