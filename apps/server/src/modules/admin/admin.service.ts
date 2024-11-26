import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { TransformTimeUtils } from '@/shared/utils/TransformTimeUtils';

@Injectable()
export class AdminService {
  constructor(
    private readonly prisma: PrismaService
  ) { }
  async getDashboardState() {
    const userNumber = await this.prisma.user.count({
      where: { isDelete: false }
    })

    const bookNumber = await this.prisma.book.count({
      where: { isDelete: false }
    })

    const bookshelfNumber = await this.prisma.bookShelf.count({
      where: { isDelete: false }
    })

    // 存储每天上传的书籍量
    const bookNumberList: { time: string, bookNumber: number }[] = []

    for (let i = TransformTimeUtils.getUnitsBefore(6); i <= TransformTimeUtils.formatDateYMD(); i = TransformTimeUtils.getUnitsAfter(1, new Date(i))) {
      const count = await this.prisma.book.count({
        where: {
          createTimer: {
            gte: new Date(i + 'T00:00:00Z'),
            lt: new Date(i + 'T23:59:59Z'),
          }
        }
      })
      bookNumberList.push({ time: i, bookNumber: count })
    }

    return {
      userNumber,
      bookNumber,
      bookshelfNumber,
      bookNumberList
    }
  }

}
