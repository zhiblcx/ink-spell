import Email from '@/shared/utils/EmailTool';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { compare, hash } from 'bcrypt';
import { env } from 'process';
import { PrismaService } from '../prisma/prisma.service';
import { TranslationService } from '../translation/translation.service';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly translation: TranslationService,
  ) {}

  async getProfileData(userId: number) {
    try {
      const { password: _, ...userInfo } = await this.prisma.user.findUnique({
        where: { id: userId },
        include: {
          books: {
            where: { isDelete: false },
          },
        },
      });

      if (!userInfo) {
        throw new UnauthorizedException(
          this.translation.t('auth.token_expired'),
        );
      }

      const books = await this.prisma.book.count({
        where: { userId, isDelete: false },
      });
      const followers = await this.prisma.follow.count({
        where: { followingId: userId, isDelete: false },
      });
      const following = await this.prisma.follow.count({
        where: { followerId: userId, isDelete: false },
      });

      return {
        ...userInfo,
        booksInfo: userInfo.books,
        books,
        followers,
        following,
      };
    } catch (err) {
      throw new UnauthorizedException(this.translation.t('auth.token_expired'));
    }
  }

  async getProfile(user) {
    return await this.getProfileData(parseInt(user.userId));
  }

  async getUserInfo(userId) {
    return await this.getProfileData(parseInt(userId));
  }

  async getBookshelf(userId) {
    return await this.prisma.bookShelf.findMany({
      where: {
        userId: parseInt(userId),
        isPublic: true,
        isDelete: false,
      },
    });
  }

  async deleteUser(userId) {
    await this.prisma.user.update({
      data: { isDelete: true },
      where: { id: parseInt(userId) },
    });
  }

  async updatePersonUserInfo(userId, updateUserDto) {
    const updateUser = async (userData) => {
      return await this.prisma.user.update({
        data: userData,
        where: { id: parseInt(userId) },
      });
    };

    // 用户没有邮箱，直接更新
    if (updateUserDto.email === undefined) {
      return await updateUser(updateUserDto);
    }

    const { email, code } = updateUserDto;
    const userEmail = await this.prisma.user.findUnique({
      where: { id: userId },
    });
    // 证明没有修改邮箱
    if (userEmail.email === email) {
      return await updateUser(updateUserDto);
    }

    const index = Email.getUpdatePasswordByEmail().findIndex(
      (userEmail) => userEmail.email == email && userEmail.code == code,
    );
    if (index != -1) {
      return await this.prisma.user.update({
        data: { ...updateUserDto },
        where: { id: parseInt(userId) },
      });
    }
    throw new BadRequestException();
  }

  async updatePassword(userId, updateUserDto) {
    const user = await this.prisma.user.findUnique({
      where: { id: parseInt(userId) },
    });
    if (!(await compare(updateUserDto.password, user.password))) {
      throw new BadRequestException(
        this.translation.t('validation.incorrect_original_password'),
      );
    } else {
      return await this.prisma.user.update({
        where: { id: parseInt(userId) },
        data: {
          password: await hash(
            updateUserDto.newPassword,
            Number(env.HASH_SALT_OR_ROUNDS),
          ),
        },
      });
    }
  }

  async handleGetMessages() {
    const messages = await this.prisma.message.findMany({
      orderBy: {
        createTimer: 'asc',
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            avatar: true,
            email: true,
            books: {
              where: { isDelete: false },
              select: { id: true },
            },
            followers: {
              where: { isDelete: false },
              select: { id: true },
            },
            following: {
              where: { isDelete: false },
              select: { id: true },
            },
          },
        },
      },
      take: 200,
    });

    const messageResult = messages.map((item) => ({
      ...item,
      user: {
        ...item.user,
        books: item.user.books.length,
        followers: item.user.followers.length,
        following: item.user.following.length,
      },
    }));

    return messageResult;
  }

  async getUserInfoByUsername(username, page, limit) {
    // 模糊匹配用户名
    const users = await this.prisma.user.findMany({
      where: {
        username: {
          contains: username,
        },
        isDelete: false,
      },
      include: {
        books: {
          where: {
            isDelete: false,
          },
        },
        followers: {
          where: { isDelete: false },
          select: { id: true },
        },
        following: {
          where: { isDelete: false },
          select: { id: true },
        },
      },
      skip: (page - 1) * limit,
      take: parseInt(limit),
    });
    if (users.length === 0) {
      throw new NotFoundException(
        this.translation.t('validation.no_matching_user_found'),
      );
    } else {
      const result = users.map((user) => ({
        ...user,
        books: user.books.length,
        followers: user.followers.length,
        following: user.following.length,
      }));
      return result;
    }
  }

  async getAllUser() {
    return await this.prisma.user.findMany({
      where: { isDelete: false },
      select: {
        id: true,
        username: true,
        account: true,
        sex: true,
        email: true,
        avatar: true,
      },
    });
  }

  // 状态，内容，参数
  async sendEmail(status, html, parameter) {
    // 0 忘记密码，1 注册邮箱
    try {
      if (!status) {
        const user = await this.prisma.user.findUnique({
          where: { account: parameter },
          select: { email: true, account: true },
        });

        if (user === null) {
          throw new NotFoundException(
            this.translation.t('validation.account_not_found'),
          );
        }

        if (user.email === null) {
          throw new NotFoundException(
            this.translation.t('validation.account_not_linked_to_email'),
          );
        }

        await Email.send({
          email: user.email,
          html,
          account: user.account,
        });
        return user.email;
      } else {
        // 注册邮箱
        await Email.send({
          email: parameter,
          html,
        });
      }
    } catch (err) {
      if (err.status == 404) {
        throw new NotFoundException(err.message);
      }
      throw new BadRequestException(
        this.translation.t('validation.email_sending_failed'),
      );
    }
  }

  async updateForgetPassword(email: string, code: string, password: string) {
    const index = Email.getUpdatePasswordByEmail().findIndex(
      (userEmail) => userEmail.email == email && userEmail.code == code,
    );
    if (index != -1) {
      return await this.prisma.user.update({
        where: { email: email },
        data: {
          password: await hash(password, Number(env.HASH_SALT_OR_ROUNDS)),
        },
      });
    }
    throw new BadRequestException(this.translation.t('auth.token_expired'));
  }

  async resetPassword(userId, password) {
    const pass = await hash(password, Number(env.HASH_SALT_OR_ROUNDS));
    return await this.prisma.user.update({
      where: { id: parseInt(userId) },
      data: { password: pass },
    });
  }
}
