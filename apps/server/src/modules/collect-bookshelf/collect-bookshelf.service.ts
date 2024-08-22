import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CollectBookshelfService {
  constructor(private prisma: PrismaService) {}
  async collectBookShelf(userId, bookShelfId) {
    const result = await this.prisma.collectBookShelf.findUnique({
      where: {
        userId_bookShelfId: {
          userId: parseInt(userId),
          bookShelfId: parseInt(bookShelfId),
        },
      },
    });

    if (result) {
      throw new UnprocessableEntityException('已经收藏过该书架');
    }

    return this.prisma.collectBookShelf.create({
      data: {
        userId: parseInt(userId),
        bookShelfId: parseInt(bookShelfId),
      },
    });
  }

  async unCollectBookShelf(collectBookShelfId) {
    return this.prisma.collectBookShelf.update({
      where: {
        id: parseInt(collectBookShelfId),
      },
      data: {
        isDelete: true,
      },
    });
  }
}
