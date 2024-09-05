import { appConfig } from '@/config/AppConfig';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BookshelfService {
  constructor(private prisma: PrismaService) {}
  async createBookShelf(req, createBookshelfDto) {
    const currentBookShelf = await this.prisma.bookShelf.findFirst({
      where: {
        userId: req.user.userId,
        label: createBookshelfDto.bookShelfName,
        isDelete: false,
      },
    });
    if (currentBookShelf) {
      return undefined;
    }
    return await this.prisma.bookShelf.create({
      data: {
        userId: req.user.userId,
        label: createBookshelfDto.bookShelfName,
        createTimer: new Date(),
        allFlag: false,
        cover:
          createBookshelfDto.bookShelfCover ??
          appConfig.DEFAULT_BOOK_SHELF_COVER,
        isPublic: createBookshelfDto.status,
        position:
          (await this.prisma.bookShelf.count({
            where: { userId: req.user.userId, isDelete: false },
          })) + 1,
        description:
          createBookshelfDto.bookShelfDescription == ''
            ? '暂无描述'
            : createBookshelfDto.bookShelfDescription,
      },
    });
  }

  async deleteBookShelf(bookShelfId) {
    await this.prisma.bookShelf.update({
      data: { isDelete: true },
      where: { id: parseInt(bookShelfId) },
    });
    const books = await this.prisma.book.findMany({
      where: { bookShelfId: parseInt(bookShelfId) },
    });
    books.map(async (item) => {
      await this.prisma.book.update({
        data: { isDelete: true },
        where: { id: item.id },
      });
    });
  }

  async acquireBookShelf(userId) {
    return await this.prisma.bookShelf.findMany({
      where: { userId, isDelete: false },
      orderBy: {
        position: 'asc',
      },
    });
  }

  async acquireBookShelfByBookShelfId(bookShelfId) {
    return await this.prisma.book.findMany({
      where: { bookShelfId: parseInt(bookShelfId), isDelete: false },
    });
  }

  async updateBookShelf(bookShelfId, updateBookshelfDto) {
    await this.prisma.bookShelf.update({
      data: {
        label: updateBookshelfDto.bookShelfName,
        position: updateBookshelfDto.position,
        cover:
          updateBookshelfDto.bookShelfCover ??
          appConfig.DEFAULT_BOOK_SHELF_COVER,
        isPublic: updateBookshelfDto.status,
        description: updateBookshelfDto.bookShelfDescription,
      },
      where: { id: parseInt(bookShelfId) },
    });
  }
}
