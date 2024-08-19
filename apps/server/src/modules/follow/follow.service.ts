import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FollowService {
  constructor(private prisma: PrismaService) {}

  // 获取关注列表
  async getFollower(userId, page, limit) {
    return await this.prisma.follow.findMany({
      where: {
        followerId: userId,
        isDelete: false,
      },
      include: {
        following: true,
      },
      skip: (page - 1) * limit,
      take: parseInt(limit),
    });
  }

  // 获取粉丝列表
  async getFollowing(userId, page, limit) {
    return await this.prisma.follow.findMany({
      where: {
        followingId: userId,
        isDelete: false,
      },
      include: {
        follower: true,
      },
      skip: (page - 1) * limit,
      take: parseInt(limit),
    });
  }

  async follower(req, followID) {
    const follow = await this.prisma.follow.findFirst({
      where: {
        followerId: req.user.userId,
        followingId: parseInt(followID),
      },
    });
    if (follow) {
      return await this.prisma.follow.update({
        where: { id: follow.id },
        data: { isDelete: false },
      });
    } else {
      return await this.prisma.follow.create({
        data: {
          followerId: parseInt(req.user.userId),
          followingId: parseInt(followID),
        },
      });
    }
  }

  async cancelFollower(req, followID) {
    const follow = await this.prisma.follow.findFirst({
      where: {
        followerId: req.user.userId,
        followingId: parseInt(followID),
      },
    });
    if (follow) {
      return await this.prisma.follow.update({
        where: { id: follow.id },
        data: { isDelete: true },
      });
    }
  }
}
