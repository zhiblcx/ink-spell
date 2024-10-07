import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BookmarkService {
  constructor(private prisma: PrismaService) {}
  async showBookMark(userId: number, bookId: number) {
    const bookMark = await this.prisma.bookMark.findUnique({
      where: {
        bookId_userId: {
          bookId: Number(bookId),
          userId,
        },
      },
    });
    return { ...bookMark, bookmark: bookMark?.catalog ?? [] };
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
      bookMark.catalog.sort((a, b) => a - b);
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
    if (bookMark) {
      bookMark.catalog = bookMark.catalog.filter((item) => item !== chapter);
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
    }
  }
}
