import { appConfig } from '@/config/AppConfig';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { TranslationService } from '../translation/translation.service';

@Injectable()
export class BookshelfService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly translation: TranslationService,
  ) { }
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
            ? null
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

  async getAllBookInfo(page: number, limit: number, username: string | undefined, bookshelfName: string | undefined) {
    const bookShelfs = await this.prisma.bookShelf.findMany({
      where: {
        label: {
          contains: bookshelfName ?? '',
        },
        user: {
          username: {
            contains: username ?? '',
          }
        },
        isDelete: false
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            account: true,
            email: true,
            avatar: true
          }
        },
        _count: {
          select: {
            collectBookShelf: {
              where: {
                isDelete: false
              }
            },
            books: {
              where: {
                isDelete: false
              }
            }
          }
        }
      },
      skip: (page - 1) * limit,
      take: limit,
    });

    return bookShelfs.map(bookshelf => ({
      ...bookshelf,
      _count: undefined,
      collectBookShelfPeople: bookshelf._count.collectBookShelf,
      bookCount: bookshelf._count.books,
    }))

  }

  async getAllBookInfoCount(limit: number, username: string | undefined, bookshelfName: string | undefined) {
    return Math.ceil(await this.prisma.bookShelf.count({
      where: {
        label: {
          contains: bookshelfName ?? '',
        },
        user: {
          username: {
            contains: username ?? '',
          }
        },
        isDelete: false
      }
    }) / limit)
  }
}
