import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BookshelfService {
  constructor(private prisma: PrismaService) {}
  async createBookShelf(req, createBookshelfDto) {
    return await this.prisma.bookShelf.create({
      data: {
        userId: req.user.userId,
        label: createBookshelfDto.bookShelfName,
        createTimer: new Date(),
        allFlag: false,
      },
    });
  }

  async deleteBookShelf(bookShelfId) {
    await this.prisma.bookShelf.update({
      data: { isDelete: true },
      where: { id: parseInt(bookShelfId) },
    });
  }

  async acquireBookShelft(userId) {
    return await this.prisma.bookShelf.findMany({
      where: { userId, isDelete: false },
    });
  }

  async acquireBookShelftByBookShelfId(bookShelfId) {
    return await this.prisma.book.findMany({
      where: { bookShelfId: parseInt(bookShelfId), isDelete: false },
    });
  }

  async updateBookShelf(bookShelfId, updateBookshelfDto) {
    await this.prisma.bookShelf.update({
      data: { label: updateBookshelfDto.bookShelfName },
      where: { id: parseInt(bookShelfId) },
    });
  }
}
