import { ALL_BOOK } from '@/shared/constants';
import { OauthEnum } from '@/shared/enums/oauth.enum';
import { R } from '@/shared/res/r';
import Email from '@/shared/utils/EmailTool';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcryptjs';
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

  async generateToken(payload: {
    userId: number;
    account: string;
    roles: string;
  }) {
    await this.prisma.user.update({
      where: { id: payload.userId },
      data: { offlineTime: new Date() },
    });
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
      const { userId, account, roles } =
        await this.jwtService.verifyAsync(refreshToken);
      return new R({
        data: await this.generateToken({ userId, account, roles }),
        message: this.translation.t('prompt.refresh_successful'),
      });
    } catch (_) {
      return new R({
        code: 401,
        message: this.translation.t('auth.token_expired'),
      });
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
          roles: user.rolesId,
        }),
        message: this.translation.t('prompt.login_successful'),
      });
    } catch (err) {
      throw new BadRequestException(
        this.translation.t('auth.incorrect_username_or_password'),
      );
    }
  }

  async signUp(registerDao: RegisterDto, oauth?: OauthEnum) {
    const {
      account,
      password,
      username,
      email = null,
      code = null,
    } = registerDao;
    const user = await this.prisma.user.findFirst({
      where: { OR: [{ account }, { username }], AND: { oauth } },
    });
    if (user) {
      if (user.account === account) {
        throw new UnprocessableEntityException(
          this.translation.t('auth.account_exists'),
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
          avatar: registerDao.avatar ?? appConfig.DEFAULT_AVATAR,
          oauth: oauth ?? OauthEnum.LOCAL,
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
          roles: currentUser.rolesId,
        }),
        message: this.translation.t('prompt.login_successful'),
      });
    }
  }

  async validateLogin(account: string, pass: string) {
    const users = await this.prisma.user.findMany({
      where: { account, isDelete: false },
    });

    for (const user of users) {
      if (await compare(pass, user.password)) {
        const { password: _, ...result } = user;
        return result;
      }
    }

    throw new UnauthorizedException(
      this.translation.t('auth.incorrect_username_or_password'),
    );
  }

  // true 为存在 false 为不存在
  async validateOauth(account: string, oauth: OauthEnum) {
    const user = await this.prisma.user.findUnique({
      where: {
        account_oauth: {
          account,
          oauth,
        },
        isDelete: false,
      },
    });
    return user !== null;
  }

  async oauth(registerDao: RegisterDto, oauthMethod: OauthEnum) {
    const user = await this.prisma.user.findUnique({
      where: {
        account_oauth: {
          account: registerDao.account,
          oauth: oauthMethod,
        },
        isDelete: false,
      },
    });

    // 如果没有账号则进行注册
    if (!user) {
      return await this.signUp(registerDao, oauthMethod);
    } else {
      // 直接登录
      return new R({
        data: await this.generateToken({
          userId: user.id,
          account: user.account,
          roles: user.rolesId,
        }),
        message: this.translation.t('prompt.login_successful'),
      });
    }
  }
}
