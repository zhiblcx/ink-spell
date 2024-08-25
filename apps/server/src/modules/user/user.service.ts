import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getProfile(user) {
    const { password: _, ...userInfo } = await this.prisma.user.findUnique({
      where: { id: user.userId },
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
  }

  async getUserInfo(userId) {
    const { password: _, ...userInfo } = await this.prisma.user.findUnique({
      where: { id: parseInt(userId), isDelete: false },
    });
    return userInfo;
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
}
