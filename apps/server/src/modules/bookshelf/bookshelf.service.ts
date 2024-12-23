import { appConfig } from '@/config/AppConfig';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { TranslationService } from '../translation/translation.service';
@Injectable()
export class BookshelfService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly translation: TranslationService
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
    const tags = []
    for (let i = 0; i < createBookshelfDto.tags?.length; i++) {
      const tag = await this.prisma.tag.findUnique({
        where: { id: createBookshelfDto.tags[i] }
      })
      tags.push(tag)
    }
    const result = await this.prisma.bookShelf.create({
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

    await this.prisma.bookShelf.update({
      where: { id: result.id },
      data: { tags: { set: tags ?? null } }
    })
    return result
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
      include: { tags: true }
    });
  }

  async acquireBookShelfByBookShelfId(bookShelfId) {
    return await this.prisma.book.findMany({
      where: { bookShelfId: parseInt(bookShelfId), isDelete: false },
    });
  }

  async updateBookShelf(bookShelfId, updateBookshelfDto) {
    const tags = []
    for (let i = 0; i < updateBookshelfDto.tags?.length; i++) {
      const tag = await this.prisma.tag.findUnique({
        where: { id: updateBookshelfDto.tags[i] }
      })
      tags.push(tag)
    }
    await this.prisma.bookShelf.update({
      data: {
        label: updateBookshelfDto.bookShelfName,
        position: updateBookshelfDto.position,
        cover:
          updateBookshelfDto.bookShelfCover ??
          appConfig.DEFAULT_BOOK_SHELF_COVER,
        isPublic: updateBookshelfDto.status,
        description: updateBookshelfDto.bookShelfDescription,
        tags: { set: tags ?? null }
      },
      where: { id: parseInt(bookShelfId) },
    });
  }

  async acquirePublicBookShelf(
    page: number,
    limit: number,
    bookshelfName?: string,
    nameChinese?: Array<string>,
    nameEnglish?: Array<string>
  ) {
    return await this.prisma.bookShelf.findMany({
      where: {
        label: { contains: bookshelfName },
        tags: (nameChinese === undefined && nameEnglish === undefined) ? {} : {
          some: {
            nameChinese: { in: nameChinese },
            nameEnglish: { in: nameEnglish },
          }
        },
        isDelete: false,
        isPublic: true
      },
      include: { tags: true, user: true },
      skip: (page - 1) * limit,
      take: limit,
    })
  }

  async getPublicBookShelfCount(
    limit: number,
    bookshelfName?: string,
    nameChinese?: Array<string>,
    nameEnglish?: Array<string>
  ) {
    return Math.ceil(await this.prisma.bookShelf.count({
      where: {
        label: { contains: bookshelfName },
        tags: (nameChinese === undefined && nameEnglish === undefined) ? {} : {
          some: {
            nameChinese: { in: nameChinese },
            nameEnglish: { in: nameEnglish },
          }
        },
        isDelete: false,
        isPublic: true
      },
    }) / limit)
  }

  async getAllBookInfo(page: number, limit: number, username: string | undefined, bookshelfName: string | undefined) {
    const bookShelfs = await this.prisma.bookShelf.findMany({
      where: {
        label: { contains: bookshelfName ?? '', },
        user: { username: { contains: username ?? '', } },
        isDelete: false
      },
      include: {
        user: {
          select: { id: true, username: true, account: true, email: true, avatar: true }
        },
        tags: true,
        _count: {
          select: {
            collectBookShelf: {
              where: { isDelete: false }
            },
            books: { where: { isDelete: false } }
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
