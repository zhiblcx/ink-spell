import { R } from '@/shared/res/r';
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
import { UserService } from '../user/user.service';
import { RegisterDto } from './dto/register-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  async signIn(account: string, password: string) {
    try {
      const user = await this.validateLogin(account, password);
      const payload = { userId: user.id, account: user.account };
      return new R({
        data: { access_token: await this.jwtService.signAsync(payload) },
        message: '登录成功',
      });
    } catch (err) {
      throw new BadRequestException('账号或密码错误');
    }
  }

  async signUp(registerDao: RegisterDto, code?: string) {
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
      const pass = await hash(password, Number(env.HASH_SALT_OR_ROUNDS));
      if (email != null) {
        const index = this.userService
          .getRegisterEmail()
          .findIndex((item) => item.email === email);
        if (
          index != -1 &&
          this.userService.getRegisterEmail()[index].code === code
        ) {
          await this.userService.sendEmail(
            1,
            '[ink-spell]  注册邮箱请求 -- ',
            email,
          );
        } else {
          throw new UnprocessableEntityException('验证码错误');
        }
      }
      console.log(registerDao);
      try {
        const currentUser = await this.prisma.user.create({
          data: {
            account,
            password: pass,
            username,
            email,
            avatar: appConfig.DEFAULT_AVATAR,
            boofShlefs: {
              create: {
                label: '全部图书',
                createTimer: dayjs().toDate(),
                allFlag: true,
                position: 1,
                cover: appConfig.DEFAULT_BOOK_SHELF_COVER,
              },
            },
          },
        });
        console.log(currentUser);
        // const payload = {
        //   userId: currentUser.id,
        //   account: currentUser.account,
        // };
        // return new R({
        //   data: { access_token: await this.jwtService.signAsync(payload) },
        //   message: '登录成功',
        // });
      } catch (err) {
        console.log(err);
      }
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
