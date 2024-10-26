import { E } from '@/shared/res/e';
import { R } from '@/shared/res/r';
import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { TranslationService } from '../translation/translation.service';

@Injectable()
export class FollowService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly translation: TranslationService,
  ) {}

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

    return new R({
      message: this.translation.t('prompt.acquire_successful'),
      data: new E({
        items: followerWithMutual,
        currentPage: page,
        itemsPerPage: limit,
      }),
    });
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

    return new R({
      message: this.translation.t('prompt.acquire_successful'),
      data: new E({
        items: followingWithMutual,
        currentPage: page,
        itemsPerPage: limit,
      }),
    });
  }

  // 关注
  async follower(req, followID) {
    const followerId = parseInt(req.user.userId);
    const followingId = parseInt(followID);
    const existingFollow = await this.prisma.follow.findFirst({
      where: { followerId, followingId },
    });

    if (existingFollow) {
      if (existingFollow.isDelete) {
        return await this.prisma.follow.update({
          where: { id: existingFollow.id },
          data: { isDelete: false },
        });
      } else {
        throw new ConflictException(
          this.translation.t('validation.already_followed'),
        );
      }
    } else {
      return await this.prisma.follow.create({
        data: { followerId, followingId },
      });
    }
  }

  // 取关
  async cancelFollower(req, followID) {
    const follow = await this.prisma.follow.findFirst({
      where: {
        followerId: req.user.userId,
        followingId: parseInt(followID),
      },
    });
    if (follow) {
      await this.prisma.follow.update({
        where: { id: follow.id },
        data: { isDelete: true },
      });
    }
  }
}
