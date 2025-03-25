import { appConfig } from '@/config/AppConfig';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { TranslationService } from '../translation/translation.service';
@Injectable()
export class BookshelfService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly translation: TranslationService,
  ) {}
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
    const tags = [];
    for (let i = 0; i < createBookshelfDto.tags?.length; i++) {
      const tag = await this.prisma.tag.findUnique({
        where: { id: createBookshelfDto.tags[i] },
      });
      tags.push(tag);
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
      data: { tags: { set: tags ?? null } },
    });
    return result;
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
      include: {
        tags: {
          where: {
            isDelete: false,
          },
        },
      },
    });
  }

  async acquireBookShelfByBookShelfId(bookShelfId) {
    return await this.prisma.book.findMany({
      where: { bookShelfId: parseInt(bookShelfId), isDelete: false },
    });
  }

  async updateBookShelf(bookShelfId, updateBookshelfDto) {
    const tags = [];
    for (let i = 0; i < updateBookshelfDto.tags?.length; i++) {
      const tag = await this.prisma.tag.findUnique({
        where: { id: updateBookshelfDto.tags[i] },
      });
      tags.push(tag);
    }
    await this.prisma.bookShelf.update({
      data: {
        label: updateBookshelfDto.bookShelfName,
        position: updateBookshelfDto.position,
        cover:
          updateBookshelfDto.bookShelfCover ??
          appConfig.DEFAULT_BOOK_SHELF_COVER,
        isPublic: updateBookshelfDto.status,
        review: updateBookshelfDto.status ? 'PENDING' : 'UNREVIEWED',
        description: updateBookshelfDto.bookShelfDescription,
        tags: { set: tags ?? null },
      },
      where: { id: parseInt(bookShelfId) },
    });
  }

  async acquirePublicBookShelf(
    page: number,
    limit: number,
    bookshelfName?: string,
    tagsId?: string,
  ) {
    return await this.prisma.bookShelf.findMany({
      where: {
        label: { contains: bookshelfName },
        tags:
          tagsId === undefined
            ? {}
            : {
                some: {
                  id: {
                    in: tagsId?.split(',').map((tagId) => parseInt(tagId)),
                  },
                },
              },
        isDelete: false,
        isPublic: true,
        review: 'APPROVED',
      },
      include: {
        tags: {
          where: {
            isDelete: false,
          },
        },
        user: true,
      },
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  async getPublicBookShelfCount(
    limit: number,
    bookshelfName?: string,
    tagsId?: string,
  ) {
    return Math.ceil(
      (await this.prisma.bookShelf.count({
        where: {
          label: { contains: bookshelfName },
          tags:
            tagsId === undefined
              ? {}
              : {
                  some: {
                    id: {
                      in: tagsId?.split(',').map((tagId) => parseInt(tagId)),
                    },
                  },
                },
          isDelete: false,
          isPublic: true,
          review: 'APPROVED',
        },
      })) / limit,
    );
  }

  async getRecommendBookshelf(userId: number) {
    // 首先找到用户的喜爱的三个标签
    const collectBookshelf = await this.prisma.collectBookShelf.findMany({
      where: {
        isDelete: false,
        userId: userId,
      },
      include: {
        bookShelf: {
          include: {
            tags: true,
          },
        },
      },
    });
    const tags = collectBookshelf
      .map((item) => item.bookShelf.tags)
      .flat()
      .map((item) => item.id);

    const idCounts = tags.reduce((acc, id) => {
      acc[id] = (acc[id] || 0) + 1;
      return acc;
    }, {});

    // 将id和它们出现的次数转换为一个数组
    const idCountsArray = Object.entries(idCounts);

    // 按照出现次数降序排序
    idCountsArray.sort((a, b) => Number(b[1]) - Number(a[1]));

    // 选出出现次数最多的三个id
    const topThreeIds = idCountsArray.slice(0, 3).map(([id]) => id);

    return await this.prisma.bookShelf.findMany({
      where: {
        tags: {
          some: {
            id: { in: topThreeIds.map((id) => parseInt(id)) },
          },
        },
        isDelete: false,
        isPublic: true,
      },
      include: {
        tags: {
          where: {
            isDelete: false,
          },
        },
        user: true,
      },
      take: 50,
    });
  }

  async getAllBookInfo(
    page: number,
    limit: number,
    username: string | undefined,
    bookshelfName: string | undefined,
  ) {
    const bookShelfs = await this.prisma.bookShelf.findMany({
      where: {
        label: { contains: bookshelfName ?? '' },
        user: { username: { contains: username ?? '' } },
        isDelete: false,
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            account: true,
            email: true,
            avatar: true,
          },
        },
        tags: {
          where: {
            isDelete: false,
          },
        },
        _count: {
          select: {
            collectBookShelf: {
              where: { isDelete: false },
            },
            books: { where: { isDelete: false } },
          },
        },
      },
      skip: (page - 1) * limit,
      take: limit,
    });

    return bookShelfs.map((bookshelf) => ({
      ...bookshelf,
      _count: undefined,
      collectBookShelfPeople: bookshelf._count.collectBookShelf,
      bookCount: bookshelf._count.books,
    }));
  }

  async getAllBookInfoCount(
    limit: number,
    username: string | undefined,
    bookshelfName: string | undefined,
  ) {
    return Math.ceil(
      (await this.prisma.bookShelf.count({
        where: {
          label: {
            contains: bookshelfName ?? '',
          },
          user: {
            username: {
              contains: username ?? '',
            },
          },
          isDelete: false,
        },
      })) / limit,
    );
  }

  async getReviewBookshelf(page: number, limit: number) {
    return await this.prisma.bookShelf.findMany({
      where: {
        isDelete: false,
        isPublic: true,
        review: 'PENDING',
      },
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  async getReviewBookshelfCount(limit: number) {
    return Math.ceil(
      (await this.prisma.bookShelf.count({
        where: {
          isDelete: false,
          isPublic: true,
          review: 'PENDING',
        },
      })) / limit,
    );
  }

  async updateReviewBookshelf(bookShelfId: number, review: ReviewStatus) {
    return await this.prisma.bookShelf.updateMany({
      where: {
        id: bookShelfId,
      },
      data: {
        review: review,
      },
    });
  }

  async putReviewApplyBookshelf(userId: number, bookshelfId: number) {
    return await this.prisma.bookShelf.update({
      where: {
        id: bookshelfId,
      },
      data: {
        review: 'PENDING',
        userId: userId,
      },
    });
  }

  async getReviewPublicBookshelf(userId: number) {
    // 已拒绝
    const reject = await this.prisma.bookShelf.findMany({
      where: {
        userId: userId,
        review: 'REJECTED',
      },
    });

    // 审核中
    const pending = await this.prisma.bookShelf.findMany({
      where: {
        userId: userId,
        review: 'PENDING',
      },
    });

    // 已通过
    const approved = await this.prisma.bookShelf.findMany({
      where: {
        userId: userId,
        review: 'APPROVED',
      },
    });

    return [...pending, ...reject, ...approved];
  }
}
