import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getProfile(user) {
    const { password: _, ...userInfo } = await this.prisma.user.findUnique({
      where: { id: user.userId },
    });
    const booksCount = await this.prisma.book.count({
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
      booksCount,
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
}
