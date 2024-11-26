import { appConfig } from '@/config/AppConfig';
import {
  detectFileEncoding,
  readFileContent,
} from '@/shared/utils/fileOperate';
import { Injectable } from '@nestjs/common';
import * as path from 'node:path';
import { PrismaService } from '../prisma/prisma.service';
import { BookContentDto } from './dto/book-content.dto';

@Injectable()
export class BookService {
  constructor(
    private prisma: PrismaService,
  ) { }
  async uploadFile(req, file, md5, bookShelfId) {
    const encoding = detectFileEncoding(file.path);
    const filePath = file.path.replace(/\\/g, '/').replace('public', '/static');
    const name = path.parse(file.originalname).name;
    try {
      await this.prisma.book.create({
        data: {
          cover: appConfig.DEFAULT_BOOK_COVER,
          encoding,
          name: decodeURIComponent(escape(name)),
          bookFile: filePath,
          md5,
          bookShelfId: parseInt(bookShelfId),
          userId: req.user.userId,
        },
      });
      return true;
    } catch (_) {
      return false;
    }
  }

  async collectBook(userId: number, bookId: number) {
    // 找到该书籍
    const { id: _, ...book } = await this.prisma.book.findUnique({
      where: {
        id: bookId
      },
    });

    const userBook = await this.prisma.book.findUnique({
      where: {
        md5_userId: {
          md5: book.md5,
          userId,
        },
      },
    });

    if (userBook) {
      return await this.prisma.book.update({
        where: {
          id: userBook.id,
        },
        data: {
          isDelete: false,
        },
      });
    }

    // 找到该用户默认的书架
    const bookShelf = await this.prisma.bookShelf.findFirst({
      where: {
        userId,
        allFlag: true,
      },
    });

    return await this.prisma.book.create({
      data: {
        ...book,
        userId,
        bookShelfId: bookShelf.id,
      },
    });
  }

  async compareMd5(req, md5, file_name) {
    const result = {
      md5: false,
      path: '',
    };
    // 数据库没有重复的书籍
    const currentBook = await this.prisma.book.findFirst({ where: { md5 } });
    if (currentBook) {
      // 数据库有重复的书籍
      const repeatBook = await this.prisma.book.findUnique({
        where: {
          md5_userId: {
            md5,
            userId: parseInt(req.user.userId),
          },
        },
      });
      if (repeatBook) {
        result.md5 = true;
        if (repeatBook.isDelete) {
          // 如果删除了直接恢复
          await this.prisma.book.delete({ where: { id: repeatBook.id } });
          const { id: _, ...restoreBook } = repeatBook;
          await this.prisma.book.create({
            data: {
              ...restoreBook,
              isDelete: false,
            },
          });
          result.path = repeatBook.bookFile;
        }
      } else {
        // 书籍是别人上传的
        result.md5 = true;
        result.path = currentBook.bookFile;
        // 找到当前用户的默认书籍
        const defaultBookShelf = await this.prisma.bookShelf.findFirst({
          where: { allFlag: true, userId: req.user.userId },
        });
        // 把书籍移动到当前用户的默认书籍
        await this.prisma.book.create({
          data: {
            bookFile: currentBook.bookFile,
            bookShelfId: defaultBookShelf.id,
            md5,
            isDelete: false,
            encoding: currentBook.encoding,
            userId: req.user.userId,
            cover: appConfig.DEFAULT_BOOK_COVER,
            name: file_name,
          },
        });
      }
    }
    return result;
  }

  async deleteBook(bookId) {
    await this.prisma.book.update({
      data: { isDelete: true },
      where: { id: parseInt(bookId) },
    });
  }

  async showBookContent(bookId) {
    const currentBook = await this.prisma.book.findUnique({
      where: { id: Number(bookId), isDelete: false },
    });



    const fileName = currentBook.bookFile.replace(/static/, 'public');
    const content =
      (await readFileContent(fileName, currentBook.encoding)) || {};
    content['bookName'] = currentBook.name;
    return content;
  }

  async updateBookDescription(bookID, bookDescription: BookContentDto) {
    return await this.prisma.book.update({
      data: {
        name: bookDescription.name,
        author: bookDescription.author,
        protagonist: bookDescription.protagonist,
        cover: bookDescription.cover,
        description: bookDescription.description,
        bookShelfId: bookDescription.bookShelfId,
      },
      where: { id: Number(bookID) },
    });
  }

  async getAllBookInfo(page: number, limit: number) {
    return await this.prisma.book.findMany({
      where: { isDelete: false },
      include: {
        User: {
          select: {
            id: true,
            username: true,
            account: true,
            email: true,
            avatar: true
          }
        },
        BookShelf: {
          select: {
            id: true,
            label: true,
            cover: true,
            description: true,
            isPublic: true
          }
        }
      },
      skip: (page - 1) * limit,
      take: limit,
    })
  }

  async getAllBookInfoCount(limit: number) {
    return Math.ceil(await this.prisma.book.count({
      where: { isDelete: false }
    }) / limit)
  }
}
