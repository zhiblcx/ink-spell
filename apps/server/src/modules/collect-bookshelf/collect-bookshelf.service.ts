import { R } from '@/shared/res/r';
import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { TranslationService } from '../translation/translation.service';

@Injectable()
export class CollectBookshelfService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly translation: TranslationService,
  ) {}
  async getCollectBookshelfList(userId) {
    return new R({
      message: this.translation.t('prompt.acquire_successful'),
      data: await this.prisma.collectBookShelf.findMany({
        where: {
          userId: parseInt(userId),
          isDelete: false,
        },
        include: {
          bookShelf: true,
        },
      }),
    });
  }

  async collectBookShelf(userId, bookShelfId) {
    const uniqueCondition = {
      userId: parseInt(userId),
      bookShelfId: parseInt(bookShelfId),
    };

    const bookshelf = await this.prisma.collectBookShelf.findUnique({
      where: { userId_bookShelfId: uniqueCondition },
    });

    // 如果没有收藏记录，创建新的收藏
    if (!bookshelf) {
      return new R({
        message: this.translation.t('prompt.collection_successful'),
        data: await this.prisma.collectBookShelf.create({
          data: {
            userId: parseInt(userId),
            bookShelfId: parseInt(bookShelfId),
          },
        }),
      });
    }

    if (!bookshelf.isDelete) {
      throw new UnprocessableEntityException(
        this.translation.t('validation.already_collected_bookshelf'),
      );
    }

    // 如果记录存在但删除，更新记录恢复收藏
    return new R({
      message: this.translation.t('prompt.collection_successful'),
      data: await this.prisma.collectBookShelf.update({
        where: { id: bookshelf.id },
        data: { isDelete: false },
      }),
    });
  }

  async unCollectBookShelf(collectBookShelfId) {
    return new R({
      message: this.translation.t('prompt.cancellation_successful'),
      data: await this.prisma.collectBookShelf.update({
        where: {
          id: parseInt(collectBookShelfId),
        },
        data: {
          isDelete: true,
        },
      }),
    });
  }
}
