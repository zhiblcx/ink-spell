import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getProfile(user) {
    try {
      const { password: _, ...userInfo } = await this.prisma.user.findUnique({
        where: { id: parseInt(user.userId) },
        include: {
          books: {
            where: {
              isDelete: false,
            },
          },
        },
      });
      const books = await this.prisma.book.count({
        where: { userId: user.userId, isDelete: false },
      });
      const followers = await this.prisma.follow.count({
        where: { followingId: user.userId, isDelete: false },
      });
      const following = await this.prisma.follow.count({
        where: { followerId: user.userId, isDelete: false },
      });

      return {
        ...userInfo,
        booksInfo: userInfo.books,
        books,
        followers,
        following,
      };
    } catch (err) {
      throw new UnauthorizedException();
    }
  }

  async getUserInfo(userId) {
    const { password: _, ...userInfo } = await this.prisma.user.findUnique({
      where: {
        id: parseInt(userId),
        isDelete: false,
      },
      include: {
        books: {
          where: {
            isDelete: false,
          },
        },
      },
    });

    const books = await this.prisma.book.count({
      where: { userId: parseInt(userId), isDelete: false },
    });
    const followers = await this.prisma.follow.count({
      where: { followingId: parseInt(userId), isDelete: false },
    });
    const following = await this.prisma.follow.count({
      where: { followerId: parseInt(userId), isDelete: false },
    });

    return {
      ...userInfo,
      booksInfo: userInfo.books,
      books,
      followers,
      following,
    };
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
    return await this.prisma.user.update({
      data: { ...updateUserDto },
      where: { id: parseInt(userId) },
    });
  }

  async updatePassword(userId, updateUserDto) {
    const user = await this.prisma.user.findUnique({
      where: { id: parseInt(userId) },
    });

    if (user.password !== updateUserDto.password) {
      throw new BadRequestException({
        message: '原密码错误',
      });
    } else {
      return await this.prisma.user.update({
        where: { id: parseInt(userId) },
        data: { password: updateUserDto.newPassword },
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
      throw new NotFoundException('哎呀，未找到匹配的用户！');
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
}
