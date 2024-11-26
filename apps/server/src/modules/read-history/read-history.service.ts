import { PrismaService } from '@/modules/prisma/prisma.service';
import { TransformTimeUtils } from '@ink-spell/utils'
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
      take: 100,
      include: {
        book: true
      }
    })
  }


  async updateReadHistory(userId: number, bookId: number) {
    const data = await this.prisma.readingHistory.findUnique({
      where: {
        bookId_userId: {
          bookId, userId
        }
      }
    })
    data.endTime = new Date()

    return await this.prisma.readingHistory.update({
      where: {
        bookId_userId: {
          bookId, userId
        }
      },
      data: {
        endTime: data.endTime,
        readTime: Number(TransformTimeUtils.compareTimerMinute(data.startTime, data.endTime)) + data.readTime
      }
    })
  }

  async createReadHistory(userId: number, bookId: number) {
    const history = await this.prisma.readingHistory.findUnique({
      where: { bookId_userId: { bookId, userId } }
    })

    // 如果有记录的
    if (history) {
      await this.prisma.readingHistory.update({
        where: { id: history.id },
        data: {
          startTime: new Date()
        }
      })
    } else {
      // 如果没有记录
      await this.prisma.readingHistory.create({
        data: {
          userId, bookId
        }
      })
    }
  }
}
