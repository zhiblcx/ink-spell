import { R } from '@/shared/res/r';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { TranslationService } from '../translation/translation.service';

@Injectable()
export class BookmarkService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly translation: TranslationService,
  ) {}
  async showBookMark(userId: number, bookId: number) {
    const bookMark = await this.prisma.bookMark.findUnique({
      where: {
        bookId_userId: {
          bookId: Number(bookId),
          userId,
        },
      },
    });
    return new R({
      message: this.translation.t('prompt.acquire_successful'),
      data: {
        ...bookMark,
        bookmark: bookMark.catalog.sort((a, b) => a - b) ?? [],
      },
    });
  }

  async insertBookMark(bookId: number, userId: number, chapter: number) {
    const bookMark = await this.prisma.bookMark.findUnique({
      where: {
        bookId_userId: {
          bookId,
          userId,
        },
      },
    });
    if (bookMark) {
      bookMark.catalog.push(chapter);
      await this.prisma.bookMark.update({
        data: {
          catalog: bookMark.catalog,
        },
        where: {
          bookId_userId: {
            bookId,
            userId,
          },
        },
      });
    } else {
      await this.prisma.bookMark.create({
        data: {
          bookId,
          userId,
          catalog: [chapter],
        },
      });
    }
    return new R({
      message: this.translation.t('prompt.added_successfully'),
    });
  }

  async deleteBookMark(bookId: number, userId: number, chapter: number) {
    const bookMark = await this.prisma.bookMark.findUnique({
      where: {
        bookId_userId: {
          bookId,
          userId,
        },
      },
    });
    if (!bookMark) {
      return new R({
        message: this.translation.t('prompt.no_such_bookmark'),
      });
    }

    bookMark.catalog = bookMark.catalog.filter((item) => item !== chapter);
    await this.prisma.bookMark.update({
      where: {
        bookId_userId: {
          bookId,
          userId,
        },
      },
      data: {
        catalog: bookMark.catalog,
      },
    });
    return new R({
      message: this.translation.t('prompt.deleted_successfully'),
    });
  }
}
