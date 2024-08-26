import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FollowService {
  constructor(private prisma: PrismaService) {}

  // 获取关注列表
  async getFollower(userId, page, limit) {
    const follower = await this.prisma.follow.findMany({
      where: {
        followerId: userId,
        isDelete: false,
      },
      include: {
        following: true,
      },
      orderBy: {
        id: 'desc',
      },
      skip: (page - 1) * limit,
      take: parseInt(limit),
    });

    const following = await this.prisma.follow.findMany({
      where: {
        followingId: userId,
        isDelete: false,
      },
      select: {
        followerId: true,
      },
      orderBy: {
        id: 'desc',
      },
    });
    const followingIds = following.map((item) => item.followerId);

    const followerWithMutual = follower.map((item) => ({
      ...item,
      isMutual: followingIds.includes(item.followingId),
    }));

    return followerWithMutual;
  }

  // 获取粉丝列表
  async getFollowing(userId, page, limit) {
    const following = await this.prisma.follow.findMany({
      where: {
        followingId: userId,
        isDelete: false,
      },
      include: {
        follower: true,
      },
      orderBy: {
        id: 'desc',
      },
      skip: (page - 1) * limit,
      take: parseInt(limit),
    });

    const follower = await this.prisma.follow.findMany({
      where: {
        followerId: userId,
        isDelete: false,
      },
      select: {
        followingId: true,
      },
    });
    const followerIds = follower.map((item) => item.followingId);

    const followingWithMutual = following.map((item) => ({
      ...item,
      isMutual: followerIds.includes(item.followerId),
    }));

    return followingWithMutual;
  }

  async follower(req, followID) {
    const follow = await this.prisma.follow.findFirst({
      where: {
        followerId: req.user.userId,
        followingId: parseInt(followID),
      },
    });

    if (follow) {
      if (follow.isDelete) {
        return await this.prisma.follow.update({
          where: { id: follow.id },
          data: { isDelete: false },
        });
      } else {
        throw new ConflictException('咦，看起来已经关注了呢。');
      }
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
