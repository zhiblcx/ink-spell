import { PrismaService } from '@/modules/prisma/prisma.service';
import { TransformTimeUtils } from '@/shared/utils/TransformTimeUtils';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ReadHistoryService {
  constructor(private prisma: PrismaService) { }

  // 返回用户最近阅读一百本小说
  async getReadHistory(userId) {
    return await this.prisma.readingHistory.findMany({
      where: {
        userId: userId
      },
      orderBy: {
        startTime: 'desc'
      },
      distinct: ['userId', 'bookId'],
      take: 100
    })
  }

  async updateReadHistory(readHistoryId: number) {
    const data = await this.prisma.readingHistory.findUnique({
      where: { id: readHistoryId }
    })
    data.endTime = new Date()

    return await this.prisma.readingHistory.update({
      where: { id: readHistoryId },
      data: {
        endTime: data.endTime,
        readTime: TransformTimeUtils.compareTimerMinute(data.startTime, data.endTime)
      }
    })
  }
}
