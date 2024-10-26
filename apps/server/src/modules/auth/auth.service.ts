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
import { TranslationService } from '../translation/translation.service';
import { LoginDao } from './dto/login-auth.dto';
import { RegisterDto } from './dto/register-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
    private readonly translation: TranslationService,
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

  async refreshToken(refreshToken: string) {
    try {
      const { userId, account } =
        await this.jwtService.verifyAsync(refreshToken);
      return new R({
        data: await this.generateToken({ userId, account }),
        message: this.translation.t('prompt.refresh_successful'),
      });
    } catch (_) {
      throw new UnauthorizedException(this.translation.t('auth.token_expired'));
    }
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
        message: this.translation.t('prompt.login_successful'),
      });
    } catch (err) {
      throw new BadRequestException(
        this.translation.t('auth.incorrect_username_or_password'),
      );
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
        throw new UnprocessableEntityException(
          this.translation.t('auth.username_exists'),
        );
      }
      if (user.username === username) {
        throw new UnprocessableEntityException(
          this.translation.t('auth.username_exists'),
        );
      }
    } else {
      const pass = await hash(password, Number(env.HASH_SALT_OR_ROUNDS));
      if (email != null) {
        const index = Email.getRegisterEmail().findIndex(
          (item) => item.email === email,
        );
        if (index === -1 || Email.getRegisterEmail()[index].code !== code) {
          throw new UnprocessableEntityException(
            this.translation.t('auth.token_expired'),
          );
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
        message: this.translation.t('prompt.login_successful'),
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
    throw new UnauthorizedException(
      this.translation.t('auth.incorrect_username_or_password'),
    );
  }
}
